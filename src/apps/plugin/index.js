/*
 * 注册全局组件，过滤器，方法。。。
*/

import ytTable from './table/table'
import ytList from './listTemp/list'

var plugin = {
	ytTable: ytTable,
	ytList: ytList
}

export default {
	install(Vue){
		for(var k in plugin){
			Vue.component(k, plugin[k])
		}
	}
}