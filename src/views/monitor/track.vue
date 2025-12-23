<template>
  <el-card shadow="never">
    <el-form :model="query" inline>
      <el-form-item label="车辆">
        <el-select v-model="query.vehicle" placeholder="请选择" style="width: 160px">
          <el-option label="豫A11111" value="1" />
          <el-option label="豫A22222" value="2" />
          <el-option label="豫A33333" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker v-model="query.date" type="date" value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询轨迹</el-button>
      </el-form-item>
    </el-form>
    <div class="track-container">
      <div class="track-map">
        <div class="map-placeholder">
          <el-icon :size="60" color="#909399"><MapLocation /></el-icon>
          <p>轨迹回放区域</p>
        </div>
      </div>
      <div class="track-timeline">
        <div class="timeline-header">
          <span>轨迹时间线</span>
          <div class="controls">
            <el-button :icon="VideoPlay" circle size="small" @click="handlePlay" />
            <el-slider v-model="playProgress" :show-tooltip="false" style="width: 200px" />
            <span>{{ playTime }}</span>
          </div>
        </div>
        <div class="timeline-list">
          <div class="timeline-item" v-for="item in trackPoints" :key="item.time">
            <div class="time">{{ item.time }}</div>
            <div class="location">{{ item.location }}</div>
            <div class="speed">{{ item.speed }} km/h</div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { VideoPlay, MapLocation } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const query = reactive({ vehicle: '', date: '' })
const playProgress = ref(0)
const playTime = ref('00:00:00')

const trackPoints = ref([
  { time: '08:00:00', location: '郑州市xx水泥厂', speed: 0 },
  { time: '08:15:00', location: '郑州市金水区xx路', speed: 45 },
  { time: '08:30:00', location: '郑州市金水区北三环', speed: 60 },
  { time: '08:45:00', location: '郑州市惠济区xx路', speed: 55 },
  { time: '09:00:00', location: '郑州市惠济区xx工地', speed: 0 }
])

const handleQuery = () => {
  ElMessage.info('查询轨迹')
}

const handlePlay = () => {
  ElMessage.info('播放轨迹')
}
</script>

<style scoped>
.track-container {
  display: flex;
  gap: 20px;
  margin-top: 16px;
  height: calc(100vh - 280px);
}
.track-map {
  flex: 1;
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
}
.track-timeline {
  width: 360px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
.timeline-header {
  padding: 12px 16px;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}
.timeline-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}
.timeline-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px dashed #ebeef5;
  font-size: 13px;
}
.timeline-item .time {
  width: 80px;
  color: #409eff;
}
.timeline-item .location {
  flex: 1;
  color: #303133;
}
.timeline-item .speed {
  width: 60px;
  text-align: right;
  color: #909399;
}
</style>


