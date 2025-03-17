<template>
    <div class="app">
  <div class="login">
     <h2>Welcome Back!</h2>
      <div class="image">
          <img src="../assets/logo.png" alt="MOU - Portal">
      </div>
      <p class="name">BIT MOU Portal</p>
      <div class="break"></div>
      <GoogleLogin :callback="callback" prompt auto-login>     
      </GoogleLogin>
      <p>Sign In with your MOU Account</p>
  </div>
</div>
</template>

<script>

import { GoogleLogin , decodeCredential} from 'vue3-google-login';
import axios from 'axios';


export default {
  name: 'App',
  components: {
      GoogleLogin,
      
  },
  methods: {
      async callback(response) {
          let user = decodeCredential(JSON.stringify(response.credential));
          try{
              const res = await axios.post('http://localhost:5000/aruth/api/auth/google', {
                  credential: user
              });
              const data = res.data;
              if (data.role === 'admin') {
                this.$router.push({ name: 'admin', params: { username: user.name, useremail: user.email , pic : user.picture,role:'admin'}});
              }else if(data.role === 'Faculty'){
                this.$router.push({ name: 'faculty', params: { name: user.name, email: user.email,pic : user.picture,role:'faculty' }});
              }else{
                    alert("Not Allowed")
                    this.$router.push('/')
              }
          }catch(error){
              console.error();
          }   
          
      }
  },
  
}
</script>


<style scoped>
.app{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}
.login{
  background: rgb(30, 41, 59);
  color: rgb(148,163,184);
  width: 28%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.login h2{
  font-size: 2rem;
  font-weight: 400;
}
.login .image{
  margin-top: -15%;
  height: 50%;
  width: 100%;
  text-align: center;
}
.login img{
  height: 100%;
}
.login .break{
  margin-top: -10%;
  height: 2px;
  width: 30%;
  background: white;
}
.login .name{
  font-size: 1.7rem;
  margin-top: -10%;
}

@media screen and (max-width: 400px) {
.login{
  width: 70%;
  height: 65vh;
}
.login h2{
  font-size: 1.5rem;
}
.login img{
  height: 85%;
}
.g-btn-wrapper{
  margin-top: 20px;
}
.login .break{
  margin-top: -5%;
  width: 50%;
}
.login .name{
  font-size: 1.2rem;
}
}

</style>
