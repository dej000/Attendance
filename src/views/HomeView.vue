<template>
  <div class="mid">
    <div>
      <h1>Attendance Website</h1>
      
<button @click="checkLocation" :disabled="!isWithinLocation" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
Sign Attendance
</button>

<div class="modal fade" id="locationModal" tabindex="-1" role="dialog" aria-labelledby="locationModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="locationModalLabel">ATTENDANCE</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p v-if="isWithinLocation">Attendance Signed</p>
        <p v-else>You are not in the allowed location.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

    </div>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      acceptedRadius: 100, // Default accepted radius in degrees, adjust as needed
      isWithinLocation: false,
    };
  },mounted(){
  this.checkLocationOnLoad()
  },
  methods: {
    checkLocationOnLoad() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Get user's latitude and longitude
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;

            // Replace with the coordinates of your allowed location
            const allowedLatitude = 6.5765376;
            const allowedLongitude =  3.3521664;

            // Check if the user is in the allowed location within the accepted radius
            const distance = this.calculateDistance(userLatitude, userLongitude, allowedLatitude, allowedLongitude);

            // Update isWithinLocation based on the check
            this.isWithinLocation = distance <= this.acceptedRadius;
            if (this.isWithinLocation) {
              alert('Location allowed. Proceed with sign-up.');
              // Add logic to proceed with sign-up or redirect to the registration page.
            } else {
              alert('You are not in the allowed location.');
              // Add logic to handle disallowed location (e.g., show an error message).
            }
          
          },
          
          (error) => {
            console.error('Geolocation error:', error.message);
            // Handle geolocation errors (e.g., show an error message to the user).
          }
        );
      } else {
        console.error('Geolocation is not supported by your browser.');
        // Handle the case where geolocation is not supported by the browser.
      }
    
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance;
    },
    checkLocation(){    
      $('#locationModal').modal('show');
    }
  },
};
</script>

<style>
.mid{
  display: flex;
  justify-content: center;
  align-items: center;
 height: 100vh;
 background: pink;
  
}


.butt{
  padding: 10px 20px;
  color: #ffffff;
  border-radius: 8px;
  border: 1px solid white;
  background: #05021A;
  font-family: 'Satoshi', sans-serif;
}
</style>