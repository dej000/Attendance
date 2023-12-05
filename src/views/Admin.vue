<template>
 
    <NavBar />
  
    <section class="container mag">
      <div class="mt-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="mag">Admin Overview</h1>
          <button @click="exportToExcel">Export to Excel</button>
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
  
    <tab-nav class="new" :tabs="['Home', 'Link 2', 'Link 3']"
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
      
  <section class="container">
    <label for="start">Start date:</label>

<input type="date" id="start" name="trip-start"  v-model="selectedDate" @input="filterData"/>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Department</th>
            <th scope="col">Attendance Time</th>
          </tr>
        </thead>
        
        <tbody  v-if="filteredAttendanceRecords.length > 0">
          <tr v-for="(attendanceRecord, index) in filteredAttendanceRecords" :key="attendanceRecord.id">
            <th scope="row">{{Number(index)+ 1  }}</th>
            <td>{{ attendanceRecord.user.name }}</td>
            <td>{{ attendanceRecord.user.surname }}</td>
            <td>{{ attendanceRecord.user.department }}</td>
            <td>{{ attendanceRecord.timestampField }}</td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="4" class="text-center">No records found</td>
          </tr>
        </tbody>
      </table>
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
  import ExcelJS from 'exceljs';

  import TabNav from "../components/TabNav.vue";
  import TabConfig from "../components/TabConfig.vue";
  import { db } from "../main";
import { collection, getDocs,getDoc, doc } from "firebase/firestore";
  export default {
  components: {
    NavBar,TabNav,TabConfig
  },
  data() {
    return {
      selectedDate: "", 
      selected: "Home",
      users: [],
      user: null,
      attendanceRecords: [],
    };
  },
  computed: {
  
    filteredAttendanceRecords() {
      if (!this.selectedDate) {
        return this.attendanceRecords; // Return all records if no date is selected
      }
      return this.attendanceRecords.filter(record => record.timestampField.includes(this.selectedDate));
    },
  },
  async mounted() {
    // Fetch and display users on component mount
    await this.fetchUsers();
    await this.fetchAttendanceRecords();
  },
  watch: {
    // Watch for changes in selectedDate and trigger filterData method
    selectedDate: "filterData",
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
    async fetchAttendanceRecords() {
      const attendanceCollection = collection(db, "attendance");
      const attendanceQuerySnapshot = await getDocs(attendanceCollection);
       await this.fetchUsers();
      this.attendanceRecords = attendanceQuerySnapshot.docs.map((doc) => ({
        
        id: doc.id,
        timestampField: doc.data().timestampField?.toDate(),
        user: {
          name: doc.data().name, // Adjust this based on your user data structure
          surname: doc.data().surname,
          department: doc.data().department,
        },
      }));
    },
    filterData() {
      
    },
    async exportToExcel() {
    // Create a new Excel workbook and add a worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users and Attendance');

    // Add headers to the worksheet
    worksheet.addRow(['No', 'First Name', 'Surname', 'Email', 'Role', 'Department']);

    // Add user data to the worksheet
    this.users.forEach((user, index) => {
      worksheet.addRow([index + 1, user.name, user.surname, user.email, user.role, user.department]);
    });

    // Add a blank row as a separator
    worksheet.addRow([]);

    // Add headers for attendance records
    worksheet.addRow(['Name', 'Surname', 'Department', 'Attendance Time']);

    // Add attendance record data to the worksheet
    this.attendanceRecords.forEach((record) => {
      const { name, surname, department, timestampField } = record.user;
      worksheet.addRow([name, surname, department, timestampField]);
    });

    // Create a buffer with the Excel file content
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob from the buffer
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link and trigger a click event to download the file
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'users_and_attendance.xlsx';
    link.click();
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
  