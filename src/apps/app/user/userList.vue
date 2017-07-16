<template>
	<el-card class="box-card table_container">
		<div slot="header" class="clearfix">
			用户列表
		</div>
		<el-row>
			<el-col :span="8">
				<el-button type="default">创建</el-button>
				<el-button type="danger">删除</el-button>
			</el-col>
			<el-col :span="16">
				<el-form :inline="true" :model="formData" class="form-inline right">
					<el-form-item label="">
						<el-input v-model="formData.search" placeholder="输入关键字"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSearch">查询</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<!-- 引用table组件示例 -->
		<table-plugin :search-api="searchApi" ref="tablePlugin">
			<template slot="columns">
				<!-- 多选列，需要多选时添加这列 -->
				<el-table-column
				  type="selection"
				  width="55">
				</el-table-column>
				<el-table-column
				  type="index"
				  width="100">
				</el-table-column>
				<el-table-column
				  property="department"
				  label="部门">
				</el-table-column>
				<el-table-column
				  property="enterpriseUser"
				  label="用户姓名">
				</el-table-column>
				<el-table-column
				  property="lastLoginTime"
				  label="最后登录时间">
				</el-table-column>
			</template>
		</table-plugin>
	</el-card>
</template>

<script>
	import { getUserCount, getLoginList } from '@/api/getData'
	import tablePlugin from './../../plugin/table/table'
	export default {
		data(){
			return {
				formData: {
					search: ''
				},
				tableData: [],
				currentRow: null,
				offset: 0,
				limit: 20,
				count: 0,
				currentPage: 1,
				searchApi: getLoginList
			}
		},
		components: {
			tablePlugin
		},
		created(){
			this.initData();
		},
		methods: {
			async initData(){
			},
			
			onSubmit: function(){
				
			},
			onSearch: function function_name(argument) {
				// body...
			}
		},
	}
</script>

<style lang="less">
.table_container{
	margin: 10px;
}
</style>
