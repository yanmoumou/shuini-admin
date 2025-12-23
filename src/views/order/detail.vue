<template>
  <div class="order-detail">
    <el-page-header @back="$router.back()">
      <template #content>
        <span>订单详情 - {{ order.orderNo }}</span>
      </template>
      <template #extra>
        <el-button v-if="order.status === 'pending'" type="primary" @click="showDispatch = true">派单</el-button>
        <el-button v-if="['pending', 'dispatched'].includes(order.status)" type="danger" @click="handleCancel">取消订单</el-button>
        <el-button @click="handlePrint">打印</el-button>
      </template>
    </el-page-header>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="16">
        <el-card shadow="never">
          <template #header>订单状态</template>
          <el-steps :active="currentStep" finish-status="success">
            <el-step title="创建订单" :description="order.createTime" />
            <el-step title="派单" :description="order.dispatchTime" />
            <el-step title="装货" :description="order.loadTime" />
            <el-step title="运输" :description="order.departTime" />
            <el-step title="签收" :description="order.signTime" />
          </el-steps>
        </el-card>

        <el-card shadow="never" style="margin-top: 16px">
          <template #header>基本信息</template>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="订单编号">{{ order.orderNo }}</el-descriptions-item>
            <el-descriptions-item label="订单状态">
              <el-tag :type="statusColor">{{ statusLabel }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="客户名称">{{ order.customerName }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ order.customerPhone }}</el-descriptions-item>
            <el-descriptions-item label="收货地址" :span="2">{{ order.address }}</el-descriptions-item>
            <el-descriptions-item label="水泥品种">{{ order.product }}</el-descriptions-item>
            <el-descriptions-item label="订单吨数">{{ order.weight }} 吨</el-descriptions-item>
            <el-descriptions-item label="单价">¥{{ order.price }}/吨</el-descriptions-item>
            <el-descriptions-item label="订单金额">
              <span class="amount">¥{{ order.amount?.toLocaleString() }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="备注" :span="2">{{ order.remark || '无' }}</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card shadow="never" style="margin-top: 16px" v-if="order.driverName">
          <template #header>运输信息</template>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="司机姓名">{{ order.driverName }}</el-descriptions-item>
            <el-descriptions-item label="司机电话">{{ order.driverPhone }}</el-descriptions-item>
            <el-descriptions-item label="车牌号">{{ order.vehiclePlate }}</el-descriptions-item>
            <el-descriptions-item label="车辆类型">{{ order.vehicleType === 'bulk' ? '散装罐车' : '袋装货车' }}</el-descriptions-item>
            <el-descriptions-item label="装货重量">{{ order.loadWeight || '-' }} 吨</el-descriptions-item>
            <el-descriptions-item label="卸货重量">{{ order.unloadWeight || '-' }} 吨</el-descriptions-item>
            <el-descriptions-item label="损耗">
              <span :class="{ warning: order.lossWeight > 0.5 }">{{ order.lossWeight || '-' }} 吨</span>
            </el-descriptions-item>
            <el-descriptions-item label="运费">¥{{ order.freightAmount?.toLocaleString() || '-' }}</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card shadow="never" style="margin-top: 16px" v-if="order.signPhotos?.length">
          <template #header>签收照片</template>
          <div class="photo-list">
            <el-image v-for="(img, i) in order.signPhotos" :key="i" :src="img" :preview-src-list="order.signPhotos" fit="cover" class="photo-item" />
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="never">
          <template #header>运输轨迹</template>
          <div class="map-placeholder">
            <el-icon :size="40" color="#909399"><Location /></el-icon>
            <p>轨迹地图</p>
          </div>
        </el-card>

        <el-card shadow="never" style="margin-top: 16px">
          <template #header>操作记录</template>
          <el-timeline>
            <el-timeline-item v-for="log in logs" :key="log.time" :timestamp="log.time" placement="top">
              <div class="log-content">
                <span class="log-action">{{ log.action }}</span>
                <span class="log-user">{{ log.operator }}</span>
              </div>
              <div class="log-remark" v-if="log.remark">{{ log.remark }}</div>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog v-model="showDispatch" title="派单" width="500">
      <el-form :model="dispatchForm" label-width="80px">
        <el-form-item label="选择司机" required>
          <el-select v-model="dispatchForm.driverId" placeholder="请选择司机" style="width: 100%">
            <el-option v-for="d in availableDrivers" :key="d.id" :label="`${d.name} - ${d.vehiclePlate}`" :value="d.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDispatch = false">取消</el-button>
        <el-button type="primary" @click="handleDispatch">确认派单</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const showDispatch = ref(false)
const dispatchForm = reactive({ driverId: '' })

const order = reactive({
  id: route.params.id as string,
  orderNo: 'YS20241223001',
  status: 'transporting',
  customerName: '某建筑公司',
  customerPhone: '13800138000',
  address: '郑州市金水区xxx路xxx工地',
  product: 'P.O42.5',
  weight: 35,
  price: 450,
  amount: 15750,
  remark: '尽快送达',
  driverName: '张三',
  driverPhone: '13800138001',
  vehiclePlate: '豫A11111',
  vehicleType: 'bulk',
  loadWeight: 35.2,
  unloadWeight: 34.8,
  lossWeight: 0.4,
  freightAmount: 525,
  signPhotos: [],
  createTime: '2024-12-23 08:00',
  dispatchTime: '2024-12-23 08:10',
  loadTime: '2024-12-23 08:30',
  departTime: '2024-12-23 08:45',
  signTime: ''
})

const availableDrivers = ref([
  { id: '1', name: '张三', vehiclePlate: '豫A11111' },
  { id: '2', name: '李四', vehiclePlate: '豫A22222' },
  { id: '3', name: '王五', vehiclePlate: '豫A33333' }
])

const logs = ref([
  { time: '2024-12-23 08:45', action: '开始运输', operator: '系统', remark: '' },
  { time: '2024-12-23 08:30', action: '装货完成', operator: '张三', remark: '装货重量35.2吨' },
  { time: '2024-12-23 08:10', action: '派单', operator: '管理员', remark: '派给张三' },
  { time: '2024-12-23 08:00', action: '创建订单', operator: '管理员', remark: '' }
])

const statusMap: Record<string, { label: string; color: string; step: number }> = {
  pending: { label: '待派单', color: 'info', step: 0 },
  dispatched: { label: '已派单', color: 'warning', step: 1 },
  loading: { label: '装货中', color: 'warning', step: 2 },
  transporting: { label: '运输中', color: 'primary', step: 3 },
  signed: { label: '已签收', color: 'success', step: 4 },
  completed: { label: '已完成', color: 'success', step: 5 },
  cancelled: { label: '已取消', color: 'danger', step: -1 }
}

const currentStep = computed(() => statusMap[order.status]?.step ?? 0)
const statusLabel = computed(() => statusMap[order.status]?.label ?? '')
const statusColor = computed(() => statusMap[order.status]?.color ?? 'info')

const handleDispatch = () => {
  ElMessage.success('派单成功')
  showDispatch.value = false
}

const handleCancel = async () => {
  await ElMessageBox.confirm('确定取消此订单吗？', '提示')
  ElMessage.success('订单已取消')
}

const handlePrint = () => {
  window.print()
}

onMounted(() => {})
</script>

<style scoped>
.amount {
  color: #f56c6c;
  font-size: 18px;
  font-weight: 600;
}
.warning {
  color: #e6a23c;
}
.map-placeholder {
  height: 200px;
  background: #f5f7fa;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #909399;
}
.photo-list {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.photo-item {
  width: 120px;
  height: 120px;
  border-radius: 8px;
}
.log-content {
  display: flex;
  justify-content: space-between;
}
.log-action {
  font-weight: 500;
}
.log-user {
  color: #909399;
  font-size: 13px;
}
.log-remark {
  color: #606266;
  font-size: 13px;
  margin-top: 4px;
}
</style>


