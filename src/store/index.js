import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
	_pageData: {
	}
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	},
	/*页面参数*/
	savePageData(state, _pageData){
		state._pageData = _pageData;
	}
}

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			if (res.success) {
				commit('saveAdminInfo', res.result);
			}else{
				throw new Error(res)
			}
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	},
	sendPageData({commit}, _pageData){
		commit('savePageData', _pageData);
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})