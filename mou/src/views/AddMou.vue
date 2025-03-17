<template>
    <!-- <HeaderComp :name="name" :email="email" :pic="pic"/>
    <Sidebar :name="name" :email="email" :pic="pic"/> -->
    <div class="add-mou">
        <h1>Add Mou</h1>
        <div class="form">
            <form @submit.prevent="addrecord()">
                <div class="inputbox">
                    <label for="mou_type">MOU Type :</label>
                    <select name="mou_type" id="mou_type" v-model="input.mou_type">
                        <option disabled selected value>Select MOU Type</option>
                        <option :value="dept">{{ dept }}</option> 
                    </select>
                </div>
              <div class="inputbox">
                <label for="comapny_name">Company Name :</label>
                <input type="text" id="comapny_name" name="company_name" placeholder="Enter Company Name"  required>
              </div>
              <div class="inputbox">
                <label for="comapny_location">Company Location :</label>
                <input type="text" id="comapny_location" name="company_location" placeholder="Enter Company Location"  required>
              </div>
              <div class="inputbox">
                <label for="mou_name">MOU Name :</label>
                <input type="text" id="mou_name" name="mou_name" placeholder="Enter MOU Name"  required>
              </div>
              <div class="inputbox">
                <label for="company_about">About Company :</label>
                <textarea id="company_about" name="company_about" placeholder="Details About the Company"  required></textarea>
              </div>
              <div class="inputbox">
                <label for="task">MOU Description :</label>
                <textarea id="mou_des" name="mou_des" placeholder="Description of MOU" required></textarea>
              </div>
              <div class="inputbox">
                <label for="outcome">Outcome :</label>
                <input type="text" id="outcome" name="outcome" placeholder="Outcome Of the MOU" required>
              </div>
              <div class="inputbox">
                <label for="rpi">Responsible Person From {{ dept }} :</label>
                <div class="rpi_details">
                  <input type="text" id="rpi" name="rpi" placeholder="Name Of the person" required/>
                  <input type="email" id="rpi_email" name="rpi_email" placeholder="Email of the person" required/>
                  <input type="tel" id="rpi_phone" name="rpi_phone" pattern="[0-9]{5}[0-9]{5}" maxlength="10" minlength="10" placeholder="Phone Number Of the person (eg.90052-67389)" required/>
                </div>
              </div>
              <div class="inputbox">
                <label for="rpc">Responsible Person From Company :</label>
                <div class="rpi_details">
                  <input type="text" id="rpc" name="rpc" placeholder="Name Of the person" required/>
                  <input type="email" id="rpc_email" name="rpc_email" placeholder="Email of the person" required/>
                  <input type="tel" id="rpc_phone" name="rpc_phone" pattern="[0-9]{5}[0-9]{5}" maxlength="10" minlength="10" placeholder="Phone Number Of the person (eg.90052-67389)" required/>
                </div>
              </div>
              <div class="inputbox">
                <label for="cont_type">Contribution Type :</label>
                <input type="text" id="cont_type" name="cont_type" placeholder="Contribution Type if any">
              </div>
              <div class="inputbox">
                <label for="cont_des">Contribution Description :</label>
                <textarea id="cont_des" name="cont_des" placeholder="Constribution Description"></textarea>
              </div>
              <div class="inputbox">
                <label for="amount">Amount Generated :</label>
                <input type="text" id="amount" name="amount" placeholder="Amount if any"/>
              </div>
              <div class="inputbox">
                <label for="start_date">Start Date :</label>
                <input type="date" id="start_date" name="start_date" placeholder="Start Date" required>
              </div>
              <div class="inputbox">
                <label for="expire_date">Expire Date :</label>
                <input type="date" id="expire_date" name="expire_date" placeholder="Expire Date" required>
              </div>
              <div class="inputbox">
                <label for="status">Status :</label>
                <select name="status" id="status" >
                  <option disabled selected value>Select an option</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button>Create MOU</button>
            </form>
        </div>
        <!-- <button @click="Back()">Back</button>s -->
    </div>
</template>
<script>
import axios from 'axios';

// import HeaderComp from './HeaderComp.vue';
// import Sidebar from './Sidebar.vue';
    export default{
        name:'AddMou',
        methods:{
            Back(){
                window.location.reload();
            },
            async addrecord(){
              const moutype = document.getElementById("mou_type").value;
              const mou_name = document.getElementById("mou_name").value;
              const c_name = document.getElementById("comapny_name").value;
              const c_location = document.getElementById("comapny_location").value;
              const c_about = document.getElementById("company_about").value;
              const mou_des = document.getElementById("mou_des").value;
              const outcome = document.getElementById("outcome").value;
              const rpi_name = document.getElementById("rpi").value;
              const rpi_email = document.getElementById("rpi_email").value;
              const rpi_phone = document.getElementById("rpi_phone").value;
              const rpc_name = document.getElementById("rpc").value;
              const rpc_email = document.getElementById("rpc_email").value;
              const rpc_phone = document.getElementById("rpc_phone").value;
              const cont_type = document.getElementById("cont_type").value;
              const cont_des = document.getElementById("cont_des").value;
              const amount = document.getElementById("amount").value;
              const start_date = document.getElementById("start_date").value;
              const end_date = document.getElementById("expire_date").value;
              const status = document.getElementById("status").value;
              const responce = await axios.post("http://localhost:5000/mou/addmou",{moutype,mou_name,c_name,c_location,c_about,mou_des,outcome,rpi_name,rpi_email,rpi_phone,rpc_name,rpc_email,rpc_phone,cont_type,cont_des,amount,start_date,end_date,status});
              if(responce.data.message == 'Success'){
                alert("Record Added Successfully");
                this.Back();
              }else{
                alert(responce.data.message);
                this.Back();
              }
            }
        },
        props:{
            dept:String
        },
        data() {
            return {
                input: {
                    mou_type: this.dept || ''
                }
            };
        },
        // components:{
        //     HeaderComp,
        //     Sidebar
        // },
        // data(){
        //     return{
        //         dept:this.$route.params.type
        //     }
        // }
    }
</script>
<style scoped>
.add-mou{
    position: absolute;
    /* background: red; */
    text-align: center;
    top: 8%;
    height: 92%;
    left: 16.5%;
    width: 83.5%;
    overflow-y: auto;
}
.add-mou h1{
    color: rgb(148,163,184);
    font-weight: 400;
    text-transform: uppercase;
}
form{
    /* background: blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding-bottom: 50px;
}
form .inputbox{
  /* background: red; */
  color: rgb(148,163,184);
  display: grid;
  gap: 10px;
  grid-template-columns: 30% 70%;
}
form .inputbox label{
    text-align: right;
    font-size: 1.1rem;
    padding-right: 30px;
}
.inputbox input,
.inputbox textarea,
.inputbox select{
  height: 5vh;
  width: 60%;
  border: 1px solid rgb(14,165,233);
  font-family: "Poppins",sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: white;
  border-radius: 5px;
  padding-left: 10px;
  background: rgb(30, 41, 59);
}
.inputbox input:focus,
.inputbox textarea:focus,
.inputbox select:focus{
  outline: 1px solid rgb(14,165,233);
}
.inputbox textarea{
    height: 100px;
    resize: none;
    padding-top: 5px;
}
.inputbox select{
    width: 61.5%;
}
form button{
    cursor: pointer;
    width: 10%;
    margin-left: 64%;
    outline: none;
    border: none;
    border-radius: 5px;
    background: rgb(14,165,233);
    padding: 5px;
    font-family: 'Poppins',sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.793);
    transition: .7s;
}
form button:hover{
    background: rgba(14, 164, 233, 0.788);
    transform: scaleX(1.1)
}
.rpi_details{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 60%;
  gap: 20px;
  /* background: red; */
}
.rpi_details input{
  width: 100%;
  margin-left: 10px;
}
</style>