<template>
  <div class="dispatch-queue">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>
            <div class="queue-header">
              <span>等待队列</span>
              <el-tag>{{ waitingQueue.length }} 辆</el-tag>
            </div>
          </template>
          <div class="queue-list">
            <div class="queue-item" v-for="(item, index) in waitingQueue" :key="item.id">
              <div class="queue-no">{{ index + 1 }}</div>
              <div class="queue-info">
                <div class="plate">{{ item.plate }}</div>
                <div class="driver">{{ item.driver }} | {{ item.arriveTime }}</div>
              </div>
              <el-button type="primary" size="small" @click="handleCall(item)">叫号</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>
            <div class="queue-header">
              <span>装货中</span>
              <el-tag type="success">{{ loadingQueue.length }} 辆</el-tag>
            </div>
          </template>
          <div class="queue-list">
            <div class="queue-item loading" v-for="item in loadingQueue" :key="item.id">
              <div class="queue-info">
                <div class="plate">{{ item.plate }}</div>
                <div class="driver">{{ item.driver }} | {{ item.product }}</div>
              </div>
              <el-button type="success" size="small" @click="handleFinish(item)">完成</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>今日统计</template>
          <div class="today-stats">
            <div class="stat-item">
              <div class="label">已完成</div>
              <div class="value">86</div>
            </div>
            <div class="stat-item">
              <div class="label">运量(吨)</div>
              <div class="value">2,890</div>
            </div>
            <div class="stat-item">
              <div class="label">平均等待</div>
              <div class="value">23分钟</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const waitingQueue = ref([
  { id: '1', plate: '豫A11111', driver: '张三', arriveTime: '09:30' },
  { id: '2', plate: '豫A22222', driver: '李四', arriveTime: '09:35' },
  { id: '3', plate: '豫A33333', driver: '王五', arriveTime: '09:40' },
  { id: '4', plate: '豫A44444', driver: '赵六', arriveTime: '09:45' }
])

const loadingQueue = ref([
  { id: '5', plate: '豫A55555', driver: '钱七', product: 'P.O42.5' },
  { id: '6', plate: '豫A66666', driver: '孙八', product: 'P.C32.5' }
])

const handleCall = (item: any) => {
  ElMessage.success(`已叫号: ${item.plate}`)
}
const handleFinish = (item: any) => {
  ElMessage.success(`装货完成: ${item.plate}`)
}
</script>

<style scoped>
.queue-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.queue-list {
  max-height: 500px;
  overflow-y: auto;
}
.queue-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  margin-bottom: 8px;
}
.queue-item.loading {
  background: #f0f9eb;
  border-color: #c2e7b0;
}
.queue-no {
  width: 32px;
  height: 32px;
  background: #409eff;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 12px;
}
.queue-info {
  flex: 1;
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
.today-stats {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
}
.stat-item .label {
  color: #606266;
}
.stat-item .value {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}
</style>


