<template>
<el-card class="box-card table_container">
		<el-row :gutter="10">
			<el-col :span="12" :offset="2">
				<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="form-dynamic">
					<el-form-item
						prop="email"
						label="邮箱"
						:rules="[
							{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
							{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
						]"
					>
							<el-input v-model="dynamicValidateForm.email"></el-input>
					</el-form-item>
					<el-form-item
						v-for="(domain, index) in dynamicValidateForm.domains"
						:label="'域名' + index"
						:key="domain.key"
						:prop="'domains.' + index + '.value'"
						:rules="{
							required: true, message: '域名不能为空', trigger: 'blur'
						}"
					>
							<el-input v-model="domain.value">
									<el-button @click.prevent="removeDomain(domain)" type="primary" slot="append">删除</el-button>
							</el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
						<el-button @click="addDomain">新增域名</el-button>
						<el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
						<el-button @click="cancel">取消</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
</el-card>
</template>
<script>
	export default {
		data() {
			return {
				dynamicValidateForm: {
					domains: [{
						value: ''
					}],
					email: ''
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			removeDomain(item) {
				var index = this.dynamicValidateForm.domains.indexOf(item)
				if (index !== -1) {
					this.dynamicValidateForm.domains.splice(index, 1)
				}
			},
			/*添加行*/
			addDomain() {
				/*从store中读取临时参数*/
				console.log(this.$store.state._pageData);
				
				this.dynamicValidateForm.domains.push({
					value: '',
					key: Date.now()
				});
			},
			/*取消*/
			cancel(){
				this.$router.back();
			}
		}
	}
</script>