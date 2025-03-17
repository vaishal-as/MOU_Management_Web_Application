<template>
        <div class="app">
        <div class="head">
            <h1>BIT MOU PORTAL</h1>
            <div class="profile">
                <div class="front" @click="toogleLogout">
                    <p class="name">{{ name }}</p>
                <img :src="pic" alt="profile"> 
                </div>
                <div class="logout" v-show="showlogout">
                    <button @click="$router.push({name:'SignIn'})">Logout</button>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>

export default{
    name:'HeaderComp',
    props:{
        name:String,
        email:String,
        pic:String
    },
    data(){
        return{
            showlogout:false
        }
    },
    methods:{
        toogleLogout() {
            this.showlogout = !this.showlogout;
        },
    }
}
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.app{
    position: absolute;
    height: 100%;
    width: 100%;
}
/*Head Section*/
.head{
    font-family: 'Poppins',sans-serif;
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between  ;
    height: 8%;
    border-bottom: 1px solid rgb(51,65,85);
    width: 100%;
    color: rgb(148,163,184);
    background: rgb(30,41,59);
}
.head img{
    position: relative;right: 2%;
    padding: 0 10px;
    height: 60%;
    border-radius: 50%;
}
.head h1{
    position: relative;
    font-weight: 500;
    font-size: 1.2rem;
    left: 2%;
}
/*Sidebar*/

/*profile*/
.profile{
    height: 100%;
}
.profile .front{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    cursor: pointer;
}
.name{
    font-size: 1.2rem;
}
.profile .logout{
    display: flex;
    z-index: 2;
    flex-direction: column;
    align-items: flex-end;
    background: rgb(15,23,42);
    padding: 10px;
    position: absolute;
    top: 110%;right: 1%;
    border-radius: 15px;
    border: 1px solid rgb(51,65,85);
}
.logout p{
    font-size: .9rem;
    margin-top: 0;
}
.logout button{
    font-family: 'Poppins',sans-serif;
    height: 30%;
    font-size: .9rem;
    outline: none;
    border: none;
    cursor: pointer;
    background: transparent;
    color: rgb(148,163,184);
    transition: .7s;
}
.logout button:hover{
    color: white;
}
@media screen and (max-width: 360px){
    .app{
        width: 100%;
    }
    .head{
        font-size: .7rem;
        width: 100%;
    }
    .head h1{
        font-size: 1rem;
    }
} 
</style>
