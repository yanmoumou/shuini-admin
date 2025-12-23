<template>
  <div class="system-role">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>角色管理</span>
          <el-button type="primary" @click="handleAdd">新增角色</el-button>
        </div>
      </template>
      <el-table :data="tableData" stripe>
        <el-table-column prop="name" label="角色名称" width="150" />
        <el-table-column prop="code" label="角色编码" width="150" />
        <el-table-column prop="permissions" label="权限">
          <template #default="{ row }">
            <el-tag v-for="p in row.permissions.slice(0, 5)" :key="p" size="small" style="margin-right: 4px">{{ permissionNames[p] }}</el-tag>
            <el-tag v-if="row.permissions.length > 5" size="small" type="info">+{{ row.permissions.length - 5 }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)" :disabled="row.code === 'admin'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑角色' : '新增角色'" width="600">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入角色编码" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
          <el-tree
            ref="treeRef"
            :data="permissionTree"
            show-checkbox
            node-key="code"
            :default-checked-keys="form.permissions"
            :props="{ label: 'name', children: 'children' }"
          />
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
const treeRef = ref()

const form = reactive({
  id: '',
  name: '',
  code: '',
  permissions: [] as string[],
  remark: ''
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }]
}

const permissionNames: Record<string, string> = {
  'order:list': '订单查看', 'order:create': '创建订单', 'order:dispatch': '派单',
  'driver:list': '司机查看', 'driver:edit': '司机编辑',
  'vehicle:list': '车辆查看', 'vehicle:edit': '车辆编辑',
  'finance:list': '财务查看', 'finance:settle': '财务结算',
  'monitor:list': '监控查看',
  'system:user': '用户管理', 'system:role': '角色管理'
}

const permissionTree = [
  { name: '订单管理', code: 'order', children: [
    { name: '订单查看', code: 'order:list' },
    { name: '创建订单', code: 'order:create' },
    { name: '派单', code: 'order:dispatch' }
  ]},
  { name: '司机管理', code: 'driver', children: [
    { name: '司机查看', code: 'driver:list' },
    { name: '司机编辑', code: 'driver:edit' }
  ]},
  { name: '车辆管理', code: 'vehicle', children: [
    { name: '车辆查看', code: 'vehicle:list' },
    { name: '车辆编辑', code: 'vehicle:edit' }
  ]},
  { name: '财务管理', code: 'finance', children: [
    { name: '财务查看', code: 'finance:list' },
    { name: '财务结算', code: 'finance:settle' }
  ]},
  { name: '监控中心', code: 'monitor', children: [
    { name: '监控查看', code: 'monitor:list' }
  ]},
  { name: '系统管理', code: 'system', children: [
    { name: '用户管理', code: 'system:user' },
    { name: '角色管理', code: 'system:role' }
  ]}
]

const tableData = ref([
  { id: '1', name: '超级管理员', code: 'admin', permissions: ['order:list', 'order:create', 'order:dispatch', 'driver:list', 'driver:edit', 'vehicle:list', 'vehicle:edit', 'finance:list', 'finance:settle', 'monitor:list', 'system:user', 'system:role'], remark: '拥有所有权限', createTime: '2024-01-01 00:00' },
  { id: '2', name: '调度员', code: 'dispatcher', permissions: ['order:list', 'order:create', 'order:dispatch', 'driver:list', 'vehicle:list', 'monitor:list'], remark: '负责订单调度', createTime: '2024-01-01 00:00' },
  { id: '3', name: '财务', code: 'finance', permissions: ['order:list', 'finance:list', 'finance:settle'], remark: '负责财务结算', createTime: '2024-01-01 00:00' }
])

const handleAdd = () => {
  isEdit.value = false
  Object.assign(form, { id: '', name: '', code: '', permissions: [], remark: '' })
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  isEdit.value = true
  Object.assign(form, row)
  dialogVisible.value = true
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  form.permissions = treeRef.value.getCheckedKeys()
  ElMessage.success(isEdit.value ? '修改成功' : '创建成功')
  dialogVisible.value = false
}

const handleDelete = async (row: any) => {
  await ElMessageBox.confirm('确定删除该角色吗？', '提示')
  ElMessage.success('删除成功')
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>


