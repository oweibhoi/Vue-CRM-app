import { createApp } from 'vue'
import './assets/css/custom.css'
import './assets/css/tailwindstyle.css'
import App from './App.vue'
import route from './router'
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

const app = createApp(App)
app.use(route)
app.use(createVuestic())
app.mount('#app')
