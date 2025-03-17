<template>
    <HeaderComp :name="name" :email="email" :pic="pic" :role="role"/>
    <Sidebar :name="name" :email="email" :pic="pic" :role="role"/>
    <AddEvent v-if="isaddevent"/>
    <button class="back" v-if="isaddevent" @click="back()"><font-awesome-icon icon="fa-arrow-left" /></button>
    <div class="event-display" v-if="!isaddevent">
        <h2 v-if="isevents">{{ cat }} Events:</h2>
        <button class="addeventbutton" @click="addevent()">Add Event</button>
        <!-- <h2 v-if="isevents">Table Will Be Here</h2> -->
        <div class="table-wrapper"> <!-- Wrapper for the scrollable table -->
            <table v-if="isevents">
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>MOU Name</th>
                        <th>Event Name</th>
                        <th>About Event</th>
                        <th>Chief Guest</th>
                        <th>Total Participants</th>
                        <th>Expenditure</th>
                        <th>Amount Generated</th>
                        <th>Event Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(rec,index) in events" v-bind:key="rec._id">
                        <td style="color: rgb(14, 165, 233);">{{ index+1 }}</td>
                        <td>{{ rec.mouName }}</td>
                        <td>{{ rec.eventName }}</td>
                        <td>{{ rec.eventAbout }}</td>
                        <td>{{ rec.chiefGuest }}</td>
                        <td>{{ rec.totalParticipants }}</td>
                        <td>{{ rec.expenditure }}</td>
                        <td>{{ rec.amountGenerated }}</td>
                        <td>{{ formatDate(rec.eventDate) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h4 v-if="!isevents">No Events</h4>
        <font-awesome-icon v-if="!isevents" class="doc" icon="fa-solid fa-file" />
        <h3 v-if="!isevents">/</h3>
    </div>
</template>
<script>
import AddEvent from './AddEvent.vue';
import Sidebar from './Sidebar.vue';
import HeaderComp from './HeaderComp.vue';
import axios from 'axios';
export default{
    name:"EventHome",
    components:{
        HeaderComp,
        Sidebar,
        AddEvent
    },
    data(){
        return{
            name:this.$route.params.username,
            email:this.$route.params.useremail,
            pic:this.$route.params.pic,
            role:this.$route.params.role,
            cat:this.$route.params.cat,
            events:[],
            isevents:true,
            isaddevent:false
        }
    },
    mounted(){
        axios.post("http://localhost:5000/events/display-record",{cat:this.cat}).then((response)=>{
            this.events = response.data.message;
            if(this.events.length === 0){
                this.isevents = !this.events;
            }
            // window.location.reload();
        })
    },
    methods:{
        addevent(){
            this.isaddevent = !this.isaddevent;
        },
        back(){
            window.location.reload();
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return new Date(dateString).toLocaleDateString(undefined, options); // Formats date without time
        },
        loadpage(){
            window.location.reload();
        }
    },
    watch:{
        $route(){
            this.loadpage();
        }
    }
}
</script>
<style>
.event-display{
    text-align: center;
    position: absolute;
    left: 16.4%;
    top: 8vh;
    height: 92vh;
    width: 83.6%;
    /* background: red; */
}
.event-display h2{
    text-align: left;
    width: fit-content;
    margin-left: 10px;
    font-weight: 400;
    color: rgb(148, 163, 184);
    border-bottom:1px solid rgb(51, 65, 85) ;
}

.event-display h4{
    color: rgb(148, 163, 184);
    /* background: red; */
    font-size: 2rem;
    text-transform: uppercase;
    margin-top: 15%;
    font-weight: 400;
}
.event-display .doc{
    position: relative;top: -5%;
    /* background: red; */
    font-size: 2.4rem;
    color: rgb(148, 163, 184);
}
.event-display h3{
    color: rgb(148, 163, 184);
    font-size: 3rem;
    transform: rotate(15deg);
    font-weight: 400;
    margin-top: -85px;
}
.addeventbutton{
    cursor: pointer;
    position: absolute;
    right: 7%;
    top: 5.5%;
    font-family: 'Poppins',sans-serif;
    font-weight: 500;
    color: white;
    background: rgb(14,165,233);
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 5px 10px;
    transition: .5s;

}
.addeventbutton:hover{
    transform: scaleX(1.1);
    background: rgba(14, 164, 233, 0.788);
}

/* Table Style */
.table-body {
    color: rgb(148, 163, 184);
}

.table-body .active h2,
.table-body .inactive h2 {
    width: fit-content;
    font-weight: 400;
    margin-left: 10px;
    border-bottom: 1px solid rgb(51, 65, 85);
}

/* Table Wrapper for Scroll */
.event-display .table-wrapper {
    height: fit-content;
    width: 98%;
    margin-top: 50px;
    margin-left: 10px;
    border-radius: 5px;
    overflow-y: hidden;
    overflow-x: auto; /* Enable horizontal scroll */
}

table {
    width: 100%;
    min-width: 1200px; /* Set a minimum width to avoid cramping */
    border-collapse: collapse;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    white-space: nowrap; /* Force single-line rows */
}

th,
td {
    font-size: 0.9rem;
    text-align: center;
    padding: 15px;
    background: rgba(148, 163, 184, 0.078);
    color: #fff;
}

thead th {
    background-color: rgb(30, 41, 59);
    color: rgb(14, 165, 233);
    font-weight: 500;
}
tbody tr{
    cursor: pointer;
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
</style>