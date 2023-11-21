
import { getFirestore }  from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGrjitAq9TYI6mz9xVBGQ7Lz_6XslUOxE",
  authDomain: "church-attendance-94e89.firebaseapp.com",
  projectId: "church-attendance-94e89",
  storageBucket: "church-attendance-94e89.appspot.com",
  messagingSenderId: "318929700906",
  appId: "1:318929700906:web:06bf60e58d17653e3a9b53"
};

 initializeApp(firebaseConfig);
 // init & export firestore service
export const db = getFirestore()
// generate & export auth object
export const auth = getAuth()

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
