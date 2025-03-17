<template>
    <div class="home">
        <div class="dashboard-details">
            <div class="image">
                <img :src="pic" alt="profile">
            </div>
            <div class="details">
                <h2>Welcome Back!</h2>
                <p>{{ name }}</p>
                <p>{{ email }}</p>
            </div>
        </div>
        <div class="total">
            <div class="total-mou">
                <font-awesome-icon class="icon" icon="fa-solid fa-book" />
                <span class="num">{{ parseInt(count.college_mou_count)+parseInt(count.dept_mou_count) }}</span>
                <p>Total Mou</p>
            </div>
            <div class="total-college-mou">
                <font-awesome-icon class="icon" icon="fa-solid fa-building" />
                <span class="num">{{ parseInt(count.college_mou_count) }}</span>
                <p>Total College Mou</p>
            </div>
            <div class="total-dept-mou">
                <font-awesome-icon class="icon" icon="fa-solid fa-graduation-cap" />
                <span class="num">{{ parseInt(count.dept_mou_count) }}</span>
                <p>Total Department Mou</p>
            </div>
            <div class="total-event">
                <font-awesome-icon class="icon" icon="fa-solid fa-calendar-days" />
                <span class="num">{{ count.event_count }}</span>
                <p>Total Events</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    name: 'HomePage',
    data(){
        return{
            count:[]
        }
    },
    props:{
        name:String,
        email:String,
        pic:String
    },
    mounted(){
        this.updateCount();
    },
    methods: {
        updateCount() {
            axios.post("http://localhost:5000/mou/count").then((response) => {
                this.count = response.data;
            });
        }
    }
}
</script>
<style>
.home{
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    top: 8vh;
    left: 16.5%;
    height: 92vh;
    width: 83.5%;
    /* background: red; */
}
.home .total{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 3%;
    width: 100%;
}
.home .total .total-mou,
.home .total .total-college-mou,
.home .total .total-dept-mou,
.home .total .total-event{
    cursor: pointer;
    background: rgb(30,41,59);
    width: 20%;
    padding-top: 20px;
    border-radius: 7px;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    font-weight: 500;
    color: rgb(148,163,184);
    box-shadow: rgba(0, 0, 0, 0.134) 0px 5px 15px;
    transition: .7s;
}
.home .total .total-mou:hover,
.home .total .total-college-mou:hover,
.home .total .total-dept-mou:hover,
.home .total .total-event:hover{
    transform: scale(1.1);
}
.home .total .total-mou p,
.home .total .total-college-mou p,
.home .total .total-dept-mou p,
.home .total .total-event p{
    margin-bottom: 15px;
    margin-top: 8px;
}
.home .total .total-mou span,
.home .total .total-college-mou span,
.home .total .total-dept-mou span,
.home .total .total-event span{
    /* background: red; */
    margin-top: 15px;
    font-size: 1.5rem;
    color: rgb(14,165,233);
}
.home .total .icon{
    font-size: 1.7rem;
}
.home .dashboard-details{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px 20px 10px 20px;
    gap: 20px;
    border-radius: 10px;
    background: rgb(30,41,59);
    color: rgb(148,163,184);
    box-shadow: rgba(0, 0, 0, 0.134) 0px 5px 15px;
    margin-left: 4%;
    margin-top: 3%;
    transition: .7s;
}
.home .dashboard-details:hover{
    transform: scale(1.1);
    color: rgba(14, 164, 233, 0.693);
}
.home .dashboard-details .image{
    display: flex;
    justify-content: center;
    align-items: center;
}
.home .dashboard-details .image img{
    margin: 0;
    border-radius: 50px;
    height: 60px;
}
.home .dashboard-details .details p,
.home .dashboard-details .details h2{
    margin: 0;
    font-weight: 400;
}
.home .dashboard-details .details p{
    font-size: .9rem;
}
</style>