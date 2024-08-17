import { createApp } from "vue";
import "./assets/css/custom.css";
import "./assets/css/tailwindstyle.css";
import App from "./App.vue";
import route from "./router";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();
app.use(route);
app.use(pinia);
app.use(createVuestic());
app.mount("#app");
