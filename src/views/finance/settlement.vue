<template>
  <div class="settlement">
    <el-card shadow="never">
      <el-form :model="query" inline>
        <el-form-item label="司机">
          <el-input v-model="query.driver" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="query.dateRange" type="daterange" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="query.status" placeholder="请选择" clearable>
            <el-option label="待结算" value="pending" />
            <el-option label="已结算" value="settled" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" style="margin-top: 16px">
      <template #header>
        <div class="card-header">
          <span>运费结算</span>
          <el-button type="primary" @click="handleBatchSettle">批量结算</el-button>
        </div>
      </template>
      <el-table :data="tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="driver" label="司机" width="100" />
        <el-table-column prop="vehicle" label="车牌号" width="120" />
        <el-table-column prop="trips" label="趟次" width="80" />
        <el-table-column prop="weight" label="总吨数" width="100" />
        <el-table-column prop="amount" label="运费(元)" width="120">
          <template #default="{ row }">
            <span style="color: #f56c6c; font-weight: 600">¥{{ row.amount.toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="period" label="结算周期" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 'pending' ? 'warning' : 'success'">{{ row.status === 'pending' ? '待结算' : '已结算' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary">明细</el-button>
            <el-button link type="primary" v-if="row.status === 'pending'">结算</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 16px; justify-content: flex-end" :total="50" layout="total, prev, pager, next" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const query = reactive({ driver: '', dateRange: [], status: '' })
const selectedRows = ref<any[]>([])

const tableData = ref([
  { driver: '张三', vehicle: '豫A11111', trips: 28, weight: 980, amount: 14700, period: '2024-12-01 ~ 2024-12-15', status: 'pending' },
  { driver: '李四', vehicle: '豫A22222', trips: 25, weight: 875, amount: 13125, period: '2024-12-01 ~ 2024-12-15', status: 'pending' },
  { driver: '王五', vehicle: '豫A33333', trips: 30, weight: 1050, amount: 15750, period: '2024-12-01 ~ 2024-12-15', status: 'settled' },
  { driver: '赵六', vehicle: '豫A44444', trips: 22, weight: 770, amount: 11550, period: '2024-11-16 ~ 2024-11-30', status: 'settled' }
])

const handleSelectionChange = (val: any[]) => {
  selectedRows.value = val
}

const handleBatchSettle = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请选择要结算的记录')
    return
  }
  ElMessage.success(`已结算 ${selectedRows.value.length} 条记录`)
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>


