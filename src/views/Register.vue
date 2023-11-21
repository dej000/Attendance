<template>
 
  
        <div class="hero d-flex justify-content-center align-items-center  vh-100 mt-5  "> 
           <div class="">
    
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
       
      <Form @submit.prevent="register"      :validation-schema="schema"
      @invalid-submit="onInvalidSubmit">
      <h2 class="text-center"><strong>Sign Up</strong></h2>
      <p class="text-center text-muted"></p>
     
  
      <div class="row ">
        <div class="col-12">
            <input type="text"  class="TextInput"    placeholder="firstname" required v-model="name">
        </div>
  
        <div class="col-12">
            <input type="text"  class="TextInput"    placeholder="surname" required v-model="surname">
        </div> 
      </div>
  
      
      
      <div class="row">
        <div class="col-12">
            <input type="email"  class="TextInput"    placeholder="email" required v-model="email">
    </div> 
   </div>
        

        <div class="row mb-3">
            <div class="col-12 d-flex justify-content-between ">
                <label class="m-0" for="dropdown">Team:</label>
                <select class="col-9" name="team" v-model="team" id="dropdown1">
                  <option value="MISSION">MISSION </option>
                  <option value="PROGRAM">PROGRAM</option>
                  <option value="MEMBERSHIP">MEMBERSHIP </option>
                  <option value="MATURITY">MATURITY </option>
                  <option value="MINISTRY">MINISTRY</option>
                  <option value="NEXT GEN">NEXT GEN</option>
                  <option value="GENERAL SERVICES">GENERAL SERVICES</option>
                </select>
         
        </div> 
        </div> 

        <div class="row mb-3">
            <div class="col-12 d-flex justify-content-between gap-3 ">
                <label class="m-0" for="dropdown">Department:</label>
                <select class="col-8" name="department" v-model="department" id="dropdown">
                  <option value="Usher">Usher </option>
                  <option value="Prayer group">Prayer group</option>
                  <option value="Protocol">Protocol </option>
                  <option value="Sound And media">Sound And media </option>
                </select>
         
        </div> 
        </div> 
          
   

        <div class="row ">
          <div class="col-12">
            <input type="password" class="TextInput" placeholder="Password" required v-model="password">
          </div>
  
          <div class="col-12">
          <input type="password" class="TextInput" placeholder="CONFIRM PASSWORD" required v-model="confirm_password">
          </div> 
        </div>

      <div class="form-group d-flex flex-column justify-content-center align-items-center gap-3 "><button type="submit" class="btn submit-btn  mb-3 btn-light " @click="register" >Sign Up  <div class="spinner-border spinner-border-sm " v-show="loading" role="status">
        <span class="visually-hidden">Loading...</span>
      </div></button>
          <p  class="text-center">You already have an account?  <router-link to="/login"><a  class="text-decoration-none " href="">LOG IN</a></router-link></p>
      </div>
  
      </Form>
    </div>
    
           
         
        </div>

      
  </template>
  
  <script >
  
  import * as Yup from 'yup';
  import { Form } from 'vee-validate';
  
  import { getAuth, createUserWithEmailAndPassword,AuthErrorCodes  } from "firebase/auth";
  import { useRouter } from 'vue-router'; // Import Vue Router
 

  
 
  export default {
      components :{Form,
        },
        data(){
      return{
       schema : Yup.object().shape({
    name: Yup.string().required(),
    surname: Yup.string().required(),
    email: Yup.string().email().required(),
    team: Yup.string().required(),
    department:Yup.string().required(),
    password: Yup.string().min(6).required(),
    confirm_password: Yup.string()
      .required()
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  }),
  errorMessage: '',
      }
  
     },
     methods:{
     
  onInvalidSubmit() {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.classList.add('invalid');
    setTimeout(() => {
      submitBtn.classList.remove('invalid');
    }, 1000);
  },
  register() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,this.email,this.password)
    .then((userCredential) => {
  
    const user = userCredential.user;
    this.$router.push({ name: 'login' });
  })
  .catch((error) => {
    if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
          // The email address is already in use by another account
          this.errorMessage = 'The email address is already in use by another account.';
        } else {
          // Display a generic error message for other errors
          this.errorMessage = 'Error signing up. Please try again later.';
        }
  });
    },
  },

     }
  
      
   
      
  
          
   
  </script>
    
  <style scoped>
  
  
  :root {
      --primary-color: #0071fe;
      --error-color: #f23648;
      --error-bg-color: #fddfe2;
      --success-color: #21a67a;
      --success-bg-color: #e0eee4;
    }
    
  nav a{
      font-size: 12px;
  }
  label,p,a{
   color:#000000;
  
  }

  select{
    border: 1px solid black;
  }
  
 
  
  #floatingInput{
      width: 100%;
  }
  h2{
      color: #000000;   
  }
 
  
  .TextInput {
    position: relative;
    margin-bottom: calc(1em * 1.5);
    width: 100%;
  }
  
  label {
    display: block;
    margin-bottom: 4px;
    width: 100%;
  }
  
  
  
  input {
    
    background-color:#eff0ff !important;
    border: 0;
    outline: none;
    padding: 10px ;
    display: block;
    width: 100%;
    font-size: 12px;
    height: 40px;
  }
  
  
  input:focus {
    border-color: var(--primary-color);
  }
  .submit-btn.invalid {
    animation: shake 0.5s;
    /* When the animation is finished, start again */
    animation-iteration-count: infinite;
  }
  @keyframes shake {
    0% {
      transform: translate(1px, 1px);
    }
    10% {
      transform: translate(-1px, -2px);
    }
    20% {
      transform: translate(-3px, 0px);
    }
    30% {
      transform: translate(3px, 2px);
    }
    40% {
      transform: translate(1px, -1px);
    }
    50% {
      transform: translate(-1px, 2px);
    }
    60% {
      transform: translate(-3px, 1px);
    }
    70% {
      transform: translate(3px, 1px);
    }
    80% {
      transform: translate(-1px, -1px);
    }
    90% {
      transform: translate(1px, 2px);
    }
    100% {
      transform: translate(1px, -2px);
    }
  }
 
  
  form{
      width: 100%;
      height: 0%;
      padding: 30px;
      background-color: #FFFFFF;
  }
  
  .btn{
      background: #2E00E4;
      color: white;
      padding: 12px;
      width: 217px;
      border-radius: 0;
  }
  
  
  
    
   
  
  </style>