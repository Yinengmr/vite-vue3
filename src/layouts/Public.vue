<template>
    <div>
        <router-view :key="$route.fullPath" :kk="{a, change}"></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, getCurrentInstance, nextTick } from 'vue'
export default defineComponent({
    components: { },
    beforeCreate () {
        console.log('beforeCreate');
        
    },
    created () {
        console.log('created');
    },
    props: {
        name: String,
    },
    setup (props, { attrs, slots, emit}) {
        const a = ref('aaa')
        function change() {
            a.value = 'bbb'
            console.log('change', attrs, slots);
            
        }
        setTimeout(() => {
            change();
        }, 3000)
        
        return {
            a,
            change
        }
    }
})
</script>

<style module lang="scss">
$gold: gold;
.div {
    width: 100%;
    height: 100px;
    
    // 背景一
    background: radial-gradient(circle at 18% -100%, #FFFFFF 1%, #000000 100%),
        linear-gradient(238deg,rgb(8, 92, 27) 0%, rgb(0, 0, 41) 100%);
    background-blend-mode: color-dodge, normal;
    mix-blend-mode: difference;
    animation: move 10s infinite linear;

    // background: linear-gradient(238deg, rgb(200, 255, 255) 48%, rgb(3, 0, 151) 100%);
    // mix-blend-mode: multiply;
    // animation: move 2s infinite linear;
}
@keyframes move {
    0% {
        filter: unset;
    }
    
    100% {
        filter: hue-rotate(360deg);
    }
}
</style>