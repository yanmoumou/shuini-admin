<template>
  <div class="driver-list">
    <el-card shadow="never">
      <el-form :model="query" inline>
        <el-form-item label="姓名">
          <el-input v-model="query.name" placeholder="请输入" clearable style="width: 120px" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="query.phone" placeholder="请输入" clearable style="width: 140px" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="query.type" placeholder="请选择" clearable style="width: 120px">
            <el-option label="自有司机" value="own" />
            <el-option label="外协司机" value="external" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="query.status" placeholder="请选择" clearable style="width: 100px">
            <el-option label="在职" value="active" />
            <el-option label="离职" value="inactive" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon> 新增司机
          </el-button>
          <el-button @click="handleExport">
            <el-icon><Download /></el-icon> 导出
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-row :gutter="20" style="margin-top: 16px">
      <el-col :span="4">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">司机总数</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value success">{{ stats.active }}</div>
          <div class="stat-label">在职</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value primary">{{ stats.own }}</div>
          <div class="stat-label">自有司机</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value warning">{{ stats.external }}</div>
          <div class="stat-label">外协司机</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value danger">{{ stats.licenseExpiring }}</div>
          <div class="stat-label">证件即将过期</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.unBindVehicle }}</div>
          <div class="stat-label">未绑定车辆</div>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never" style="margin-top: 16px">
      <el-table :data="tableData" stripe v-loading="loading">
        <el-table-column prop="name" label="姓名" width="100">
          <template #default="{ row }">
            <el-link type="primary" @click="handleEdit(row)">{{ row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="130" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="vehiclePlate" label="绑定车辆" width="120">
          <template #default="{ row }">
            <span v-if="row.vehiclePlate">{{ row.vehiclePlate }}</span>
            <el-button v-else link type="primary" size="small" @click="handleBindVehicle(row)">绑定</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === 'own' ? 'primary' : 'warning'" size="small">{{ row.type === 'own' ? '自有' : '外协' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="licenseExpiry" label="驾驶证有效期" width="120">
          <template #default="{ row }">
            <span :class="{ 'text-danger': isExpiringSoon(row.licenseExpiry) }">{{ row.licenseExpiry }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'" size="small">{{ row.status === 'active' ? '在职' : '离职' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="monthTrips" label="本月趟次" width="100" align="center" />
        <el-table-column prop="monthWeight" label="本月吨数" width="100" align="center" />
        <el-table-column prop="entryDate" label="入职日期" width="110" />
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="primary" @click="handleDetail(row)">详情</el-button>
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
      />
    </el-card>

    <DriverFormDialog v-model="dialogVisible" :data="currentDriver" @success="fetchData" />

    <el-dialog v-model="bindVisible" title="绑定车辆" width="400">
      <el-form label-width="80px">
        <el-form-item label="选择车辆">
          <el-select v-model="bindVehicleId" placeholder="请选择车辆" style="width: 100%">
            <el-option v-for="v in availableVehicles" :key="v.id" :label="`${v.plate} (${v.capacity}吨)`" :value="v.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="bindVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmBind">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Download } from '@element-plus/icons-vue'
import DriverFormDialog from '@/components/DriverFormDialog.vue'

const loading = ref(false)
const dialogVisible = ref(false)
const bindVisible = ref(false)
const currentDriver = ref<any>(null)
const bindVehicleId = ref('')

const query = reactive({ name: '', phone: '', type: '', status: '' })
const pagination = reactive({ page: 1, size: 10, total: 52 })

const stats = reactive({
  total: 52,
  active: 48,
  own: 28,
  external: 24,
  licenseExpiring: 3,
  unBindVehicle: 5
})

const availableVehicles = ref([
  { id: '10', plate: '豫A10101', capacity: 35 },
  { id: '11', plate: '豫A10102', capacity: 32 }
])

const tableData = ref([
  { id: '1', name: '张三', phone: '13800138001', idCard: '410***********1234', vehiclePlate: '豫A11111', type: 'own', licenseExpiry: '2025-06-30', status: 'active', monthTrips: 28, monthWeight: 980, entryDate: '2023-01-15' },
  { id: '2', name: '李四', phone: '13800138002', idCard: '410***********2345', vehiclePlate: '豫A22222', type: 'own', licenseExpiry: '2025-03-15', status: 'active', monthTrips: 25, monthWeight: 875, entryDate: '2023-02-20' },
  { id: '3', name: '王五', phone: '13800138003', idCard: '410***********3456', vehiclePlate: '豫A33333', type: 'external', licenseExpiry: '2025-01-20', status: 'active', monthTrips: 30, monthWeight: 1050, entryDate: '2023-03-10' },
  { id: '4', name: '赵六', phone: '13800138004', idCard: '410***********4567', vehiclePlate: '', type: 'external', licenseExpiry: '2025-08-10', status: 'active', monthTrips: 0, monthWeight: 0, entryDate: '2023-04-05' },
  { id: '5', name: '钱七', phone: '13800138005', idCard: '410***********5678', vehiclePlate: '豫A55555', type: 'own', licenseExpiry: '2025-12-01', status: 'active', monthTrips: 22, monthWeight: 770, entryDate: '2023-05-18' }
])

const isExpiringSoon = (date: string) => {
  const expiry = new Date(date)
  const now = new Date()
  const days = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  return days < 90
}

const fetchData = () => {
  loading.value = true
  setTimeout(() => { loading.value = false }, 300)
}

const handleSearch = () => fetchData()
const handleReset = () => { query.name = ''; query.phone = ''; query.type = ''; query.status = '' }

const handleAdd = () => {
  currentDriver.value = null
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  currentDriver.value = { ...row }
  dialogVisible.value = true
}

const handleDetail = (row: any) => {
  ElMessage.info(`查看${row.name}详情`)
}

const handleBindVehicle = (row: any) => {
  currentDriver.value = row
  bindVehicleId.value = ''
  bindVisible.value = true
}

const handleConfirmBind = () => {
  ElMessage.success('绑定成功')
  bindVisible.value = false
}

const handleDelete = async (row: any) => {
  await ElMessageBox.confirm('确定删除该司机吗？', '提示')
  ElMessage.success('删除成功')
}

const handleExport = () => {
  ElMessage.info('导出司机列表')
}

onMounted(fetchData)
</script>

<style scoped>
.stat-card {
  text-align: center;
}
.stat-card :deep(.el-card__body) {
  padding: 16px;
}
.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
}
.stat-value.success { color: #67c23a; }
.stat-value.primary { color: #409eff; }
.stat-value.warning { color: #e6a23c; }
.stat-value.danger { color: #f56c6c; }
.stat-label {
  font-size: 13px;
  color: #909399;
  margin-top: 4px;
}
.text-danger {
  color: #f56c6c;
}
</style>
