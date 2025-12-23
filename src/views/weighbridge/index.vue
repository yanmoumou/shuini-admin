<template>
  <div class="weighbridge">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="never">
          <template #header>磅房状态</template>
          <div class="weighbridge-list">
            <div class="wb-item" v-for="wb in weighbridges" :key="wb.id" :class="wb.status">
              <div class="wb-info">
                <div class="wb-name">{{ wb.name }}</div>
                <div class="wb-location">{{ wb.location }}</div>
              </div>
              <div class="wb-status">
                <el-tag :type="wb.status === 'online' ? 'success' : 'danger'" size="small">
                  {{ wb.status === 'online' ? '在线' : '离线' }}
                </el-tag>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>过磅记录</span>
              <div>
                <el-date-picker v-model="dateRange" type="daterange" value-format="YYYY-MM-DD" size="small" style="width: 240px; margin-right: 8px" />
                <el-button type="primary" size="small">查询</el-button>
                <el-button size="small">导出</el-button>
              </div>
            </div>
          </template>
          <el-table :data="records" stripe size="small">
            <el-table-column prop="time" label="过磅时间" width="180" />
            <el-table-column prop="weighbridge" label="磅房" width="100" />
            <el-table-column prop="orderNo" label="订单号" width="160" />
            <el-table-column prop="plate" label="车牌号" width="100" />
            <el-table-column prop="driver" label="司机" width="80" />
            <el-table-column prop="product" label="品种" width="100" />
            <el-table-column prop="grossWeight" label="毛重(吨)" width="100" />
            <el-table-column prop="tareWeight" label="皮重(吨)" width="100" />
            <el-table-column prop="netWeight" label="净重(吨)" width="100">
              <template #default="{ row }">
                <span class="net-weight">{{ row.netWeight }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="80">
              <template #default="{ row }">
                <el-tag :type="row.type === 'load' ? 'success' : 'warning'" size="small">{{ row.type === 'load' ? '装货' : '卸货' }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination style="margin-top: 12px; justify-content: flex-end" :total="100" :page-sizes="[20, 50, 100]" layout="total, sizes, prev, pager, next" />
        </el-card>

        <el-row :gutter="20" style="margin-top: 16px">
          <el-col :span="12">
            <el-card shadow="never">
              <template #header>今日统计</template>
              <div class="today-stats">
                <div class="stat-item">
                  <div class="stat-value">{{ todayStats.totalTrips }}</div>
                  <div class="stat-label">过磅车次</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ todayStats.totalWeight }}</div>
                  <div class="stat-label">总重量(吨)</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ todayStats.avgWeight }}</div>
                  <div class="stat-label">平均吨数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="never">
              <template #header>实时监控</template>
              <div class="monitor-placeholder">
                <el-icon :size="40" color="#909399"><VideoCamera /></el-icon>
                <p>视频监控画面</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { VideoCamera } from '@element-plus/icons-vue'

const dateRange = ref([])

const weighbridges = ref([
  { id: '1', name: '1号磅', location: '东门入口', status: 'online' },
  { id: '2', name: '2号磅', location: '东门出口', status: 'online' },
  { id: '3', name: '3号磅', location: '西门入口', status: 'offline' }
])

const todayStats = reactive({
  totalTrips: 128,
  totalWeight: 4480,
  avgWeight: 35
})

const records = ref([
  { time: '2024-12-23 10:30:15', weighbridge: '1号磅', orderNo: 'YS20241223001', plate: '豫A11111', driver: '张三', product: 'P.O42.5', grossWeight: 50.2, tareWeight: 15.0, netWeight: 35.2, type: 'load' },
  { time: '2024-12-23 10:25:30', weighbridge: '2号磅', orderNo: 'YS20241223002', plate: '豫A22222', driver: '李四', product: 'P.C32.5', grossWeight: 47.8, tareWeight: 15.2, netWeight: 32.6, type: 'load' },
  { time: '2024-12-23 10:20:45', weighbridge: '1号磅', orderNo: 'YS20241223003', plate: '豫A33333', driver: '王五', product: 'P.O52.5', grossWeight: 45.5, tareWeight: 15.1, netWeight: 30.4, type: 'load' },
  { time: '2024-12-23 10:15:00', weighbridge: '2号磅', orderNo: 'YS20241222015', plate: '豫A44444', driver: '赵六', product: 'P.O42.5', grossWeight: 15.3, tareWeight: 15.3, netWeight: 0, type: 'unload' }
])
</script>

<style scoped>
.weighbridge-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.wb-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
}
.wb-item.online {
  border-left: 3px solid #67c23a;
}
.wb-item.offline {
  border-left: 3px solid #f56c6c;
  opacity: 0.7;
}
.wb-name {
  font-weight: 600;
  color: #303133;
}
.wb-location {
  font-size: 13px;
  color: #909399;
  margin-top: 4px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.net-weight {
  color: #409eff;
  font-weight: 600;
}
.today-stats {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}
.stat-item {
  text-align: center;
}
.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #409eff;
}
.stat-label {
  font-size: 14px;
  color: #909399;
  margin-top: 8px;
}
.monitor-placeholder {
  height: 150px;
  background: #1a1a1a;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
}
</style>


