<template>
    <div class="sidebar">
        <div class="catagories">
            <li class="first">
                <a @click="this.$router.push({ name: role, params: { username: name, useremail:email , pic :pic,role:role}})">Home</a>
            </li>
            <li class="first">
                <a @click="ShowOptions()">Resources</a>
            </li>
            <li v-show="showcontent" class="second">
                <a @click="Showmou()">MOU</a>
            </li>
            <li v-show="show" class="third">
                <a @click="this.$router.push({ name: 'CollegeMou', params: { username:name, useremail:email , pic:pic,dept:'Institute',role:role}})">Institute MOU</a>
            </li>
            <li v-show="show" class="third">
                <a @click="showdept()">Departments Mou</a>
            </li>
            <li v-show="showdepartment" class="four">
                <a @click="navigatetodept('CSE')">CSE</a>
            </li>
            <li v-show="showdepartment" class="four">
                <a @click="navigatetodept('ECE')">ECE</a>
            </li>
            <li v-show="showcontent" class="second">
                <a @click="eventroute('all')">Events</a>
            </li>
        </div>
        <button @click="this.$router.push({name:'adduser'})">Add User</button>
    </div>
</template>
<script>
    export default{
        name: 'SideBar',
        data(){
            return{
                showcontent:true,
                showdepartment:false,
                show:false,
                institute:"Institute",
                name:this.$route.params.username,
                email:this.$route.params.useremail,
                pic:this.$route.params.pic,
                role:this.$route.params.role
            }
        },methods:{
            ShowOptions(){
                this.showcontent = !this.showcontent;
                if(this.showdepartment == true){
                    this.showdepartment = false;
                }
            },
            showdept(){
                this.showdepartment = !this.showdepartment;
            },
            Showmou(){
                this.show = !this.show;
            },
            navigatetodept(dept){
                this.$router.push({ name: 'DeptMou', params: { username: this.name, useremail: this.email, pic: this.pic,role:this.role, dept:dept } })
                .then(() => {
                    window.location.reload(); // Forces a reload
                });
            },
            eventroute(cat){
                this.$router.push({name:"eventpage",params:{ username: this.name, useremail: this.email, pic: this.pic,role:this.role,cat:cat}})
            }
        }
    }
</script>
<style>
.sidebar{
    position: absolute;
    padding: 0px 10px 0px 10px;
    top: 8vh;
    height: 92vh;
    width: 15%;
    border-right: 1px solid rgb(51,65,85);
    text-align: center;
}
.sidebar .catagories li{
    list-style-type: circle;
    cursor: pointer;
    transition: .7s;
}
.sidebar .catagories li:hover{
    color: rgba(14, 164, 233, 0.788);
}
.sidebar .catagories{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    margin-top: 20%;
    padding-left: 5px;
    color: rgb(148,163,184);
    font-size: 1.1rem;
    /* background: red; */
}
.sidebar .catagories .first,
.sidebar .catagories .second,
.sidebar .catagories .third{
    margin-top: 5px;    
}
.sidebar .catagories .first{
    font-size: 1.2rem;

}
.sidebar .catagories .second{
    margin-left: 15px;
    font-weight: 300;
}
.sidebar .catagories .third{
    font-size: 1rem;
    margin-left: 30px;
    font-weight: 300;
}
.sidebar .catagories .four{
    margin-left: 45px;
    font-weight: 300;
}
.sidebar button{
    margin-top: 15%;
    cursor: pointer;
    text-align: center;
    border: none;
    border-radius: 5px;
    font-family: 'Poppins',sans-serif;
    text-transform: uppercase;
    font-weight: 500;
    color: white;
    padding: 5px 10px;
    background: rgb(14,165,233);
    transition: .5s;
}
.sidebar button:hover{
    background: rgba(14, 164, 233, 0.788);
    transform: scaleX(1.1);
}

</style>