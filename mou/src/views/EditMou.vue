<template>
    <div class="edit-mou">
        <h1>Edit Mou</h1>
        <div class="form">
            <form @submit.prevent="editrecord(record)">
                <div class="inputbox">
                    <label for="mou_type">MOU Type :</label>
                    <select name="mou_type" id="mou_type" v-model="input.mou_type">
                        <option disabled selected value>Select MOU Type</option>
                        <option :value="dept">{{ dept }}</option> 
                    </select>
                </div>
              <div class="inputbox">
                <label for="comapny_name">Company Name :</label>
                <input type="text" id="comapny_name" name="company_name" placeholder="Enter Company Name" v-model="record.name"  required>
              </div>
              <div class="inputbox">
                <label for="mou_name">MOU Name :</label>
                <input type="text" id="mou_name" name="mou_name" placeholder="Enter MOU Name" v-model="record.mouName"  required>
              </div>
              <div class="inputbox">
                <label for="company_about">About Company :</label>
                <textarea id="company_about" name="company_about" placeholder="Details About the Company" v-model="record.about"  required></textarea>
              </div>
              <div class="inputbox">
                <label for="task">MOU Description :</label>
                <textarea id="mou_des" name="mou_des" placeholder="Description of MOU" v-model="record.description" required></textarea>
              </div>
              <div class="inputbox">
                <label for="outcome">Outcome :</label>
                <input type="text" id="outcome" name="outcome" placeholder="Outcome Of the MOU" v-model="record.outcome" required>
              </div>
              <div class="inputbox">
                <label for="rpi">Responsible Person From {{ dept }} :</label>
                <div class="rpi_details">
                  <input type="text" id="rpi" name="rpi" placeholder="Name Of the person" v-model="record.responsiblePersonInstitute" required/>
                  <input type="email" id="rpi_email" name="rpi_email" placeholder="Email of the person" v-model="record.responsiblePersonInstituteEmail" required/>
                  <input type="tel" id="rpi_phone" name="rpi_phone" pattern="[0-9]{5}[0-9]{5}" maxlength="10" minlength="10" placeholder="Phone Number Of the person (eg.90052-67389)" v-model="record.responsiblePersonInstitutePhone" required/>
                </div>
              </div>
              <div class="inputbox">
                <label for="rpc">Responsible Person From Company :</label>
                <div class="rpi_details">
                  <input type="text" id="rpc" name="rpc" placeholder="Name Of the person" v-model="record.responsiblePersonCompany" required/>
                  <input type="email" id="rpc_email" name="rpc_email" placeholder="Email of the person" v-model="record.responsiblePersonCompanyEmail" required/>
                  <input type="tel" id="rpc_phone" name="rpc_phone" pattern="[0-9]{5}[0-9]{5}" maxlength="10" minlength="10" placeholder="Phone Number Of the person (eg.90052-67389)" v-model="record.responsiblePersonCompanyPhone" required/>
                </div>
              </div>
              <div class="inputbox">
                <label for="cont_type">Contribution Type :</label>
                <input type="text" id="cont_type" name="cont_type" placeholder="Contribution Type if any" v-model="record.contributionType">
              </div>
              <div class="inputbox">
                <label for="cont_des">Contribution Description :</label>
                <textarea id="cont_des" name="cont_des" placeholder="Constribution Description" v-model="record.contributionDescription"></textarea>
              </div>
              <div class="inputbox">
                <label for="amount">Amount Generated :</label>
                <input type="text" id="amount" name="amount" placeholder="Amount if any" v-model="record.amount"/>
              </div>
              <div class="inputbox">
                <label for="start_date">Start Date :</label>
                <input type="date" id="start_date" name="start_date" placeholder="Start Date" v-model="record.startDate" required>
              </div>
              <div class="inputbox">
                <label for="expire_date">Expire Date :</label>
                <input type="date" id="expire_date" name="expire_date" placeholder="Expire Date" v-model="record.endDate" required>
              </div>
              <div class="inputbox">
                <label for="status">Status :</label>
                <select name="status" id="status" v-model="record.status" required>
                  <option disabled selected value>Select an option</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button>Create MOU</button>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default{
    name:"EditMou",
    data(){
        return{
            input: {
                mou_type: this.dept || ''
            },
            record:this.rec
        }
    },props:{
        rec:{
            type:Object,
            required:true
        },
        dept:String
    },methods:{
        async editrecord(record){
            const res = await axios.post("http://localhost:5000/mou/editmou",{rec:record,type:this.input.mou_type})
            alert(res.data.message);
            window.location.reload();
        }
    }
}
</script>
<style>
.edit-mou{
    position: absolute;
    overflow-y: auto;
    /* background: red; */
    text-align: center;
    top: 8.3%;
    width: 83.6%;
    height: 91.7%;
    margin-left: 16.4%;
}
.edit-mou h1{
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