<template>
  <div class="monitor-map">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="never" class="vehicle-panel">
          <template #header>车辆列表</template>
          <el-input v-model="searchKey" placeholder="搜索车牌号" prefix-icon="Search" clearable style="margin-bottom: 12px" />
          <div class="vehicle-list">
            <div class="vehicle-item" v-for="v in filteredVehicles" :key="v.id" :class="{ active: activeVehicle === v.id }" @click="handleSelectVehicle(v)">
              <div class="vehicle-info">
                <div class="plate">{{ v.plate }}</div>
                <div class="driver">{{ v.driver }}</div>
              </div>
              <el-tag :type="v.status === 'running' ? 'success' : v.status === 'online' ? 'primary' : 'info'" size="small">
                {{ statusLabel[v.status] }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card shadow="never" class="map-card">
          <div class="map-container">
            <div class="map-placeholder">
              <el-icon :size="60" color="#909399"><Location /></el-icon>
              <p>地图区域</p>
              <p class="tip">集成高德/百度地图SDK显示车辆实时位置</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchKey = ref('')
const activeVehicle = ref('')
const statusLabel: Record<string, string> = { running: '运输中', online: '在线', offline: '离线' }

const vehicles = ref([
  { id: '1', plate: '豫A11111', driver: '张三', status: 'running', lat: 34.75, lng: 113.65 },
  { id: '2', plate: '豫A22222', driver: '李四', status: 'online', lat: 34.76, lng: 113.66 },
  { id: '3', plate: '豫A33333', driver: '王五', status: 'running', lat: 34.77, lng: 113.67 },
  { id: '4', plate: '豫A44444', driver: '赵六', status: 'offline', lat: 34.78, lng: 113.68 },
  { id: '5', plate: '豫A55555', driver: '钱七', status: 'running', lat: 34.79, lng: 113.69 },
  { id: '6', plate: '豫A66666', driver: '孙八', status: 'online', lat: 34.80, lng: 113.70 }
])

const filteredVehicles = computed(() => {
  if (!searchKey.value) return vehicles.value
  return vehicles.value.filter(v => v.plate.includes(searchKey.value))
})

const handleSelectVehicle = (v: any) => {
  activeVehicle.value = v.id
}
</script>

<style scoped>
.monitor-map {
  height: calc(100vh - 140px);
}
.vehicle-panel {
  height: 100%;
}
.vehicle-panel :deep(.el-card__body) {
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
}
.vehicle-list {
  flex: 1;
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
.vehicle-item.active {
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
.map-card {
  height: 100%;
}
.map-card :deep(.el-card__body) {
  height: calc(100% - 20px);
  padding: 10px;
}
.map-container {
  height: 100%;
  background: #f5f7fa;
  border-radius: 8px;
}
.map-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #909399;
}
.map-placeholder p {
  margin-top: 16px;
  font-size: 16px;
}
.map-placeholder .tip {
  font-size: 13px;
  margin-top: 8px;
}
</style>


