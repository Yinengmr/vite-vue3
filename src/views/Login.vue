<template>
    <div :class="$style.container">
        <!-- <div :class="$style.bg"></div>
        <div :class="$style.bg"></div>
        <div :class="$style.bg"></div>
        <div :class="$style.bg"></div>
        <div :class="$style.bg"></div>
        <div :class="$style.bg"></div> -->
        <!-- 主体内容 -->
        <div :class="$style.main">
            <el-form ref="formRef" :model="loginForm" :rules="loginRules" label-width="160px"
                label-position="right"
                autocomplete="on">
                <div :class="$style.item">
                    <span>登录</span>
                </div>
                <el-form-item prop="username" label="登录名" :class="$style.item">
                    <el-input
                        size="small"
                        style="width: 200px"
                        ref="usernameRef"
                        v-model.trim="loginForm.username"
                        name="username"
                        type="text"
                        tabindex="1"
                        autocomplete="on"
                        clearable
                    />
                </el-form-item>
                <el-form-item prop="password" label="密码" :class="$style.item">
                    <el-input
                        size="small"
                        style="width: 200px"
                        ref="passwordRef"
                        v-model.trim="loginForm.password"
                        name="password"
						tabindex="2"
                        clearable
						autocomplete="on"
                        show-password
						@keyup.enter.native="handleLogin" />
                </el-form-item>
                <div :class="$style.item">
                    <el-button size="small" type="text" style="width: 80px"> 注册 </el-button>
                    <span :class="$style['login-bnt']">
                        <el-button size="small" type="primary" 
                        :disabled="loading"
                        @click="handleLogin" style="width: 80px"> 登录 </el-button>
                    </span>
                </div>
                
            </el-form>
            <!-- loading状态 -->
            <div v-if="loading" class="g-container">
                <div class="g-first"></div>
                <div class="g-ball"></div>
                <div class="g-ball"></div>
                <div class="g-ball"></div>
                <div class="g-ball"></div>
                <div class="g-ball"></div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { ElMessage as Message } from 'element-plus'
import { useRouter } from 'vue-router'
import { Dictionary } from 'vue-router/types/router'
import { defineComponent, onMounted, ref, reactive, watch, getCurrentInstance, nextTick } from 'vue'
import { UserModule } from '@/store/modules/user'
export default defineComponent({
  components: { },
  props: {
      kk: Object
  },
  setup (props, { attrs, slots, emit}) {
    console.log('props', {...props});
    console.log('attrs', {...attrs});
    let router = useRouter()
    let { ctx } = getCurrentInstance()
    let redirect = ''
    let otherQuery: Dictionary<string> = {}

    let formRef = ref(null);
    let loginForm = reactive({
        loginType: 'username',
        username: '',
        password: ''
    })
    let loading = ref(false)
    let loginRules = {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    }
    async function handleLogin() {
        
        formRef.value.validate(async (valid: boolean) => {
            if (valid) {
                loading.value = true
                await UserModule.Login(loginForm).then((res) => {
                    if (res.rv == 200) {
                        Message({
                            message: res.msg || 'success',
                            type: 'success',
                            duration: 1200
                        })
                        setTimeout(() => {
                            router.push({
                                path: redirect || '/home',
                                query: otherQuery
                            })
                        }, 1800)
                    }
                }).finally(() => {
                    // loding状态
                    setTimeout(() => {
                        loading.value = false
                    }, 1800)
                });                

            }
        })
        
    }
    function getOtherQuery(query: Dictionary<string>) {
        return Object.keys(query).reduce(
            (acc, cur) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur]
                }
                return acc
            },
            {} as Dictionary<string>
        )
    }
    // watch(
    //     () => ctx.$router.currentRoute.value,
    //     route => {
    //         const query = route.query as Dictionary<string>
    //         if (query) {
    //             redirect = query.redirect
    //             otherQuery = getOtherQuery(query)
    //         }
    //     },
    //     { immediate: true }
    // )
    return {
        formRef,
        loginForm,
        loginRules,
        handleLogin,
        loading,
    }
  }
})
</script>
<style module lang="scss">
.container {
    width: 100%;
    min-width: 600px;
    height: 100vh;
    // 背景一
    background: radial-gradient(circle at 30% 24%, #FFFFFF 1%, #000000 100%),
        linear-gradient(238deg,rgb(8, 92, 27) 0%, rgb(0, 0, 41) 100%);
    background-blend-mode: color-dodge, normal;
    mix-blend-mode: difference;
    animation: move 10s infinite linear;
}
.main {
    margin: 0 auto;
    position: relative; /*脱离文档流*/
    top: 50%; /*偏移*/
    transform: translateY(-50%);
    max-width: 500px;
    background:#fcfcfc5d;
    border-radius: 8px;
    .item {
        &:first-child {
            text-align: center;
            padding: 36px 0 16px 0;
            font-size: 22px;
            color: #00000073
        }
        &:last-child {
            padding-bottom: 30px;
            text-align: center;
        }
    }
}

.bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100vh;
}

.bg:nth-child(1) {
    background: linear-gradient(
        238deg,
        rgb(130, 255, 0) 0%,
        rgb(0, 84, 166) 100%
    );
    animation: move 14s infinite linear;
}

.bg:nth-child(2) {
    background: linear-gradient(238deg, rgb(33, 200, 69) 0%, rgb(0, 0, 100) 100%);
    mix-blend-mode: overlay;
    animation: move 8s infinite linear;
}

.bg:nth-child(3) {
    background: linear-gradient(238deg, rgb(200, 255, 255) 48%, rgb(3, 0, 151) 100%);
    mix-blend-mode: multiply;
    animation: move 8s infinite linear;
}

.bg:nth-child(4) {
    background: radial-gradient(
        100% 85% at 0% 100%,
        rgb(0, 0, 0) 0%,
        rgb(0, 131, 255) 50%,
        rgb(255, 0, 0) 100%
    );
    mix-blend-mode: difference;
    animation: move 8s infinite linear;
}

.bg:nth-child(5) {
    background: radial-gradient(
        100% 225% at 0% 100%,
        rgb(255, 0, 0) 0%,
        rgb(66, 255, 0) 100%
    );
    mix-blend-mode: difference;
    animation: move 8s infinite linear;
}

// .bg:nth-child(6) {
//     background: radial-gradient(
//         100% 140% at 100% 0%,
//         rgb(0, 134, 62) 0%,
//         rgb(0, 239, 255) 50%,
//         rgb(0, 113, 186) 100%
//     );
//     mix-blend-mode: overlay;
//     animation: move 8s infinite linear;
// }

@keyframes move {
    0% {
        filter: unset;
    }
    
    100% {
        filter: hue-rotate(360deg);
    }
}
</style>
<style lang="scss">
.g-container {
    margin: 0 auto;
    width: 10px;
    transform: translateX(-50%);
    height: 20px;
    position: absolute;
    bottom: 0px;
    left: 50%;
    /* 
    filter: blur()： 给图像设置高斯模糊效果。
    filter: contrast()： 调整图像的对比度。
    */
    filter: blur(1px) contrast(1);
}
.g-ball,
.g-first{
    position: absolute;
    max-width: 10px;
    max-height: 10px;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.801);
    border-radius: 50%;
    transform: translate(-700%, 0);
    opacity: 0;
}
.g-first {
    // background: linear-gradient(
    //     238deg,
    //     rgb(0, 247, 255) 0%,
    //     rgb(247, 67, 127) 100%
    // );
    background: rgba(255, 255, 100);
    animation: scaleMove 2.5s infinite linear;
}


$count: 5;
@for $i from 0 through $count { 
    .g-ball:nth-child(#{$i}) {
        background: rgb(255, 255, 255);
        animation: move 2.5s infinite #{$i * 0.2 - 0.3}s linear;
    }
}
@keyframes move {
    25% {
        opacity: 1;
        // background: rgb(14, 78, 216);
        transform: translate(-1vw, 0);
    }
    50% {
        opacity: 1;
        transform: translate(1vw, 0);
    }
    75%,
    100% {
        opacity: 0;
        // background: #fff;
        transform: translate(700%, 0);
    }
}


@keyframes scaleMove {
    25% {
        opacity: 1;
        transform: translate(-10px, 0);
    }
    35% {
        opacity: 1;
        transform: scale(1);
    }
    70% {
        opacity: 1;
        transform: translate(10px, 0) scale(2);
    }
    90%,
    100% {
        opacity: 0;
        transform: translate(10px, 0) scale(1);
    }
}

</style>
