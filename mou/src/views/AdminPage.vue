<template>
    <HeaderComp :name="name" :email="email" :pic="pic" :role="role"/>
    <HomePage :name="name" :email="email" :pic="pic" :role="role"/>
    <SideBar :name="name" :email="email" :pic="pic" :role="role"/>
</template>

<script>
import HeaderComp from './HeaderComp.vue'
import HomePage from './HomePage.vue';
import SideBar from './Sidebar.vue';
export default{
    name:'AdminPage',
    components:{
        HeaderComp,
        HomePage,
        SideBar
    },
    data(){
        return{
        name:this.$route.params.username,
        email:this.$route.params.useremail,
        pic:this.$route.params.pic,
        role:this.$route.params.role
    }
    }
}
</script>
<style scoped>
.content-body{
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 5%;
    left: 15%;
    top: 10%;
    width: 85%;
    height: 90%;
}
.add-record{
    font-family: 'Poppins',sans-serif;
    font-weight: 500;
    border-radius: 5px;
    background: rgb(14,165,233);
    border: none;
    outline: none;
    padding: 2.5px 7px;
    z-index: 2;
    cursor: pointer;
    transition: .5s;
    color: white;
    text-align: center;
}
.add{
  margin-top: 2px;
  font-size: 1.2rem;
  text-align: center;
}
/*content head*/
.content-head{
  height: 7%;
  width: 97%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3% 0 0 0;
}
select{
  border: 1px solid rgb(14,165,233);
  outline: 1px solid rgb(14,165,233);
  padding-left: 10px;
  color: white;
  font-family: 'Poppins',sans-serif;
  background: transparent;
  font-size: 1.1rem;
  border-radius: 5px;
  padding: 5px ;
  padding-right: 10%;
  cursor: pointer;
}
select option{
  background: rgb(30, 41, 59);
}
/* Dynamic and enhanced CSS for the table */
.No-data,.No-data-cross{
  color: rgb(148,163,184);
  font-family: 'Poppins',sans-serif;
  font-size: 2rem;
  font-weight: 400;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
}
.No-data-cross{
  color: rgb(118, 128, 141);
  margin-top: -5.3%;
  font-size: 2.4rem;
  z-index: 3;
  transform: rotate(15deg);
}
table {
  width: 97%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
th,
td {
  font-size: .9rem;
  text-align: center;
  padding: 15px;
  background: rgba(148, 163, 184, 0.078);
  color: #fff;
}
thead th {
  background-color: rgb(30, 41, 59);
  color: rgb(14,165,233);
  font-weight: 500;
}
tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.075);
}
tbody td {
  position: relative;
  font-weight: 400;
}
tbody td:hover:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -9999px;
  bottom: -9999px;
  background-color: rgba(255, 255, 255, 0.075);
  z-index: -1;
}
td a{
    padding: 5px;
    cursor: pointer;
}
.edit{
  color: rgb(148,163,184);
}
.edit,.delete{
  transition: .5s;
}
.edit:hover,.delete:hover{
  transform: scale(1.3);
}
.delete{
  color: red;
}
/*side-bar*/
.side-nav{
    position: absolute;
    text-align: center;
    display: flex;
    flex-direction: column; 
    padding: 10px 0px;
    justify-content: space-around;
    gap: 15px;
    align-items: center;
    top: 8%;
    width: 15%;
}
.side-nav h1{
    font-weight: 500;
    font-size: 1.3rem;
    margin-top: 0;
    width: 100%;
    color: rgb(14,165,233);
}
.catagories{
    position: relative;
    top: 3%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    text-align: center;
    width: 100%;
    list-style: none;
}
.catagories a{
    text-decoration: none;
    color: white;
    transition: 1s;
    cursor: pointer;
}
.catagories a:hover{
    color: rgb(14,165,233);
    transform: scale(2);
}
.side-nav button{
    border: none;
    outline: none;
    background: rgb(14,165,233);
    color: white;
    padding: 3% 5%;
    border-radius: 3px;
    cursor: pointer;
    font-weight: 500;
    font-family: "Poppins",sans-serif;
    transition: .5s;
}
button:hover{
    transform: scale(1.1);
    background: rgba(14, 164, 233, 0.738);
}
/*Add and Edit Record*/
.add-record-page{
  position: relative;
  top: -10%;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
}
.add-record-page h1{
  color: rgb(148,163,184);
  text-transform: uppercase;
  font-weight: 400;
}
form{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
}
.add-record-page .inputbox{
  width: 100%;
  color: rgb(148,163,184);
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}
.inputbox input{
  height: 5vh;
  width: 50vh;
  border: 1px solid rgb(14,165,233);
  font-family: "Poppins",sans-serif;
  font-size: 1.1rem;
  color: white;
  border-radius: 5px;
  padding-left: 10px;
  background: rgb(30, 41, 59);
}
.inputbox input::placeholder{
  color: white;
}
.inputbox select{
  width: 52vh;
  background: rgb(30, 41, 59);
  outline: none;
  color: white;
  border: 1px solid rgb(14,165,233);
}
.inputbox select option{
  color: white;
}
.inputbox input:focus,select:focus{
  background: transparent;
  border: 1px solid rgb(14,165,233);
  outline: 1px solid rgb(14,165,233);
}
.add-record-page button{
  font-family: 'Poppins',sans-serif;
  font-size: 1rem;
  font-weight: 400;
  padding: 5px 10px;
  background: rgb(14,165,233);
  outline: none;
  border: none;
  border-radius: 5px;
  color: white;
  transition: .5s;
}
.inputbox label{
  color: white;
}
.add-record-page button:hover{
  background: rgba(14, 164, 233, 0.738);
}
</style>