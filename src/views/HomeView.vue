<template>
  <section class=" d-flex justify-content-center align-items-center container vh-100 mag">
   
        <div>
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          
          <Form
          @submit="signin" 
          
          >
          <h2 class="text-center"><strong>Log in</strong></h2>
          <p class="text-center text-muted">Welcome back!</p>
             
          <div class=" mb-3 ">
          
            <div class="" >
              <input type="email"    placeholder="email" required v-model="email">
            </div>
          </div>

          <div>
      
            <div class="">
              <input type="password" class="TextInput" placeholder="Password" required v-model="password">
              </div>
        
              
           
        </div>
           
           
           
      
         

             <div class="form-group d-flex flex-column justify-content-center align-items-center  ">
                  <router-link  class="text-decoration-none mb-3" to="/"><a class="text-decoration-none " href="">FORGOT PASSWORD?</a></router-link>  

                  <button :disabled='loading' @click="signin" class="btn submit-btn mb-3  m-0 btn-light " type="submit">LOGIN   <div class="spinner-border spinner-border-sm " v-show="loading" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div> </button>
                
                  <router-link to="/register"><a  class="text-decoration-none " href="">New user? </a></router-link>
                
              </div>
          </Form>
        </div>
          
      
  </section>
 
   
</template>

<script>

import { ref } from '@vue/reactivity'
import * as Yup from 'yup';
import { Form } from 'vee-validate';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from 'vue-router'; // Import Vue Router


export default {
  components :{
    Form,
    },

  data(){
  return{
   schema : Yup.object().shape({
email: Yup.string().email().required(),
password: Yup.string().min(6).required(),

}),
loading:false,
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

signin() {
  this.loading=true;
    const auth = getAuth();
signInWithEmailAndPassword(auth,this.email,this.password)

    .then((userCredential) => {
      this.loading=false;
   this.$router.push({ name: 'attendance' });
  })
  .catch((error) => {
    this.loading=false;
    this.errorMessage = error.message;
  });
    },
 }

 

}
  

</script>

<style scoped>

.mag{
margin-top: 6rem!important;
}
.error-message{
  color: #f23648  !important;
}

nav a{
  font-size: 12px;
}

p,a{
  color: #000000!important;
  font-size: 14px;
 
 }
label{
color: #2E00E4!important;
font-size: 12px;

}
h2{
  color:#000000;
  font-size: 28px;   
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

.help-message {
  position: absolute;
  
  left: 0;
  margin: 0;
  font-size: 14px;
}

.form-control {
  display: block;
  /* width: 100%; */
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  background-color: #fff;
 border-radius: 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

form{
 width: 550px;
  height: 0%;
  padding: 10px;
  background-color: #FFFFFF;
}

.btn{
  background: #2E00E4;
  color: white;
  padding: 12px;
  width: 100%;
  border-radius: 0;
}


.form-group input{
  background-color:#eff0ff !important;
  border: 0;
  border-bottom:2px solid #2E00E4;
  display: block;
  width: 100%;
  font-size: 12px;

}




.submit-btn {
 
  outline: none;
  border: none;
  color: #fff;
  font-size: 12px;
  padding: 10px 15px;
  display: block;
  width: 100%;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
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

.form-group.invalid input {
  background-color: var(--error-bg-color);
  color: var(--error-color);
}

.TextInput.has-error input:focus {
  border-color: var(--error-color);
}

.TextInput.has-error .help-message {
  color: var(--error-color);
}

.TextInput.success input {
  background-color: var(--success-bg-color);
  color: var(--success-color);
}

.TextInput.success input:focus {
  border-color: var(--success-color);
}

.TextInput.success .help-message {
  color: var(--success-color);
}

@media (max-width: 990px) {
form{
  width: 350px;
   height: 0%;
   padding: 10px;
   background-color: #FFFFFF;
}
}

</style>