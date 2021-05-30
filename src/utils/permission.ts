import router from '@/router'
import NProgress from 'nprogress'
import { UserModule } from '@/store/modules/user'
// import { PermissionModule } from '@/store/modules/permission'
import 'nprogress/nprogress.css'
// import i18n from '@/lang'
// import settings from '@/settings'
import { ElMessage as Message } from 'element-plus'

NProgress.configure({ showSpinner: false })

// 白名单
const whiteList = [
	'/login', '/demo'
]

// const getPageTitle = (key: string) => {
// 	if (key) {
// 		const pageName = i18n.global.t(`route.${key}`)
// 		return `${pageName} - ${settings.title}`
// 	}

// 	return `${settings.title}`
// }

router.beforeEach(async (to, from, next) => {
	NProgress.start()

	// console.log(router, to.path, UserModule);
	
	// 确定用户是否已登录
	if (UserModule.token) {
		if (to.path === '/login') {
			// 如果已登录，则重定向到主页
			next('/home')
		}
		NProgress.done()
		next()
	} else {
		// 没有token、
		if (whiteList.includes(to.path)) {
			// 在免费登录白名单中，直接进入
			next()
		} else {
			// 其他没有访问权限的页面将被重定向到登录页面。
			next('/login')
		}
		NProgress.done()
	}
})

router.afterEach((to: any) => {
	NProgress.done()

	// set page title
	// document.title = getPageTitle(to.meta.title)
	document.title = to.meta.title || 'vite-project'
})
