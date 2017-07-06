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
        <el-table
            :data="tableData"
            highlight-current-row
            @current-change="toggleRowSelection">
            <el-table-column
              type="index"
              width="100">
            </el-table-column>
            <el-table-column
              property="registe_time"
              label="注册日期"
              width="220">
            </el-table-column>
            <el-table-column
              property="username"
              label="用户姓名"
              width="220">
            </el-table-column>
            <el-table-column
              property="city"
              label="注册地址">
            </el-table-column>
        </el-table>
        <div class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
  			  :page-sizes="[10, 20, 50, 100]"
              :page-size="20"
              layout="total, -> ,sizes, -> , prev, pager, next"
              :total="count">
            </el-pagination>
        </div>
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
    import {getUserList, getUserCount,getLoginList} from '@/api/getData'
    import tablePlugin from './../../plugin/table'
    export default {
        data(){
            return {
            	formData: {
            		search: ''
            	},
                tableData: [{
                  registe_time: '2016-05-02',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1518 弄'
                }, {
                  registe_time: '2016-05-04',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1517 弄'
                }, {
                  registe_time: '2016-05-01',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1519 弄'
                }, {
                  registe_time: '2016-05-03',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1516 弄'
                }],
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
                try{
                    const countData = await getUserCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getUsers();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },
            /*行选中事件*/
            toggleRowSelection(selection){
            	console.log(selection);
            	this.$message({
            		message: '选中' +selection.username
            	})
            },
            async getUsers(){
                const Users = await getUserList({offset: this.offset, limit: this.limit});
                this.tableData = [];
                Users.forEach(item => {
                    const tableData = {};
                    tableData.username = item.username;
                    tableData.registe_time = item.registe_time;
                    tableData.city = item.city;
                    this.tableData.push(tableData);
                })
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
