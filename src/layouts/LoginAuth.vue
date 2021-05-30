<template>
    <div>
        <el-container>
            <el-header style="height: 100px; padding: 0">
                <div class="container-top">
                    <div style="height: 100%; max-width: 960px; margin: 0 auto;">
                        <div style="float: right;">

                            <el-button @click="handleLogout" type="text">登出</el-button>
                        </div>
                    </div>
                </div>
            </el-header>
            <el-main class="container">
                <router-view :key="$route.fullPath"></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch, getCurrentInstance, nextTick } from 'vue'
import { UserModule } from '@/store/modules/user'
export default defineComponent({
    components: { },
    created () {

    },
    setup () {
        function handleLogout() {
            UserModule.LogOut()
            location.reload()
        }
        return {
            handleLogout
        }
    }
})
</script>
// $module.class
<style module lang="scss">

</style>
<style lang="scss" scoped>
.container-top {
    position: fixed;
    width: 100%;
    height: 100px;
    z-index: 99;
    // 背景一
    // background: radial-gradient(circle at 18% -100%, #FFFFFF 1%, #000000 100%),
    // linear-gradient(238deg,rgb(8, 92, 27) 0%, rgb(0, 0, 41) 100%);
    // background-blend-mode: color-dodge, normal;
    // mix-blend-mode: multiply;
    // animation: move 10s infinite linear;
    // 背景二
    background: linear-gradient(30deg, #ffcc00, deeppink, #9c27b0);
    animation: hueRotate 10s infinite alternate;
}
.container {
    width: 100%;
    min-width: 500px;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 10px;
}
@keyframes move {
    0% {
        filter: unset;
    }
    
    100% {
        filter: hue-rotate(360deg);
    }
}
@keyframes hueRotate {
    100% {
        filter: hue-rotate(360deg);
    }
}
</style>