<template>
    <HeaderComp :name="name" :email="email" :pic="pic" :role="role"/>
    <Sidebar :name="name" :email="email" :pic="pic" :role="role"/>
    <DisplayMou :name="name" :email="email" :pic="pic" :dept="dept" :role="role"/>
</template>
<script>
import HeaderComp from './HeaderComp.vue';
import Sidebar from './Sidebar.vue';
import DisplayMou from './DisplayMou.vue';
export default{
    name: 'CollegeMou',
    components:{
        HeaderComp,
        Sidebar,
        DisplayMou
    },data(){
        return{
            name:this.$route.params.username,
            email:this.$route.params.useremail,
            pic:this.$route.params.pic,
            dept:this.$route.params.dept,
            role:this.$route.params.role
        }
    }
}
</script>
<style>

</style>