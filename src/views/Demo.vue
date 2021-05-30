<template>
    <div style="text-align: center; font-size: 30px; padding-top: 100px">
        <div>{{ state.a }}</div>
        <div>{{ state.child.b }}</div>
        <div>{{ state.child.child.c }}</div>
        <div>{{ state.child.child.child.d }}</div>

        <el-button type="primary" size="small" @click="change"
            >change</el-button
        >
        <el-button type="primary" size="small" @click="change2"
            >change2</el-button
        >
        <el-button type="primary" size="small" @click="log">log</el-button>
    </div>
</template>

<script lang="ts">
// import { defineComponent, ref, reactive } from 'vue'
import { defineComponent, shallowRef, shallowReactive } from "vue";

export default defineComponent({
    setup(props, context) {
        const state = shallowReactive({
            a: "a",
            child: {
                b: "b",
                child: {
                    c: "c",
                    child: {
                        d: "d",
                    },
                },
            },
        });
        function change() {
            // state.value.child.b = '2'
            // state.value.child.child.c = '3'
            // state.value.child.child.child.d = '4'
            state.child.b = "2";
            state.child.child.c = "3";
            state.child.child.child.d = "4";
        }
        function change2() {
            // state.value.a = '1'
            state.a = "1";
        }
        function log() {
            // console.log(state.value)
            // console.log(state.value.child)
            // console.log(state.value.child.child)
            // console.log(state.value.child.child.child)
            console.log(state);
            console.log(state.child);
            console.log(state.child.child);
            console.log(state.child.child.child);
        }
        return {
            state,
            change,
            change2,
            log,
        };
    },
});
</script>
