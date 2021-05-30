// 在这里全局注册插件
import { ObjectDirective } from 'vue'
// import { AppModule } from '@/store/modules/app'
// import lodash from 'lodash'
// import Base64 from './base64'
import '@/utils/permission'
import '@/utils/rem'
import '@/static/fonts/iconfont.css'

// import * as directives from '@/directives'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// import i18n from '@/lang'

export default {
	install(app: any) {
		// 全局方法

		app.use(ElementPlus)
		// provide 注册全局变量 使用inject()取出变量
		app.provide('name','Danny')
		app.provide('app', app)

		// console.log('app', app);
		
		// prototype => config.globalProperties
		// app.config.globalProperties.$lodash = lodash // 赋值使用
		// app.config.globalProperties.$Base64 = Base64

		// app.use(i18n)

		// app.use(ElementPlus, {
		// 	size: AppModule.size, // Set element-plus default size
		// 	i18n: (key: string, value: string) => i18n.global.t(key, value)
		// })

		// 注册指令
		// Object.keys(directives).forEach(key => {
		// 	app.directive(key, (directives as { [key: string]: ObjectDirective })[key])
		// })

		// 全局组件
		// app.component('svg-icon', SvgIcon)
		// app.component('main-body', MainBody)
	}
}
