import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import axios from 'axios'

const app = createApp(App)

app.config.globalProperties.$http = axios
const token = localStorage.getItem('token')
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

app.config.productionTip = false

app.use(store).use(router).mount('#app')