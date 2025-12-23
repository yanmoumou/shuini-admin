<template>
  <div class="dashboard">
    <el-row :gutter="20" class="stat-row">
      <el-col :span="6" v-for="item in stats" :key="item.title">
        <el-card shadow="hover" class="stat-card" :body-style="{ padding: '20px' }">
          <div class="stat-content">
            <div class="stat-icon" :style="{ background: item.color }">
              <el-icon :size="28"><component :is="item.icon" /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ item.value }}</div>
              <div class="stat-title">{{ item.title }}</div>
              <div class="stat-compare" v-if="item.compare">
                较昨日 <span :class="item.compare > 0 ? 'up' : 'down'">{{ item.compare > 0 ? '+' : '' }}{{ item.compare }}%</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>订单趋势</span>
              <el-radio-group v-model="chartType" size="small">
                <el-radio-button value="week">近7天</el-radio-button>
                <el-radio-button value="month">近30天</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container" ref="chartRef"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>车辆状态</template>
          <div class="vehicle-status">
            <div class="status-item" v-for="item in vehicleStatus" :key="item.label">
              <span class="dot" :style="{ background: item.color }"></span>
              <span class="label">{{ item.label }}</span>
              <span class="count">{{ item.value }}</span>
              <span class="percent">{{ item.percent }}%</span>
            </div>
          </div>
          <div class="vehicle-chart" ref="vehicleChartRef"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>待处理事项</span>
              <el-badge :value="pendingItems.length" type="danger" />
            </div>
          </template>
          <div class="pending-list">
            <div class="pending-item" v-for="item in pendingItems" :key="item.id" @click="handlePendingClick(item)">
              <el-icon :color="item.color"><component :is="item.icon" /></el-icon>
              <span class="content">{{ item.content }}</span>
              <span class="time">{{ item.time }}</span>
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>最新订单</template>
          <el-table :data="recentOrders" stripe size="small">
            <el-table-column prop="orderNo" label="订单号" width="150">
              <template #default="{ row }">
                <el-link type="primary" @click="$router.push(`/order/detail/${row.id}`)">{{ row.orderNo }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="customer" label="客户" />
            <el-table-column prop="weight" label="吨数" width="70" />
            <el-table-column prop="status" label="状态" width="80">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="时间" width="90" />
          </el-table>
          <div style="text-align: center; margin-top: 12px">
            <el-button link type="primary" @click="$router.push('/order/list')">查看更多订单 →</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>品种分布</template>
          <div class="product-chart" ref="productChartRef"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>司机排行 TOP5</template>
          <div class="rank-list">
            <div class="rank-item" v-for="(item, index) in driverRank" :key="item.name">
              <span class="rank-no" :class="{ top: index < 3 }">{{ index + 1 }}</span>
              <span class="rank-name">{{ item.name }}</span>
              <el-progress :percentage="item.percent" :show-text="false" :stroke-width="8" style="flex: 1; margin: 0 12px" />
              <span class="rank-value">{{ item.trips }}趟</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>系统公告</template>
          <div class="notice-list">
            <div class="notice-item" v-for="item in notices" :key="item.id">
              <el-tag :type="item.type" size="small">{{ item.tag }}</el-tag>
              <span class="notice-title">{{ item.title }}</span>
              <span class="notice-time">{{ item.time }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()
const chartType = ref('week')
const chartRef = ref()
const vehicleChartRef = ref()
const productChartRef = ref()

const stats = reactive([
  { title: '今日订单', value: '128', icon: 'Document', color: '#409eff', compare: 12.5 },
  { title: '运输中', value: '36', icon: 'Van', color: '#67c23a', compare: -5.2 },
  { title: '今日运量(吨)', value: '4,520', icon: 'Box', color: '#e6a23c', compare: 8.3 },
  { title: '在线车辆', value: '52', icon: 'Location', color: '#f56c6c', compare: 0 }
])

const vehicleStatus = reactive([
  { label: '运输中', value: 36, percent: 58, color: '#67c23a' },
  { label: '等待装货', value: 12, percent: 19, color: '#e6a23c' },
  { label: '空闲', value: 8, percent: 13, color: '#909399' },
  { label: '离线', value: 6, percent: 10, color: '#f56c6c' }
])

const pendingItems = ref([
  { id: '1', icon: 'Document', color: '#e6a23c', content: '有 15 个订单待派单', time: '刚刚' },
  { id: '2', icon: 'Van', color: '#409eff', content: '有 8 辆车等待装货', time: '5分钟前' },
  { id: '3', icon: 'Money', color: '#67c23a', content: '有 12 笔运费待结算', time: '10分钟前' },
  { id: '4', icon: 'Warning', color: '#f56c6c', content: '有 3 个司机证件即将过期', time: '1小时前' }
])

const recentOrders = ref([
  { id: '1', orderNo: 'YS20241223001', customer: '某建筑公司', weight: 35, status: '运输中', createTime: '08:30' },
  { id: '2', orderNo: 'YS20241223002', customer: '某混凝土公司', weight: 32, status: '已签收', createTime: '08:25' },
  { id: '3', orderNo: 'YS20241223003', customer: '某工程公司', weight: 30, status: '待派单', createTime: '08:20' },
  { id: '4', orderNo: 'YS20241223004', customer: '某建材公司', weight: 34, status: '装货中', createTime: '08:15' },
  { id: '5', orderNo: 'YS20241223005', customer: '某开发商', weight: 33, status: '已完成', createTime: '08:10' }
])

const driverRank = ref([
  { name: '张三', trips: 28, percent: 100 },
  { name: '李四', trips: 25, percent: 89 },
  { name: '王五', trips: 22, percent: 79 },
  { name: '赵六', trips: 20, percent: 71 },
  { name: '钱七', trips: 18, percent: 64 }
])

const notices = ref([
  { id: '1', type: 'danger', tag: '重要', title: '系统将于今晚22:00进行升级维护', time: '12-23' },
  { id: '2', type: 'warning', tag: '通知', title: '元旦期间发货安排通知', time: '12-22' },
  { id: '3', type: 'info', tag: '公告', title: '新增过磅异常自动预警功能', time: '12-20' }
])

const getStatusType = (status: string) => {
  const map: Record<string, string> = {
    '待派单': 'info', '装货中': 'warning', '运输中': 'primary', '已签收': 'success', '已完成': 'success'
  }
  return map[status] || 'info'
}

const handlePendingClick = (item: any) => {
  if (item.content.includes('订单')) router.push('/order/list?status=pending')
  else if (item.content.includes('装货')) router.push('/dispatch/queue')
  else if (item.content.includes('运费')) router.push('/finance/settlement')
  else if (item.content.includes('证件')) router.push('/driver/list')
}

onMounted(() => {})
</script>

<style scoped>
.stat-row {
  margin-bottom: 20px;
}
.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}
.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}
.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
}
.stat-title {
  font-size: 14px;
  color: #909399;
  margin-top: 4px;
}
.stat-compare {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}
.stat-compare .up { color: #67c23a; }
.stat-compare .down { color: #f56c6c; }
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chart-container {
  height: 300px;
  background: linear-gradient(180deg, #f5f7fa 0%, #fff 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
}
.chart-container::after {
  content: '图表区域 (可集成 ECharts)';
}
.vehicle-status {
  padding: 8px 0;
}
.status-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}
.label {
  flex: 1;
  color: #606266;
}
.count {
  font-weight: 600;
  color: #303133;
  margin-right: 8px;
}
.percent {
  color: #909399;
  font-size: 13px;
}
.vehicle-chart {
  height: 120px;
  background: #f5f7fa;
  border-radius: 8px;
  margin-top: 12px;
}
.pending-list {
  max-height: 240px;
  overflow-y: auto;
}
.pending-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #ebeef5;
  cursor: pointer;
  transition: background 0.2s;
}
.pending-item:hover {
  background: #f5f7fa;
}
.pending-item:last-child {
  border-bottom: none;
}
.pending-item .content {
  flex: 1;
  margin-left: 12px;
  color: #303133;
}
.pending-item .time {
  color: #909399;
  font-size: 13px;
  margin-right: 8px;
}
.product-chart {
  height: 200px;
  background: #f5f7fa;
  border-radius: 8px;
}
.rank-list {
  padding: 8px 0;
}
.rank-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.rank-no {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ebeef5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #909399;
  margin-right: 12px;
}
.rank-no.top {
  background: #409eff;
  color: #fff;
}
.rank-name {
  width: 60px;
  color: #303133;
}
.rank-value {
  color: #606266;
  font-size: 13px;
}
.notice-list {
  padding: 8px 0;
}
.notice-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed #ebeef5;
}
.notice-item:last-child {
  border-bottom: none;
}
.notice-title {
  flex: 1;
  margin-left: 8px;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.notice-time {
  color: #909399;
  font-size: 13px;
}
</style>
