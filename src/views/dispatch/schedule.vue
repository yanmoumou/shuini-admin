<template>
  <div class="dispatch-schedule">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card shadow="never">
          <template #header>待派单订单</template>
          <el-table :data="pendingOrders" stripe @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" />
            <el-table-column prop="orderNo" label="订单号" width="160" />
            <el-table-column prop="customer" label="客户" />
            <el-table-column prop="address" label="收货地址" show-overflow-tooltip />
            <el-table-column prop="product" label="品种" width="100" />
            <el-table-column prop="weight" label="吨数" width="80" />
            <el-table-column label="操作" width="100">
              <template #default="{ row }">
                <el-button link type="primary" @click="handleDispatch(row)">派单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>可用车辆</template>
          <div class="vehicle-list">
            <div class="vehicle-item" v-for="v in availableVehicles" :key="v.id" :class="{ selected: selectedVehicle === v.id }" @click="selectedVehicle = v.id">
              <div class="vehicle-info">
                <div class="plate">{{ v.plate }}</div>
                <div class="driver">{{ v.driver }}</div>
              </div>
              <div class="vehicle-status">
                <el-tag type="success" size="small">空闲</el-tag>
              </div>
            </div>
          </div>
        </el-card>
        <el-card shadow="never" style="margin-top: 16px">
          <template #header>快捷操作</template>
          <el-button type="primary" style="width: 100%" :disabled="!canBatchDispatch" @click="handleBatchDispatch">批量派单</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const selectedOrders = ref<any[]>([])
const selectedVehicle = ref('')

const pendingOrders = ref([
  { orderNo: 'YS20241223003', customer: '某工程公司', address: '郑州市金水区xxx路', product: 'P.O52.5', weight: 30 },
  { orderNo: 'YS20241223006', customer: '某开发商', address: '郑州市中原区xxx路', product: 'P.O42.5', weight: 35 },
  { orderNo: 'YS20241223007', customer: '某建材', address: '郑州市二七区xxx路', product: 'P.C32.5', weight: 32 }
])

const availableVehicles = ref([
  { id: '1', plate: '豫A11111', driver: '张三' },
  { id: '2', plate: '豫A22222', driver: '李四' },
  { id: '3', plate: '豫A33333', driver: '王五' },
  { id: '4', plate: '豫A44444', driver: '赵六' }
])

const canBatchDispatch = computed(() => selectedOrders.value.length > 0 && selectedVehicle.value)

const handleSelectionChange = (val: any[]) => {
  selectedOrders.value = val
}

const handleDispatch = (row: any) => {
  ElMessage.success(`派单成功: ${row.orderNo}`)
}

const handleBatchDispatch = () => {
  ElMessage.success(`批量派单 ${selectedOrders.value.length} 个订单`)
}
</script>

<style scoped>
.vehicle-list {
  max-height: 400px;
  overflow-y: auto;
}
.vehicle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.vehicle-item:hover {
  border-color: #409eff;
}
.vehicle-item.selected {
  border-color: #409eff;
  background: #ecf5ff;
}
.plate {
  font-weight: 600;
  color: #303133;
}
.driver {
  font-size: 13px;
  color: #909399;
  margin-top: 4px;
}
</style>


