<template>
    <div class="add-event">
        <h1>Add Event</h1>
        <div class="form">
            <form @submit.prevent="addevent()">
              <div class="inputbox">
                <label for="mou_name">MOU Name :</label>
                <input type="text" id="mou_name" name="mou_name" placeholder="Enter Mou Name" @input="search()" v-model="selectedOption" required>
                <ul v-if="searchRecord.length > 0">
                  <li v-for="record in searchRecord" :key="record" @click="update(record.mouName)">
                    <a @click="update(record.mouName)">{{ record.mouName }}</a>
                  </li>
                </ul>
              </div>
              <div class="inputbox">
                <label for="event_name">Event Name :</label>
                <input type="text" id="event_name" name="event_name" placeholder="Enter Event Name"  required>
              </div>
              <div class="inputbox">
                <label for="event_about">About Event :</label>
                <textarea id="event_about" name="event_about" placeholder="Details About the Event"  required></textarea>
              </div>
              <div class="inputbox">
                <label for="participants">Total Participants :</label>
                <input type="number" id="participants" name="participants" placeholder="Number of Participants" required>
              </div>
              <div class="inputbox">
                <label for="chief_guest">Chief Guest :</label>
                <input type="text" id="chief_guest" name="chief_guest" placeholder="Chief Guest Of the Event" required/>
              </div>
              <div class="inputbox">
                <label for="expenditure">Expenditure :</label>
                <input type="text" id="expenditure" name="expenditure" placeholder="Expenditure for the Event If Any">
              </div>
              <div class="inputbox">
                <label for="amount">Amount Generated :</label>
                <input type="text" id="amount" name="amount" placeholder="Amount if any"/>
              </div>
              <div class="inputbox">
                <label for="event_date">Event Date :</label>
                <input type="date" id="event_date" name="event_date" placeholder="Event Date" required>
              </div>
              <button>Create Event</button>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default{
    name:"AddEvent",
    data(){
      return{
        searchRecord:[],
        selectedOption:""
      }
    },
    methods:{
      async search(){
        const mou_name = document.getElementById("mou_name").value;
        if(mou_name)
          try{
            const res = await axios.post("http://localhost:5000/events/searchMou",{mou_name});
            this.searchRecord = res.data.data;
          }catch(error){
            console.log(error);
          }
        else{
          this.searchRecord = [];
        }
      },
      update(mou_name){
        this.selectedOption = mou_name;
        this.searchRecord = [];
      },
      async addevent(){
        const mou_name = document.getElementById("mou_name").value;
        const event_name = document.getElementById("event_name").value;
        const participants = document.getElementById("participants").value;
        const chief_guest = document.getElementById("chief_guest").value;
        const event_about = document.getElementById("event_about").value;
        const expenditure = document.getElementById("expenditure").value;
        const amount = document.getElementById("amount").value;
        const event_date = document.getElementById("event_date").value;
        console.log(event_date)
        try {
          const res = await axios.post("http://localhost:5000/events/addEvent",{mou_name:mou_name,event_name:event_name,event_about:event_about,participants:participants,chief_guest:chief_guest,expenditure:expenditure,amount:amount,event_date:event_date})
          console.log(res.data.message);
          alert(res.data.message);
          window.location.reload();
        } catch (error) {
          console.log(error)
        }
      }
    }
}
</script>
<style>
.add-event{
    position: absolute;
    top: 8%;
    left: 16.3%;
    height: 92%;
    width: 83.7%;
    overflow-y: auto;
    text-align: center;
    /* background: red; */
}
.add-event h1{
    color: rgb(148,163,184);
    font-weight: 400;
    text-transform: uppercase;
}
.add-event ul{
  position: relative;
  /* background: red; */
  height: 13w
  0vh;
  overflow-y: auto;
  top: -3.2vh;
  left: 92.5%;
  text-align: center;
  width: 143%;
  list-style: none;
}
.add-event ul li{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 5vh;
  list-style: none;
  margin-top: 1px;
  text-align: center;
  margin-bottom: 3px;
  background: rgb(30, 41, 59);
  border: 1px solid rgb(14,165,233);
  border-radius: 5px;
  cursor: pointer;
}
.add-event ul li a{
  cursor: pointer;
  display: block;
  text-align: center;
}

</style>