<!-- 
	列表页面模板插件 2017-06-28
	@author yangwenchao
 -->
<template>
	<el-card class="box-card table_container">
		<div slot="header" class="clearfix" v-text="title">
		</div>
		<el-row>
			<el-col :span="8">
				<slot name="buttons">&nbsp;</slot>
			</el-col>
			<el-col :span="16">
				<el-form :inline="true" :model="formData" class="form-inline right">
				  <el-form-item label="">
					<el-input v-model="formData.search" :placeholder="searchLabel"></el-input>
				  </el-form-item>
				  <el-form-item>
					<el-button type="primary" @click="onSearch">查询</el-button>
				  </el-form-item>
				</el-form>
			</el-col>
		</el-row>

		<table-plugin ref="tablePl"
			:fit="fit"
			:stripe="stripe"
			:pagination="pagination"
			:page-sizes="pageSizes"
			:search-api="searchApi">
            <template slot="columns">
                <slot name="columns">
                </slot>
            </template>
        </table-plugin>
	</el-card>
</template>

<style lang="less">
.table_container{
	margin: 10px;
}
</style>
<script>
	import tablePlugin from './../table/table'
	export default {
		props: {
			/*列宽是否自撑开*/
			fit: {
				type: Boolean,
				default: true,
				required: false
			},
			/*是否显示斑马纹*/
			stripe: {
				type: Boolean,
				default: true,
				required: false
			},
			/*查询字段名*/
			searchField: {
				type: String,
				default: 'name',
				required: false
			},
			/*查询字段显示名*/
			searchLabel: {
				type: String,
				default: '关键字'
			},
			/*是否分页，默认分页*/
			pagination: {
				type: Boolean,
				default: true,
				required: false
			},
			/*分页数量选项*/
			pageSizes: {
				type: Array,
				default: function(){
					return[5, 10, 15, 50, 100];
				},
				required: false
			},
			/*页面标题*/
			title: {
				type: String,
				default: '列表',
				required: false
			},
			/*查询Api,方法*/
			searchApi: {
				type: Function,
				required: true
			}
		},
		/*数据*/
		data(){
			return {
				formData: {
					search: ''
				}
			}
		},
		computed: {
			params: function(){
				var params = {};
				params[this.searchField] = this.formData.search;
				return params;
			}
		},
		components: {
			tablePlugin
		},
		created(){

		},
		methods: {
			/*获取选中*/
			getSelection(){
				return this.$refs.tablePl.getSelection();
			},
			/*查询*/
			onSearch(){

				this.$refs.tablePl.search(this.params);
			},
			/*取消选中*/
			clearSelection(){
				this.$refs.tablePl.clearSelection();
			}
		},
	}
</script>

