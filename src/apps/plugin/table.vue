<template>
	<div>
	<el-table
		ref="table"
		:fit="fit"
		:stripe="stripe"
		:data="tableData"
		highlight-current-row
		empty-text="暂无数据"
		@selection-change="onSelectionChange"
		@current-change="onCurrentChange">
		<slot name="columns"></slot>
	</el-table>
	<div v-if="pagination" class="Pagination" style="text-align: left;margin-top: 10px;">
		<el-pagination v-if="reload"
		  @size-change="handleSizeChange"
		  @current-change="handleCurrentChange"
		  :current-page="currentPage"
		  :page-sizes="pageSizes"
		  :page-size="limit"
		  layout="total, -> ,sizes, -> , prev, pager, next"
		  :total="count">
		</el-pagination>
	</div>
	</div>
</template>

<script>
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
			/*查询Api,方法*/
			searchApi: {
				type: Function,
				required: true
			},
			/*查询参数*/
			params: {
				type: Object,
				default(){
					return {};
				},
				required: false
			}
		},
		/*数据*/
		data(){
			return {
				reload: true,
				tableData: [],
				currentRow: null,
				offset: 0,
				limit: 15,
				count: 0,
				currentPage: 1,

				selection: []
			}
		},
		components: {
		},
		created(){
			this.initData();
		},
		methods: {
			async initData(){
				try{
					this.getData();
				}catch(err){
					this.$message.error('获取数据失败');
				}
			},
			/*页码数量变化*/
			handleSizeChange(val) {
				this.limit = val;
				//this.getData();
			},
			/*当前页变化事件*/
			handleCurrentChange(val) {
				this.currentPage = val;
				this.offset = (val - 1)*this.limit;
				this.getData();
			},
			/*行选中事件*/
			onCurrentChange(selection){
				this.selection = selection;
			},
			/*当选择项变化时触发*/
			onSelectionChange(selection){
				this.selection = selection;
			},
			/*获取选中*/
			getSelection(){
				return this.selection;
			},
			/*获取数据*/
			async getData(){
				var params = this.params;
				params.page = this.currentPage,
				params.rows = this.limit;
				this.reload = false;
				const result = await this.searchApi(params);
				this.tableData = (result && result.result && result.result.rows) || [];
				this.count = (result && result.result && result.result.total) || 0;
				this.reload = true;
			},
			/*查询*/
			search(params){
				/*参数*/
				for(var i in params){
					this.params[i] = params[i];
				}
				this.getData();
			},
			/*取消选中*/
			clearSelection(){
				this.$refs.table.clearSelection();
			}
		},
	}
</script>