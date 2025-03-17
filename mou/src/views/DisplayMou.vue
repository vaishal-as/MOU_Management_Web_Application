<template>
    <EditMou :rec="rec" :dept="dept" v-if="editmou"/>
    <AddMou :dept="dept" v-if="addmou"/>
    <button class="back" @click="back()" v-if="addeditbackbutton"><font-awesome-icon icon="fa-arrow-left" /></button>
    <div class="display-mou" v-show="showtable">
        <div class="dis-head">
            <h4>Records Of {{ dept }}</h4>
            <button @click="adddata()">Add MOU</button>
        </div>
        <div class="table-body">
            <div class="active">
                <h2>Active Records</h2>
                <p v-show="!isactiverecords">NO Active DATA</p>
                <div class="table-wrapper"> <!-- Wrapper for the scrollable table -->
                    <table v-if="isactiverecords">
                        <thead>
                            <tr>
                                <th>S.NO</th>
                                <th>MOU Name</th>
                                <th>Company Name</th>
                                <th>Location</th>
                                <th>About</th>
                                <th>Description</th>
                                <th>Outcome</th>
                                <th>Institute Incharge</th>
                                <th>Institute Incharge Email</th>
                                <th>Institute Incharge Phonenumber</th>
                                <th>Company Incharge</th>
                                <th>Company Incharge Email</th>
                                <th>Company Incharge Phonenumber</th>
                                <th>Contribution</th>
                                <th>Contribution Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Expire Date</th>
                                <th v-if="role==='admin'">Edit</th>
                                <th v-if="role==='admin'">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(rec,index) in activerecord" v-bind:key="rec._id" @click="redirecttoevent(rec.mouName)">
                                <td style="color: rgb(14, 165, 233);">{{ index+1 }}</td>
                                <td>{{ rec.mouName }}</td>
                                <td>{{ rec.name }}</td>
                                <td>{{ rec.location }}</td>
                                <td>{{ rec.about }}</td>
                                <td>{{ rec.description}}</td>
                                <td>{{ rec.outcome }}</td>
                                <td>{{ rec.responsiblePersonInstitute }}</td>
                                <td>{{ rec.responsiblePersonInstituteEmail }}</td>
                                <td>{{ rec.responsiblePersonInstitutePhone }}</td>
                                <td>{{ rec.responsiblePersonCompany }}</td>
                                <td>{{ rec.responsiblePersonCompanyEmail }}</td>
                                <td>{{ rec.responsiblePersonCompanyPhone }}</td>
                                <td>{{ rec.contributionType }}</td>
                                <td>{{ rec.contributionDescription }}</td>
                                <td>{{ rec.amount }}</td>
                                <td>{{ rec.status }}</td>
                                <td>{{ formatDate(rec.startDate) }}</td>
                                <td>{{ formatDate(rec.endDate) }}</td>
                                <td v-if="role==='admin'">
                                    <a @click.stop="editdata(rec)">
                                        <font-awesome-icon class="edit" icon="fa-solid fa-pen-to-square" />
                                    </a>
                                </td>
                                <td v-if="role==='admin'">
                                    <a @click.stop="deletedata(rec._id,rec.Dept)">
                                        <font-awesome-icon class="delete" icon="fa-solid fa-trash-can" />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="inactive">
                <h2>Inactive Records</h2>
                <p v-show="!isinactiverecords">
                    NO INACTIVE DATA
                </p>
                <div class="table-wrapper"> <!-- Wrapper for the scrollable table -->
                    <table v-if="isinactiverecords">
                        <thead>
                            <tr>
                                <th>S.NO</th>
                                <th>MOU Name</th>
                                <th>Company Name</th>
                                <th>About</th>
                                <th>Description</th>
                                <th>Outcome</th>
                                <th>Institute Incharge</th>
                                <th>Institute Incharge Email</th>
                                <th>Institute Incharge Phonenumber</th>
                                <th>Company Incharge</th>
                                <th>Company Incharge Email</th>
                                <th>Company Incharge Phonenumber</th>
                                <th>Contribution</th>
                                <th>Contribution Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Expire Date</th>
                                <th v-if="role==='admin'">Edit</th>
                                <th v-if="role==='admin'">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(rec,index) in inactiverecord" v-bind:key="rec._id" @click="redirecttoevent(rec.mouName)">
                                <td style="color: rgb(14, 165, 233);">{{ index+1 }}</td>
                                <td>{{ rec.mouName }}</td>
                                <td>{{ rec.name }}</td>
                                <td>{{ rec.about }}</td>
                                <td>{{ rec.description}}</td>
                                <td>{{ rec.outcome }}</td>
                                <td>{{ rec.responsiblePersonInstitute }}</td>
                                <td>{{ rec.responsiblePersonInstituteEmail }}</td>
                                <td>{{ rec.responsiblePersonInstitutePhone }}</td>
                                <td>{{ rec.responsiblePersonCompany }}</td>
                                <td>{{ rec.responsiblePersonCompanyEmail }}</td>
                                <td>{{ rec.responsiblePersonCompanyPhone }}</td>
                                <td>{{ rec.contributionType }}</td>
                                <td>{{ rec.contributionDescription }}</td>
                                <td>{{ rec.amount }}</td>
                                <td>{{ rec.status }}</td>
                                <td>{{ formatDate(rec.startDate) }}</td>
                                <td>{{ formatDate(rec.endDate) }}</td>
                                <td v-if="role==='admin'">
                                    <a @click.stop="editdata(rec)" title="Edit">
                                        <font-awesome-icon class="edit" icon="fa-solid fa-pen-to-square" />
                                    </a>
                                </td>
                                <td v-if="role==='admin'">
                                    <a @click="deletedata(rec._id)" title="Delete">
                                        <font-awesome-icon class="delete" icon="fa-solid fa-trash-can" />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import AddMou from './AddMou.vue';
import EditMou from './EditMou.vue';
export default {
    name: 'DisplayMou',
    data(){
        return{
            activerecord:[],
            inactiverecord:[],
            rec:{},
            isactiverecords:false,
            isinactiverecords:false,
            addmou:false,
            showtable:true,
            addeditbackbutton:false,
            editmou:false
        }
    },
    components:{
        AddMou,EditMou
    },
    props:{
        dept:String,
        name:String,
        email:String,
        pic:String,
        role:String
    },mounted() {
        axios.post('http://localhost:5000/mou/record',{type:this.dept}).then((response)=>{
            this.activerecord = response.data.activerecords;
            this.inactiverecord = response.data.inactiverecords;
            if(this.activerecord.length === 0){
                this.isactiverecords = false;
            }else{
                this.isactiverecords = true;
            }
            if(this.inactiverecord.length === 0){
                this.isinactiverecords = false;
            }else{
                this.isinactiverecords = true;
            }
        })
    },
    methods: {
        adddata(){
            this.addmou = !this.addmou;
            this.addeditbackbutton = !this.addeditbackbutton;
            this.showtable = !this.showtable
        },
        redirecttoevent(cat){
            this.$router.push({name:"eventpage",params:{ username: this.name, useremail: this.email, pic: this.pic,role:this.role,cat:cat}});
        },
        formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options); // Formats date without time
        },
        back(){
            window.location.reload();
        },
        async deletedata(id){
            console.log(this.dept);
            await axios.post("http://localhost:5000/mou/delete",{id:id,dept:this.dept}).then((res)=>{
                alert(res.data.message);
                window.location.reload();
            })
        },
        async editdata(rec){
            this.rec = rec;
            this.editmou = !this.editmou;
            this.addeditbackbutton = !this.addeditbackbutton
            this.showtable = !this.showtable;
            console.log(rec._id);
        }
    }
}
</script>
<style>
.display-mou{
    /* background: red; */
    position: absolute;
    top: 8vh;
    left: 16.35%;
    height: 92vh;
    width: 83.65%;
    color: rgb(148,163,184);
}
.display-mou h4{
    font-weight: 400;
    color: rgb(14,165,233);
}
.active p,
.inactive p{
    text-align: center;
    margin-left: 10px;
}
/* Display Head */
.dis-head{
    margin-left: 10px;
    height: 50px;
    width: 99%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
/* Add Mou */
.dis-head button{
    position: relative;
    font-family: 'Poppins',sans-serif;
    font-weight: 500;
    cursor: pointer;
    top: 60px;
    margin-right: 1%;
    outline: none;
    border: none;
    padding: 5px 15px;
    border-radius: 5px;
    color: white;
    text-transform: uppercase;
    background: rgb(14, 165, 233);
    transition: .7s;
}
.dis-head button:hover{
    background: rgba(14, 164, 233, 0.788);
    transform: scaleX(1.1);
}
.back{
    cursor: pointer;
    position: absolute;
    text-align: center;
    left: 18%;
    top: 12%;
    border: none;
    outline: none;
    border-radius: 5px;
    background: rgb(14,165,233);
    color: white;
    padding: 7px 12px;
    transition: .7s;
}
.back:hover{
    background: rgba(14, 164, 233, 0.788);
    transform: scaleX(1.1);
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
.table-wrapper {
    height: fit-content;
    width: 98%;
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

td a {
    padding: 5px;
    cursor: pointer;
}

.edit {
    color: rgb(148, 163, 184);
}

.edit,
.delete {
    transition: 0.5s;
}

.edit:hover,
.delete:hover {
    transform: scale(1.3);
}

.delete {
    color: red;
}
</style>