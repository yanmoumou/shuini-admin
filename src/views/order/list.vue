<template>
  <div class="order-list">
    <el-card shadow="never">
      <el-form :model="query" inline>
        <el-form-item label="订单号">
          <el-input v-model="query.orderNo" placeholder="请输入" clearable style="width: 160px" />
        </el-form-item>
        <el-form-item label="客户">
          <el-select v-model="query.customerId" placeholder="请选择" clearable filterable style="width: 160px">
            <el-option v-for="c in customers" :key="c.id" :label="c.name" :value="c.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="query.status" placeholder="请选择" clearable style="width: 120px">
            <el-option v-for="s in statusOptions" :key="s.value" :label="s.label" :value="s.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="query.dateRange" type="daterange" value-format="YYYY-MM-DD" style="width: 240px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" style="margin-top: 16px">
      <template #header>
        <div class="card-header">
          <div class="header-left">
            <span>订单列表</span>
            <el-tag type="info" style="margin-left: 8px">共 {{ pagination.total }} 条</el-tag>
          </div>
          <div class="header-right">
            <el-button type="primary" @click="$router.push('/order/create')">
              <el-icon><Plus /></el-icon> 新建订单
            </el-button>
            <el-button @click="handleBatchDispatch" :disabled="selectedRows.length === 0">
              <el-icon><Van /></el-icon> 批量派单
            </el-button>
            <el-button @click="handleExport">
              <el-icon><Download /></el-icon> 导出
            </el-button>
          </div>
        </div>
      </template>

      <el-table :data="tableData" stripe v-loading="loading" @selection-change="handleSelectionChange" row-key="id">
        <el-table-column type="selection" width="50" :selectable="row => row.status === 'pending'" />
        <el-table-column prop="orderNo" label="订单号" width="160">
          <template #default="{ row }">
            <el-link type="primary" @click="$router.push(`/order/detail/${row.id}`)">{{ row.orderNo }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="customerName" label="客户名称" min-width="150" show-overflow-tooltip />
        <el-table-column prop="address" label="收货地址" min-width="180" show-overflow-tooltip />
        <el-table-column prop="product" label="水泥品种" width="100" />
        <el-table-column prop="weight" label="吨数" width="80" align="right">
          <template #default="{ row }">{{ row.weight }}</template>
        </el-table-column>
        <el-table-column prop="amount" label="金额(元)" width="100" align="right">
          <template #default="{ row }">
            <span class="amount">{{ row.amount?.toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="driverName" label="司机" width="80">
          <template #default="{ row }">{{ row.driverName || '-' }}</template>
        </el-table-column>
        <el-table-column prop="vehiclePlate" label="车牌号" width="100">
          <template #default="{ row }">{{ row.vehiclePlate || '-' }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="statusMap[row.status]?.type" size="small">{{ statusMap[row.status]?.label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160" />
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="$router.push(`/order/detail/${row.id}`)">查看</el-button>
            <el-button link type="primary" @click="handleDispatch(row)" v-if="row.status === 'pending'">派单</el-button>
            <el-button link type="danger" @click="handleCancel(row)" v-if="['pending', 'dispatched'].includes(row.status)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="margin-top: 16px; justify-content: flex-end"
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.size"
        :total="pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="fetchData"
        @size-change="fetchData"
      />
    </el-card>

    <OrderDispatchDialog v-model="dispatchVisible" :order="currentOrder" @success="fetchData" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Van, Download } from '@element-plus/icons-vue'
import OrderDispatchDialog from '@/components/OrderDispatchDialog.vue'
import { orderStatusOptions } from '@/utils'

const loading = ref(false)
const dispatchVisible = ref(false)
const currentOrder = ref<any>(null)
const selectedRows = ref<any[]>([])

const query = reactive({
  orderNo: '',
  customerId: '',
  status: '',
  dateRange: [] as string[]
})

const pagination = reactive({ page: 1, size: 10, total: 156 })

const statusOptions = orderStatusOptions
const statusMap: Record<string, { label: string; type: string }> = {
  pending: { label: '待派单', type: 'info' },
  dispatched: { label: '已派单', type: 'warning' },
  loading: { label: '装货中', type: 'warning' },
  transporting: { label: '运输中', type: 'primary' },
  arrived: { label: '已到达', type: 'primary' },
  signed: { label: '已签收', type: 'success' },
  completed: { label: '已完成', type: 'success' },
  cancelled: { label: '已取消', type: 'danger' }
}

const customers = ref([
  { id: '1', name: '某建筑公司' },
  { id: '2', name: '某混凝土公司' },
  { id: '3', name: '某工程公司' }
])

const tableData = ref([
  { id: '1', orderNo: 'YS20241223001', customerId: '1', customerName: '某建筑公司', address: '郑州市金水区xxx路', product: 'P.O42.5', weight: 35, amount: 15750, driverName: '张三', vehiclePlate: '豫A11111', status: 'transporting', createTime: '2024-12-23 08:30' },
  { id: '2', orderNo: 'YS20241223002', customerId: '2', customerName: '某混凝土公司', address: '郑州市中原区xxx路', product: 'P.C32.5', weight: 32, amount: 12160, driverName: '李四', vehiclePlate: '豫A22222', status: 'signed', createTime: '2024-12-23 08:25' },
  { id: '3', orderNo: 'YS20241223003', customerId: '3', customerName: '某工程公司', address: '郑州市二七区xxx路', product: 'P.O52.5', weight: 30, amount: 15600, driverName: '', vehiclePlate: '', status: 'pending', createTime: '2024-12-23 08:20' },
  { id: '4', orderNo: 'YS20241223004', customerId: '1', customerName: '某建筑公司', address: '郑州市惠济区xxx路', product: 'P.O42.5', weight: 34, amount: 15300, driverName: '赵六', vehiclePlate: '豫A44444', status: 'loading', createTime: '2024-12-23 08:15' },
  { id: '5', orderNo: 'YS20241223005', customerId: '2', customerName: '某混凝土公司', address: '郑州市管城区xxx路', product: 'P.C32.5', weight: 33, amount: 12540, driverName: '', vehiclePlate: '', status: 'pending', createTime: '2024-12-23 08:10' },
  { id: '6', orderNo: 'YS20241223006', customerId: '3', customerName: '某工程公司', address: '郑州市高新区xxx路', product: 'P.O42.5', weight: 35, amount: 15750, driverName: '钱七', vehiclePlate: '豫A55555', status: 'completed', createTime: '2024-12-23 08:05' }
])

const fetchData = () => {
  loading.value = true
  setTimeout(() => { loading.value = false }, 300)
}

const handleSearch = () => {
  pagination.page = 1
  fetchData()
}

const handleReset = () => {
  query.orderNo = ''
  query.customerId = ''
  query.status = ''
  query.dateRange = []
  handleSearch()
}

const handleSelectionChange = (rows: any[]) => {
  selectedRows.value = rows
}

const handleDispatch = (row: any) => {
  currentOrder.value = row
  dispatchVisible.value = true
}

const handleBatchDispatch = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请选择要派单的订单')
    return
  }
  ElMessage.info(`批量派单 ${selectedRows.value.length} 个订单`)
}

const handleCancel = async (row: any) => {
  await ElMessageBox.confirm('确定取消此订单吗？', '提示')
  ElMessage.success('订单已取消')
  fetchData()
}

const handleExport = () => {
  ElMessage.info('导出订单')
}

onMounted(fetchData)
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left {
  display: flex;
  align-items: center;
}
.header-right {
  display: flex;
  gap: 8px;
}
.amount {
  color: #f56c6c;
  font-weight: 500;
}
</style>
