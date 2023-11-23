<template>
  <NavBar />
  <section class="container mag">
    <div class="mt-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="">Overview</h1>
        <div>
          <button
            @click="checkLocation"
            :disabled="!isWithinLocation"
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Sign Attendance
            <div
              class="spinner-border spinner-border-sm"
              v-show="loading"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>

          <div
            class="modal fade"
            id="locationModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="locationModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="locationModalLabel">
                    ATTENDANCE
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p v-if="isWithinLocation">Attendance Signed</p>
                  <p v-else>You are not in the allowed location.</p>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="card p-3 mb-3">
            <div class="p-3"><h2>21</h2></div>
            <p>Total days attended</p>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card p-3 mb-3">
            <div class="p-3"><h2>365</h2></div>
            <p>Total days attended</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container">
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.timestampField  }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { db } from "../main";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      acceptedRadius: 10, // Default accepted radius in degrees, adjust as needed
      isWithinLocation: false,
      users: [],
      user: null,
      loading: false,
    };
  },
  mounted() {
    this.checkLocationOnLoad();
  },
  methods: {
    async checkLocationOnLoad() {
      const citiesRef = collection(db, "attendance");
      const auth = getAuth();
      const q = query(citiesRef, where("id", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      this.users=[]
      querySnapshot.forEach((doc) => {
        const firestoreTimestamp = doc.data().timestampField;

const jsDate = firestoreTimestamp?.toDate()
console.log(jsDate)
        this.users.push({
          id: doc.data().id,
          timestampField: doc.data().timestampField?.toDate()
        })

});

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Get user's latitude and longitude
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;

            // Replace with the coordinates of your allowed location
            const allowedLatitude = 6.5765376;
            const allowedLongitude = 3.3521664;

            // Check if the user is in the allowed location within the accepted radius
            const distance = this.calculateDistance(
              userLatitude,
              userLongitude,
              allowedLatitude,
              allowedLongitude
            );

            // Update isWithinLocation based on the check
            this.isWithinLocation = distance <= this.acceptedRadius;
            const auth = getAuth();
            if (this.isWithinLocation) {
            }
          },

          (error) => {
            console.error("Geolocation error:", error.message);
            alert("You are not in the allowed location.");
            // Handle geolocation errors (e.g., show an error message to the user).
          }
        );
      } else {
        console.error("Geolocation is not supported by your browser.");
        // Handle the case where geolocation is not supported by the browser.
      }
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance;
    },
    async checkLocation() {
      console.log("ok");
    
      const auth = getAuth();
      console.log(auth.currentUser)
      const a = new Date().toDateString()
      const b =this.users.length > 0? this.users[0].timestampField?.toDateString():''
      if(a!== b){
        this.loading = true;
      auth.onAuthStateChanged(async (authUser) => {
        this.user = authUser;

        console.log("User UID:", authUser.uid);

        try {
          const docRef = await addDoc(collection(db, "attendance"), {
            id: authUser.uid,
            timestampField: serverTimestamp(),
          });
          console.log("Document written with ID:", docRef.id);
          this.loading = false;
          this.checkLocationOnLoad();
          $("#locationModal").modal("show");
        } catch (error) {
          this.loading = false;
          console.error("Error creating document:", error);
        }
      });
      }else{
      
        alert('attendance already taken')

      }
      
    },
  },
};
</script>

<style>
.mid {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(83, 80, 80);
}
.card {
  border-radius: 8px;
  background-color: bisque;
}
.mag {
  margin-top: 6rem !important;
}
.butt {
  padding: 10px 20px;
  color: #ffffff;
  border-radius: 8px;
  border: 1px solid white;
  background: #05021a;
  font-family: "Satoshi", sans-serif;
}

@media (max-width: 990px) {
  h1 {
    font-size: 1.5rem;
  }
}
</style>
