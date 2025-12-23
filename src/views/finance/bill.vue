<template>
  <el-card shadow="never">
    <el-form :model="query" inline>
      <el-form-item label="客户">
        <el-input v-model="query.customer" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="月份">
        <el-date-picker v-model="query.month" type="month" value-format="YYYY-MM" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe style="margin-top: 16px">
      <el-table-column prop="customer" label="客户名称" />
      <el-table-column prop="month" label="账单月份" width="120" />
      <el-table-column prop="orderCount" label="订单数" width="100" />
      <el-table-column prop="totalWeight" label="总吨数" width="100" />
      <el-table-column prop="totalAmount" label="账单金额(元)">
        <template #default="{ row }">
          <span style="color: #409eff; font-weight: 600">¥{{ row.totalAmount.toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="paidAmount" label="已付金额(元)">
        <template #default="{ row }">
          <span style="color: #67c23a">¥{{ row.paidAmount.toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status === 'paid' ? 'success' : 'warning'">{{ row.status === 'paid' ? '已结清' : '未结清' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" fixed="right">
        <template #default>
          <el-button link type="primary">详情</el-button>
          <el-button link type="primary">导出</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 16px; justify-content: flex-end" :total="30" layout="total, prev, pager, next" />
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const query = reactive({ customer: '', month: '' })

const tableData = ref([
  { customer: '某建筑公司', month: '2024-12', orderCount: 86, totalWeight: 3010, totalAmount: 451500, paidAmount: 200000, status: 'unpaid' },
  { customer: '某混凝土公司', month: '2024-12', orderCount: 120, totalWeight: 4200, totalAmount: 630000, paidAmount: 630000, status: 'paid' },
  { customer: '某工程公司', month: '2024-11', orderCount: 95, totalWeight: 3325, totalAmount: 498750, paidAmount: 498750, status: 'paid' }
])
</script>


