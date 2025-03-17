import { createRouter,createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import AdminPage from '../views/AdminPage.vue';
import FacultyPage from '../views/FacultyPage.vue'
import CollegeMou from '@/views/CollegeMou.vue';
import AddUser from '@/views/AddUser.vue';
import DepartmentMou from '@/views/DepartmentMou.vue';
import EventsHome from '@/views/EventsHome.vue';

const router = createRouter({
    history:createWebHistory(),
    routes:[{
        path:'/',
        name:"SignIn",
        component: SignIn
    },{
        path:'/admin/:username/:useremail/:pic/:role',
        name:'admin',
        component:AdminPage,
    },{
        path:'/faculty/:username/:useremail/:pic/:role',
        name:'faculty',
        component:FacultyPage
    },{
        path:"/Collegemou/:username/:useremail/:pic/:dept/:role",
        name:"CollegeMou",
        component:CollegeMou
    },{
        path:"/Deptmou/:username/:useremail/:pic/:dept/:role",
        name:"DeptMou",
        component:DepartmentMou
    },{
        path:"/events/:username/:useremail/:pic/:cat/:role",
        name:"eventpage",
        component:EventsHome
    },{
        path:'/add-user',
        name:'adduser',
        component:AddUser
    }
    
    ]
}) 
export default router;