import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/apps/login/index')), 'login');
const home = r => require.ensure([], () => r(require('@/apps/app/home/index')), 'home');
const manage = r => require.ensure([], () => r(require('@/apps/components/manage')), 'manage');
const userList = r => require.ensure([], () => r(require('@/apps/app/user/userList')), 'userList');
const loginList = r => require.ensure([], () => r(require('@/apps/app/user/loginlist')), 'loginList');
const addDomain = r => require.ensure([], () => r(require('@/apps/app/user/addDomain')), 'addDomain');
/*const addShop = r => require.ensure([], () => r(require('@/apps/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/apps/addGoods')), 'addGoods');
c*/

const routes = [
	{
		path: '/',
		component: login,
		children: [{
			path: '/login',
			component: login
		}]
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: []
		},{
			path: '/userList',
			component: userList,
			meta: ['数据管理', '用户列表'],
			children: [
			]
		},{
			path: '/userList/addDomain',
			component: addDomain,
			meta: ['数据管理', { path:'/loginList', name: '用户登录记录' },'添加用户']
		},{
			path: '/loginList',
			component: loginList,
			meta: ['数据管理', '用户登录记录']
		}
		/*,{
			path: '/addShop',
			component: addShop,
			meta: ['添加数据', '添加商铺'],
		},{
			path: '/addGoods',
			component: addGoods,
			meta: ['添加数据', '添加商品'],
		}*/]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
