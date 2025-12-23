<template>
  <el-dialog v-model="visible" title="订单派单" width="800" :close-on-click-modal="false">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="section-title">订单信息</div>
        <el-descriptions :column="1" border size="small">
          <el-descriptions-item label="订单编号">{{ order.orderNo }}</el-descriptions-item>
          <el-descriptions-item label="客户名称">{{ order.customerName }}</el-descriptions-item>
          <el-descriptions-item label="收货地址">{{ order.address }}</el-descriptions-item>
          <el-descriptions-item label="水泥品种">{{ order.product }}</el-descriptions-item>
          <el-descriptions-item label="订单吨数">{{ order.weight }} 吨</el-descriptions-item>
        </el-descriptions>
      </el-col>
      <el-col :span="12">
        <div class="section-title">选择车辆</div>
        <el-input v-model="searchKey" placeholder="搜索车牌号/司机" prefix-icon="Search" clearable style="margin-bottom: 12px" />
        <div class="vehicle-list">
          <div
            class="vehicle-item"
            v-for="v in filteredVehicles"
            :key="v.id"
            :class="{ selected: selectedVehicle === v.id, disabled: v.status !== 'online' }"
            @click="v.status === 'online' && (selectedVehicle = v.id)"
          >
            <div class="vehicle-main">
              <div class="plate">{{ v.plate }}</div>
              <div class="driver">{{ v.driverName }} | {{ v.capacity }}吨</div>
            </div>
            <div class="vehicle-status">
              <el-tag :type="statusType[v.status]" size="small">{{ statusLabel[v.status] }}</el-tag>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-form style="margin-top: 16px" :inline="true">
      <el-form-item label="预计装货时间">
        <el-date-picker v-model="dispatchForm.loadTime" type="datetime" placeholder="选择时间" value-format="YYYY-MM-DD HH:mm" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="dispatchForm.remark" placeholder="派单备注" style="width: 300px" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" :disabled="!selectedVehicle" :loading="loading" @click="handleSubmit">确认派单</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  modelValue: boolean
  order: any
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const loading = ref(false)
const searchKey = ref('')
const selectedVehicle = ref('')

const dispatchForm = reactive({
  loadTime: '',
  remark: ''
})

const statusType: Record<string, string> = { online: 'success', running: 'primary', offline: 'info' }
const statusLabel: Record<string, string> = { online: '空闲', running: '运输中', offline: '离线' }

const vehicles = ref([
  { id: '1', plate: '豫A11111', driverName: '张三', capacity: 35, status: 'online' },
  { id: '2', plate: '豫A22222', driverName: '李四', capacity: 32, status: 'online' },
  { id: '3', plate: '豫A33333', driverName: '王五', capacity: 35, status: 'running' },
  { id: '4', plate: '豫A44444', driverName: '赵六', capacity: 30, status: 'offline' },
  { id: '5', plate: '豫A55555', driverName: '钱七', capacity: 35, status: 'online' }
])

const filteredVehicles = computed(() => {
  if (!searchKey.value) return vehicles.value
  return vehicles.value.filter(v => v.plate.includes(searchKey.value) || v.driverName.includes(searchKey.value))
})

watch(visible, (val) => {
  if (val) {
    selectedVehicle.value = ''
    dispatchForm.loadTime = ''
    dispatchForm.remark = ''
  }
})

const handleClose = () => {
  visible.value = false
}

const handleSubmit = async () => {
  loading.value = true
  setTimeout(() => {
    ElMessage.success('派单成功')
    loading.value = false
    visible.value = false
    emit('success')
  }, 500)
}
</script>

<style scoped>
.section-title {
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
  padding-left: 8px;
  border-left: 3px solid #409eff;
}
.vehicle-list {
  max-height: 280px;
  overflow-y: auto;
}
.vehicle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.vehicle-item:hover:not(.disabled) {
  border-color: #409eff;
}
.vehicle-item.selected {
  border-color: #409eff;
  background: #ecf5ff;
}
.vehicle-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.plate {
  font-weight: 600;
  color: #303133;
}
.driver {
  font-size: 12px;
  color: #909399;
  margin-top: 2px;
}
</style>


