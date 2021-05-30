import { createApp } from "vue";
import { router } from "@/router";
import App from "./App.vue";

// 注册全局插件/组件
import overall from "@/utils/overall";

const app = createApp(App);
app.use(router);

app.use(overall);
app.mount("#app");
