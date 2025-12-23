<template>
  <el-card shadow="never">
    <template #header>新建订单</template>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" style="max-width: 600px">
      <el-form-item label="客户名称" prop="customer">
        <el-select v-model="form.customer" placeholder="请选择客户" filterable style="width: 100%">
          <el-option label="某建筑公司" value="1" />
          <el-option label="某混凝土公司" value="2" />
          <el-option label="某工程公司" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="收货地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入收货地址" />
      </el-form-item>
      <el-form-item label="水泥品种" prop="product">
        <el-select v-model="form.product" placeholder="请选择品种" style="width: 100%">
          <el-option label="P.O42.5" value="P.O42.5" />
          <el-option label="P.O52.5" value="P.O52.5" />
          <el-option label="P.C32.5" value="P.C32.5" />
        </el-select>
      </el-form-item>
      <el-form-item label="订单吨数" prop="weight">
        <el-input-number v-model="form.weight" :min="1" :max="50" />
        <span style="margin-left: 8px">吨</span>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()

const form = reactive({
  customer: '',
  address: '',
  product: '',
  weight: 30,
  remark: ''
})

const rules: FormRules = {
  customer: [{ required: true, message: '请选择客户', trigger: 'change' }],
  address: [{ required: true, message: '请输入收货地址', trigger: 'blur' }],
  product: [{ required: true, message: '请选择水泥品种', trigger: 'change' }],
  weight: [{ required: true, message: '请输入吨数', trigger: 'blur' }]
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  ElMessage.success('订单创建成功')
  router.push('/order/list')
}
</script>


