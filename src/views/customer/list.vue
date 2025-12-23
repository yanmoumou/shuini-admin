<template>
  <div class="customer-list">
    <el-card shadow="never">
      <el-form :model="query" inline>
        <el-form-item label="客户名称">
          <el-input v-model="query.name" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="query.type" placeholder="请选择" clearable>
            <el-option label="企业客户" value="company" />
            <el-option label="个人客户" value="personal" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="query.status" placeholder="请选择" clearable>
            <el-option label="正常" value="active" />
            <el-option label="停用" value="inactive" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleAdd">新增客户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" style="margin-top: 16px">
      <el-table :data="tableData" stripe v-loading="loading">
        <el-table-column prop="name" label="客户名称" min-width="150" />
        <el-table-column prop="shortName" label="简称" width="100" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">
            <el-tag>{{ row.type === 'company' ? '企业' : '个人' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="contact" label="联系人" width="100" />
        <el-table-column prop="phone" label="联系电话" width="130" />
        <el-table-column prop="address" label="地址" min-width="200" show-overflow-tooltip />
        <el-table-column prop="creditLimit" label="信用额度" width="120">
          <template #default="{ row }">
            ¥{{ row.creditLimit?.toLocaleString() || 0 }}
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="账户余额" width="120">
          <template #default="{ row }">
            <span :class="{ 'text-danger': row.balance < 0 }">¥{{ row.balance?.toLocaleString() || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">{{ row.status === 'active' ? '正常' : '停用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="primary" @click="handlePrice(row)">价格</el-button>
            <el-button link type="primary" @click="handleBill(row)">账单</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 16px; justify-content: flex-end"
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.size"
        :total="pagination.total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </el-card>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑客户' : '新增客户'" width="600">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入客户全称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="简称" prop="shortName">
              <el-input v-model="form.shortName" placeholder="请输入简称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户类型" prop="type">
              <el-radio-group v-model="form.type">
                <el-radio value="company">企业客户</el-radio>
                <el-radio value="personal">个人客户</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格类型" prop="priceType">
              <el-radio-group v-model="form.priceType">
                <el-radio value="standard">标准价</el-radio>
                <el-radio value="contract">协议价</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="form.contact" placeholder="请输入联系人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入详细地址" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="信用额度">
              <el-input-number v-model="form.creditLimit" :min="0" :step="10000" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-switch v-model="form.status" active-value="active" inactive-value="inactive" active-text="正常" inactive-text="停用" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :rows="2" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="priceVisible" title="协议价格设置" width="500">
      <el-form label-width="100px">
        <el-form-item v-for="p in products" :key="p.value" :label="p.label">
          <el-input-number v-model="priceForm[p.value]" :min="0" :precision="2" style="width: 200px" />
          <span style="margin-left: 8px; color: #909399">标准价: ¥{{ p.price }}</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="priceVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSavePrice">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { productOptions } from '@/utils'

const loading = ref(false)
const dialogVisible = ref(false)
const priceVisible = ref(false)
const submitLoading = ref(false)
const isEdit = ref(false)
const formRef = ref<FormInstance>()

const query = reactive({ name: '', type: '', status: '' })
const pagination = reactive({ page: 1, size: 10, total: 50 })
const products = productOptions

const form = reactive({
  id: '',
  name: '',
  shortName: '',
  type: 'company',
  priceType: 'standard',
  contact: '',
  phone: '',
  address: '',
  creditLimit: 0,
  status: 'active',
  remark: ''
})

const priceForm = reactive<Record<string, number>>({})

const rules: FormRules = {
  name: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择客户类型', trigger: 'change' }],
  contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
}

const tableData = ref([
  { id: '1', name: '郑州市某建筑工程有限公司', shortName: '某建筑', type: 'company', contact: '张经理', phone: '13800138000', address: '郑州市金水区xxx路xxx号', creditLimit: 500000, balance: 120000, status: 'active' },
  { id: '2', name: '河南某混凝土有限公司', shortName: '某混凝土', type: 'company', contact: '李经理', phone: '13800138001', address: '郑州市中原区xxx路xxx号', creditLimit: 1000000, balance: -50000, status: 'active' },
  { id: '3', name: '某工程公司', shortName: '某工程', type: 'company', contact: '王经理', phone: '13800138002', address: '郑州市二七区xxx路', creditLimit: 300000, balance: 80000, status: 'active' }
])

const handleSearch = () => { ElMessage.info('查询') }
const handleReset = () => { query.name = ''; query.type = ''; query.status = '' }
const handlePageChange = () => {}
const handleSizeChange = () => {}

const handleAdd = () => {
  isEdit.value = false
  Object.assign(form, { id: '', name: '', shortName: '', type: 'company', priceType: 'standard', contact: '', phone: '', address: '', creditLimit: 0, status: 'active', remark: '' })
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  isEdit.value = true
  Object.assign(form, row)
  dialogVisible.value = true
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  submitLoading.value = true
  setTimeout(() => {
    ElMessage.success(isEdit.value ? '修改成功' : '创建成功')
    dialogVisible.value = false
    submitLoading.value = false
  }, 500)
}

const handlePrice = (row: any) => {
  products.forEach(p => { priceForm[p.value] = row.contractPrice?.[p.value] || p.price })
  priceVisible.value = true
}

const handleSavePrice = () => {
  ElMessage.success('保存成功')
  priceVisible.value = false
}

const handleBill = (row: any) => {
  ElMessage.info(`查看${row.name}账单`)
}

const handleDelete = async (row: any) => {
  await ElMessageBox.confirm('确定删除该客户吗？', '提示')
  ElMessage.success('删除成功')
}
</script>

<style scoped>
.text-danger {
  color: #f56c6c;
}
</style>


