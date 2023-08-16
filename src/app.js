import { createApp } from 'vue'
import './assets/css/custom.css'
import './assets/css/tailwindstyle.css'
import App from './App.vue'
import route from './router'

createApp(App).use(route).mount('#app')
