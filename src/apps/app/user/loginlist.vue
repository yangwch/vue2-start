<template>
    <div>
        <!-- 表格组件 -->
        <list :title="title" :search-field="searchField" :search-label="searchLabel" :search-api="searchApi" ref="list">
            <template slot="buttons">
                <!-- <a href="#/userList/addDomain" class="el-button">创建</a> -->
                <el-button type="default" @click="onCreate">创建</el-button>
                <el-button type="default" @click="onEdit">修改</el-button>
                <el-button type="danger" @click="onDel">删除</el-button>
            </template>
            <template slot="columns">
                <!-- 多选列，需要多选时添加这列
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column> -->
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
        </list>
        <el-dialog
          :title="dialogTitle"
          :visible.sync="dialogVisible"
          size="tiny">
          <edit-page ref="editPage"></edit-page>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSave">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import list from './../../plugin/listTemp/list'
    import editPage from './edit'
    import { getLoginList } from '@/api/getData'

    export default {
        data(){
            return {
                searchField: 'username',
                searchLabel: '输入用户名',
                title: '用户登录记录',
                searchApi: getLoginList,

                dialogVisible: false,
                dialogTitle: '修改'
            }
        },
    	components: {
            list,
            editPage
    	},
        created(){
            /*this.initData();*/
        },
        methods: {
            /*创建*/
            onCreate(){
                /*通过store存储临时变量*/
                this.$store.commit('savePageData', {a:1,b:2});
                /*跳转到 创建页面 路由*/
                this.$router.push('/userList/addDomain');
            },
            /*修改*/
            onEdit(){
                var list = this.$refs.list;
                console.log(list);
                this.dialogVisible = true;
                /*输出当前用户信息*/
                console.log(this.adminInfo);
            },
            /*删除*/
            onDel(){
                /*获取选中*/
                var sels = this.$refs.list.getSelection();
                console.log(sels);
            },
            handleClose(){

            },
            /*保存*/
            onSave(){
                this.$refs.editPage.submitForm();
            }
        }
    }
</script>

<style lang="less">
.table_container{
	margin: 10px;
}
</style>
