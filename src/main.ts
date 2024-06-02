import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import { useUserInfo } from "./stores/user";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
await useUserInfo()
  .loadUser()
  .then(() => {
    app.mount("#app");
  });
