<template>
 
    <NavBar />
  
    <section class="container mag">
      <div class="mt-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="">Admin Overview</h1>
        
        </div>
  
        <div class="row">
          <div class="col-md-6">
            <div class="card p-2 mb-3">
              <div class="p-2"><h2>21</h2></div>
              <p>Total days attended</p>
            </div>
          </div>
  
          <div class="col-md-6">
            <div class="card p-2 mb-3">
              <div class="p-2"><h2>365</h2></div>
              <p>Total days attended</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <tab-nav class="new" :hide_tab="!hide_tab" :tabs="['Home', 'Link 2', 'Link 3']"
    :selected="selected" @selected="setSelected">


    <tab-config :isSelected="selected === 'Home'">
    
      <section class="container">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">First name</th>
                <th scope="col">Surname</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Department</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index)  in users" :key="user.id">
                
                <th scope="row">{{Number(index)+ 1  }}</th>
                <td> {{ user.name }} </td>
                <td>{{ user.surname  }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.department }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </tab-config>

    <tab-config :isSelected="selected === 'Link 2'">
      <section class="">
          <div class="">
            <div class="mb-8">
              <h4>Link 2</h4>
            </div>
          </div>
      </section>
    </tab-config>

    <tab-config :isSelected="selected === 'Link 3'">
      <section>
        <section class="">
            <div class="table-row flx jc-sb">
              <div class="mb-8">
                <h4>Link 3</h4>
              </div>
          </div>

        </section>
      </section>
    </tab-config>
  </tab-nav>


  </template>
  
  <script>
  import NavBar from "../components/NavBar.vue";
  import Sidenav from "../components/Sidenav.vue";
  import TabNav from "../components/TabNav.vue";
  import TabConfig from "../components/TabConfig.vue";
  import { db } from "../main";
import { collection, getDocs } from "firebase/firestore";
  export default {
  components: {
    NavBar,Sidenav,TabNav,TabConfig
  },
  data() {
    return {
      selected: "Home",
      users: [],
    };
  },
  async mounted() {
    // Fetch and display users on component mount
    await this.fetchUsers();
  },
  methods: {
    setSelected(tab) {
      this.selected = tab;
    },

    async fetchUsers() {
      const usersCollection = collection(db, "user");
      const querySnapshot = await getDocs(usersCollection);

      this.users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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
    margin-top: 4rem !important;
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
  