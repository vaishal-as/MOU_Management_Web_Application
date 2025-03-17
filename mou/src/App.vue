<template>
    <RouterView/>
</template>

<script>
import router from './router/router'; // Import the router instance
export default {
  router,
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
body{
  height: 100vh;
  background: rgb(15,23,42);
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Poppins',sans-serif;
  width: 100%;
  height: 100%;
  margin: 0;
}

</style>
