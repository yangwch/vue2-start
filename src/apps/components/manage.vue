<template>
	<div class="manage_page fillcontain">
		<header>
			<el-row>
				<el-col :span="4">
					<h1>徐圩管廊管理平台</h1>
				</el-col>
				<el-col :span="20">
					<!-- 主菜单，顶部 -->
					<ul class="nav-list">
						<li :class="{active: item.active}" v-for="(item,index) in mainMenus" @click="onRenderSubmenus(item)">
							<i :class="item.icon || ''"></i>
							{{item.displayName}}
						</li>
					</ul>
				</el-col>
			</el-row>
		</header>
		<el-row style="height: 100%;">
			<el-col :span="4" style="min-height: 100%; background-color: #324157;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<template v-for="(item, index) in subMenus">
						<!-- 有子菜单 -->
						<template v-if="item.children && item.children.length">
							<el-submenu :index="index.toString()">
								<!-- 一级名称 -->
								<template slot="title"><i :class="item.icon || ''"></i>{{item.displayName}}</template>
								<!-- 是否有三级 -->
								<template v-for="(childItem, childIndex) in item.children">
									<!-- 三级 -->
									<template v-if="childItem.children && childItem.children.length">
										<el-submenu :index="index + '-' + childIndex">
											<template slot="title">{{childItem.displayName}}</template>
											<el-menu-item v-for="(l3child,l3index) in childItem.children" :index="l3child.index">{{l3child.displayName}}</el-menu-item>
										</el-submenu>
									</template>
									<template v-if="childItem.children == null || (childItem.children && childItem.children.length == 0)">
										<el-menu-item :index="childItem.index">
										{{childItem.displayName}}
										</el-menu-item>
									</template>
								</template>
								<!--  -->
							</el-submenu>
						</template>
						<!-- 无子菜单 -->
						<template v-if="item.children == null || (item.children && item.children.length == 0)">
							<el-menu-item :index="item.index || index.toString()">
								<i :class="item.icon || ''"></i>{{item.displayName}}
							</el-menu-item>
						</template>
					</template>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<head-top></head-top>
				<keep-alive>
					<transition name="el-zoom-in-center">
					<router-view></router-view>
					</transition>
				</keep-alive>
			</el-col>
		</el-row>
	</div>
</template>

<style lang="less" scoped>
	@import '../../style/mixin';
	@header-height: 92px;
	/*标题栏*/
	header{
		display: block;
		width: 100%;
		height: @header-height;
		background-color: rgb(50, 64, 86);
		border-bottom: 3px solid rgb(33, 161, 255);
		/*系统名称*/
		h1{
			color: #fff;
			line-height: 90px;
			margin-left: 40px;
			font-size: 30px;
		}
		ul.nav-list li{
			height: @header-height;
			min-width: 200px;
			color: #fff;
			cursor: pointer;
			text-align: center;
			display: inline-block;
			&.active{
				background: rgb(30,44,60);
				color: rgb(33, 154, 242);
			}
			i{
				font-size: 30px;
				display: block;
				margin: 15px;
			}
		}
	}
</style>

<script>
	import headTop from './headTop'
	import { getUserMenu } from '@/api/getData'

	export default {
		data(){
			return {
				/*主菜单，顶部*/
				mainMenus: [],
				/*子菜单，左侧*/
				subMenus: []

			};
		},
		components:{
			headTop
		},
		computed: {
			defaultActive: function(){
				return  this.$route.path.replace('/', '');
			}
		},
		created(){
			this.getMenus();
		},
		methods: {
			/*加载菜单 */
			async getMenus(){
				const res = await getUserMenu()
				var menus = res && res.result;
				if(menus && menus.length){
					this.mainMenus = menus;
					this.onRenderSubmenus(menus[0]);
				}
			},
			/*点击顶部菜单事件*/
			onRenderSubmenus(menus){
				var mainMenus = this.mainMenus;
				/*设置是否为当前菜单 */
				for(var i in mainMenus){
					if(mainMenus[i].id == menus.id){
						mainMenus[i].active = true;
					}else{
						mainMenus[i].active = false;
					}
				}
				this.subMenus = menus && menus.children;
			}
		}
	}
</script>

