import { createApp } from 'vue'
import App from './App.vue'

import router from './router/router'
import vue3GoogleLogin from 'vue3-google-login'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'


library.add(faPenToSquare,faTrashCan,faPlus,faArrowLeft,faFile,faBook,faGraduationCap,faBuilding,faCalendarDays)
const app = createApp(App);
app.use(vue3GoogleLogin, {
    clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID

})

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

