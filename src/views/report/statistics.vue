<template>
  <div class="statistics">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in summaryCards" :key="item.title">
        <el-card shadow="hover" class="summary-card">
          <div class="summary-content">
            <div class="summary-value" :style="{ color: item.color }">{{ item.value }}</div>
            <div class="summary-title">{{ item.title }}</div>
            <div class="summary-compare">
              较上月 <span :class="item.trend > 0 ? 'up' : 'down'">{{ item.trend > 0 ? '+' : '' }}{{ item.trend }}%</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <div class="chart-header">
              <span>运量趋势</span>
              <el-radio-group v-model="chartType" size="small">
                <el-radio-button value="week">近7天</el-radio-button>
                <el-radio-button value="month">近30天</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-placeholder">图表区域 (可集成 ECharts)</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>品种分布</template>
          <div class="product-list">
            <div class="product-item" v-for="item in productStats" :key="item.name">
              <div class="product-info">
                <span class="name">{{ item.name }}</span>
                <span class="percent">{{ item.percent }}%</span>
              </div>
              <el-progress :percentage="item.percent" :show-text="false" :color="item.color" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>司机排行 TOP10</template>
          <el-table :data="driverRank" stripe size="small">
            <el-table-column type="index" label="排名" width="60" />
            <el-table-column prop="name" label="司机" />
            <el-table-column prop="trips" label="趟次" />
            <el-table-column prop="weight" label="吨数" />
            <el-table-column prop="amount" label="运费(元)" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>客户排行 TOP10</template>
          <el-table :data="customerRank" stripe size="small">
            <el-table-column type="index" label="排名" width="60" />
            <el-table-column prop="name" label="客户" />
            <el-table-column prop="orders" label="订单数" />
            <el-table-column prop="weight" label="吨数" />
            <el-table-column prop="amount" label="金额(元)" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const chartType = ref('week')

const summaryCards = [
  { title: '本月订单', value: '3,256', color: '#409eff', trend: 12.5 },
  { title: '本月运量(吨)', value: '113,960', color: '#67c23a', trend: 8.3 },
  { title: '本月运费(万)', value: '170.94', color: '#e6a23c', trend: 10.2 },
  { title: '活跃车辆', value: '52', color: '#f56c6c', trend: -2.1 }
]

const productStats = [
  { name: 'P.O42.5', percent: 45, color: '#409eff' },
  { name: 'P.C32.5', percent: 30, color: '#67c23a' },
  { name: 'P.O52.5', percent: 15, color: '#e6a23c' },
  { name: '其他', percent: 10, color: '#909399' }
]

const driverRank = [
  { name: '张三', trips: 85, weight: 2975, amount: 44625 },
  { name: '李四', trips: 78, weight: 2730, amount: 40950 },
  { name: '王五', trips: 72, weight: 2520, amount: 37800 },
  { name: '赵六', trips: 68, weight: 2380, amount: 35700 },
  { name: '钱七', trips: 65, weight: 2275, amount: 34125 }
]

const customerRank = [
  { name: '某混凝土公司', orders: 320, weight: 11200, amount: 1680000 },
  { name: '某建筑公司', orders: 280, weight: 9800, amount: 1470000 },
  { name: '某工程公司', orders: 210, weight: 7350, amount: 1102500 },
  { name: '某建材公司', orders: 180, weight: 6300, amount: 945000 },
  { name: '某开发商', orders: 150, weight: 5250, amount: 787500 }
]
</script>

<style scoped>
.summary-card :deep(.el-card__body) {
  padding: 20px;
}
.summary-value {
  font-size: 32px;
  font-weight: 600;
}
.summary-title {
  font-size: 14px;
  color: #606266;
  margin-top: 8px;
}
.summary-compare {
  font-size: 13px;
  color: #909399;
  margin-top: 8px;
}
.summary-compare .up {
  color: #67c23a;
}
.summary-compare .down {
  color: #f56c6c;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  border-radius: 8px;
  color: #909399;
}
.product-list {
  padding: 10px 0;
}
.product-item {
  margin-bottom: 20px;
}
.product-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.product-info .name {
  color: #303133;
}
.product-info .percent {
  color: #909399;
}
</style>


