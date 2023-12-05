
<script>
import { getAuth, signOut  } from 'firebase/auth';

import { useRouter } from 'vue-router'; // Import Vue Router


    export default {
    
  data(){
            return{
                scrolledNav:null,
                mobile:null,
                mobileNav:null,
                windowWidth:null,
            }
        },
        created(){
            window.addEventListener('resize',this.checkScreen)
            this.checkScreen()
        },

        mounted(){
            window.addEventListener('scroll',this.updateScroll)
        },
        methods: {
            toggleMobileNav(){
                this.mobileNav =!this.mobileNav;
                
            },

            updateScroll() {
                const scrollPosition = window.scrollY;
                if(scrollPosition > 460){
                    this.scrolledNav = true;
                    return
                }
                this.scrolledNav = false
            },

            checkScreen(){
                this.windowWidth =window.innerWidth;
                if(this.windowWidth <= 1000){
                    this.mobile = true
                    return
                }
                this.mobile = false;
                this.mobileNav = false;
                return;
            },
            scrollToTop(){
              window.scrollTo(0, 0);
            },
            signOut() {
              const auth = getAuth();
      return signOut (auth)
.then((e) => {
 console.log(e)
 window.location.reload(true) 
 localStorage.clear()
 sessionStorage.clear()
  this.$router.push({ name: 'home' });
}).catch((error) => {
 
});

    },
        },
    }
</script>
<template>
 
    <header class="header container gap-5 pt-3 " :class="{'scrolled-nav':scrolledNav}"> 
      <a class="navbar-brand  " href="/"><Logo src="/path/to/logo.png" /></a>
    <nav class="navbar d-flex align-items-center   ">
      <div v-show="!mobile" >
          <div class="navbar1 d-flex   ">
            <div>
              <!-- <ul class="navigation d-flex gap-4">
                <router-link @click="scrollToTop"   class="nav-link  "  to="/">Home</router-link>
                <router-link @click="scrollToTop"  class="nav-link "  to="/">Why us</router-link>
                <router-link @click="scrollToTop"    class="nav-link "  to="/">Features</router-link>
               
          
            </ul>  -->
            </div>

          </div>
        
        </div>
        
       
       </nav> 
       <div  v-show="!mobile">
        <div class="d-flex align-items-center">
         <button  class="text-decoration-none btn sign" @click="signOut" >
         Sign Out
           
         </button>
       
       </div>
      </div>
      <div class="icon ">
       
          <svg  @click="toggleMobileNav" v-show="mobile" :class="{'icon-active':mobileNav}" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.6665 20.6667V23.3333H29.3332V20.6667H2.6665ZM2.6665 14V16.6667H29.3332V14H2.6665ZM2.6665 7.33334V10H29.3332V7.33334H2.6665Z" fill="#2E00E4"/>
            </svg>
            
      </div>

     
       <ul v-show="mobileNav" class="dropdown-nav">
        <!-- <router-link  @click="toggleMobileNav();scrollToTop()"  class="nav-link "  to="/">Home</router-link>
        <router-link  @click="toggleMobileNav();scrollToTop()"  class="nav-link"  to="/">Why us</router-link>
           <router-link  @click="toggleMobileNav();scrollToTop()"  class="nav-link"  to="/">Features</router-link>
           -->
            
           <div class="d-flex flex-column ">
           
      
             <router-link @click="signOut" to="/"><a href=""><button type="button" class="btn sign  " style="width:100%">Sign Out</button> </a> </router-link>
             
         </div>
       
       </ul>   
      

   </header>

</template>
<style scoped>

 
 .sign{
    width: 100px;
    background-color:white;
    color: #2E00E4;
    font-size: 16px;
    font-weight: 500;
    border: 2px solid #2E00E4 ;

 }
 .nav-link{
  padding-right:20px ;
  color: #43438A !important;
font-size: 16px !important;
 }
 
 
 

 .header{
  display: flex;
  align-items: center;
  transition: .5s ease all;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  right: 0;
  background:white;
z-index: 1;

  
}
nav.navbar{
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: center;
}


nav.navbar a{
color: #2E00E4;
font-size: 16px;

}









.icon{
  color:#2E00E4;
  cursor: pointer;
  margin-right: 10px;
}

.icon i{
  transition: 0.8s ease all;
}

.icon-active{
  transform: rotate(180deg);
}

.dropdown-nav{
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100vh;
  background: white;
  top: 70px;
  left: 0;
  gap: 20px;
  transition: height .2s ease-in-out;
  padding: 20px;
  font-size: 40px; 
  color: #2E00E4;
  z-index: 100;
} 

 .nav-links{
  
  font-size: 40px; 
  color: #383850;
  
} 



.dropdown-nav li{
   margin-left: 0;
   list-style: none;
   
}

.dropdown-nav a{
  color: #2E00E4;
  text-decoration: none;
  padding: 5px;
}

.dropdown-nav a:hover{
  color: #143F6B;
  

}





.navigation{
  display: flex;
  align-items: center;
 
}

.navigation {
  list-style: none;
  padding: 10px;
  display: flex;
  white-space: nowrap;
  
}

ul.navigation{
  margin-bottom: 0;
  padding-left: 0;
}


nav.navbar a{
  box-shadow: inset 0 0 0 0 #4e5051;
  color: #2E00E4; 
  padding: 4px;
  font-size: 20px;
  transition: color .3s ease-in-out, box-shadow .3s ease-in-out ;
  text-decoration: none;
}





@media (max-width :1124px){
  .header .nav-links{
      display: none ;
   }
   .header{
    padding: 10px;
   }
  
   .header .nav-links.active{
      position: fixed;
      height: 100vh;
      width: 100%;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column ;
      justify-content: center;
      align-items: center;
      background: white;
      
   }
  

  
  
   header nav.navbar a{
      box-shadow: inset 0 0 0 0 #54b3d6;
      color: #383850;
      font-weight:bold;
      padding: 4px;
      font-size: 14px;
      transition: color .3s ease-in-out, box-shadow .3s ease-in-out ;
      
  }
  
  
}

</style>