<template>
    <div id="app">
        <component
            :is="$route.meta.layout || 'layout-permission'"
            :name="name"
        ></component>

        <!-- <router-view /> -->
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    toRefs,
    computed,
    watch,
    getCurrentInstance,
    nextTick,
    provide,
    inject,
} from "vue";
import layoutPublic from "@/layouts/Public.vue";
import LoginAuth from "@/layouts/LoginAuth.vue";
export default defineComponent({
    components: {
        "layout-public": layoutPublic,
        "layout-login-auth": LoginAuth,
    },
    setup(props, context) {
        const dark = ref("dark");
        provide("them", dark);
        setTimeout(() => {
            dark.value = "hahahah";
        }, 1000);
    },
});
</script>
<style module lang="scss">
body,
#app {
    padding: 0;
    margin: 0;
}
</style>
