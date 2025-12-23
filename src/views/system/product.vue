<template>
  <div class="system-product">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>水泥品种管理</span>
          <el-button type="primary" @click="handleAdd">新增品种</el-button>
        </div>
      </template>
      <el-table :data="tableData" stripe>
        <el-table-column prop="code" label="品种编码" width="120" />
        <el-table-column prop="name" label="品种名称" width="150" />
        <el-table-column prop="spec" label="规格" width="120" />
        <el-table-column prop="unit" label="单位" width="80" />
        <el-table-column prop="price" label="标准单价(元/吨)" width="150">
          <template #default="{ row }">
            <span class="price">¥{{ row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="freightPrice" label="运费单价(元/吨)" width="150">
          <template #default="{ row }">
            <span>¥{{ row.freightPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-switch v-model="row.status" active-value="active" inactive-value="inactive" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑品种' : '新增品种'" width="500">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="品种编码" prop="code">
          <el-input v-model="form.code" placeholder="如：P.O42.5" />
        </el-form-item>
        <el-form-item label="品种名称" prop="name">
          <el-input v-model="form.name" placeholder="如：普通硅酸盐水泥42.5" />
        </el-form-item>
        <el-form-item label="规格" prop="spec">
          <el-input v-model="form.spec" placeholder="如：散装/袋装" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="吨" style="width: 120px" />
        </el-form-item>
        <el-form-item label="标准单价" prop="price">
          <el-input-number v-model="form.price" :min="0" :precision="2" style="width: 200px" />
          <span style="margin-left: 8px">元/吨</span>
        </el-form-item>
        <el-form-item label="运费单价" prop="freightPrice">
          <el-input-number v-model="form.freightPrice" :min="0" :precision="2" style="width: 200px" />
          <span style="margin-left: 8px">元/吨</span>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :rows="2" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref<FormInstance>()

const form = reactive({
  id: '',
  code: '',
  name: '',
  spec: '',
  unit: '吨',
  price: 0,
  freightPrice: 0,
  status: 'active',
  remark: ''
})

const rules: FormRules = {
  code: [{ required: true, message: '请输入品种编码', trigger: 'blur' }],
  name: [{ required: true, message: '请输入品种名称', trigger: 'blur' }],
  price: [{ required: true, message: '请输入标准单价', trigger: 'blur' }]
}

const tableData = ref([
  { id: '1', code: 'P.O42.5', name: '普通硅酸盐水泥42.5', spec: '散装', unit: '吨', price: 450, freightPrice: 15, status: 'active', remark: '常用品种' },
  { id: '2', code: 'P.O52.5', name: '普通硅酸盐水泥52.5', spec: '散装', unit: '吨', price: 520, freightPrice: 15, status: 'active', remark: '高标号' },
  { id: '3', code: 'P.C32.5', name: '复合硅酸盐水泥32.5', spec: '散装', unit: '吨', price: 380, freightPrice: 15, status: 'active', remark: '' },
  { id: '4', code: 'P.S.A32.5', name: '矿渣硅酸盐水泥32.5', spec: '袋装', unit: '吨', price: 360, freightPrice: 18, status: 'active', remark: '袋装50kg/袋' }
])

const handleAdd = () => {
  isEdit.value = false
  Object.assign(form, { id: '', code: '', name: '', spec: '', unit: '吨', price: 0, freightPrice: 0, status: 'active', remark: '' })
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  isEdit.value = true
  Object.assign(form, row)
  dialogVisible.value = true
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  ElMessage.success(isEdit.value ? '修改成功' : '创建成功')
  dialogVisible.value = false
}

const handleDelete = async (row: any) => {
  await ElMessageBox.confirm('确定删除该品种吗？', '提示')
  ElMessage.success('删除成功')
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price {
  color: #f56c6c;
  font-weight: 600;
}
</style>


