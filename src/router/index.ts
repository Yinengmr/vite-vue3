import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      redirect: { name: 'Demo' }
    },
    {
      path: '/home',
      name: 'HOME',
      meta: {
        layout: 'layout-login-auth',
        title: '首页',
      },
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        layout: 'layout-public',
        title: '登录',
      },
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/articel/:article_id',
      name: 'Articel',
      meta: {
        layout: 'layout-login-auth',
        title: '文章详情',
      },
      component: () => import('@/views/Articel.vue')
    },
    {
      path: '/demo',
      name: 'Demo',
      meta: {
        layout: 'layout-public',
        title: 'Demo',
      },
      component: () => import('@/views/Demo.vue')
    },
    { 
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('@/views/Demo.vue')
    },
  ],
  strict: true,   // 严格模式
  // 记住滚动条位置
  scrollBehavior: (to, from, savedPosition) => {
    console.log('滚动条', savedPosition);
    
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return { x: 0, y: 0 }
    // }
    // keep-alive 返回缓存页面后记录浏览位置
//     if (savedPosition && to.meta.keepAlive) {
//      return savedPosition;
//     }
    // 异步滚动操作
    return new Promise((resolve) => {
     setTimeout(() => {
      resolve({ left: 0, top: 10 });
     }, 0);
    });
  }
})
export default router