<template>
  <el-card shadow="never">
    <el-form :model="query" inline>
      <el-form-item label="车牌号">
        <el-input v-model="query.plate" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
        <el-button type="primary" @click="dialogVisible = true">新增车辆</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe style="margin-top: 16px">
      <el-table-column prop="plate" label="车牌号" width="120" />
      <el-table-column prop="type" label="车辆类型" />
      <el-table-column prop="capacity" label="载重(吨)" width="100" />
      <el-table-column prop="driver" label="绑定司机" />
      <el-table-column prop="gpsDevice" label="GPS设备号" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="statusMap[row.status]">{{ statusLabel[row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="lastLocation" label="最后位置" show-overflow-tooltip />
      <el-table-column label="操作" width="140" fixed="right">
        <template #default>
          <el-button link type="primary">编辑</el-button>
          <el-button link type="primary">定位</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 16px; justify-content: flex-end" :total="30" layout="total, prev, pager, next" />
  </el-card>
  <el-dialog v-model="dialogVisible" title="新增车辆" width="500">
    <el-form label-width="80px">
      <el-form-item label="车牌号"><el-input /></el-form-item>
      <el-form-item label="车辆类型">
        <el-select style="width: 100%">
          <el-option label="散装罐车" value="bulk" />
          <el-option label="袋装货车" value="bag" />
        </el-select>
      </el-form-item>
      <el-form-item label="载重(吨)"><el-input-number :min="1" :max="50" /></el-form-item>
      <el-form-item label="GPS设备"><el-input /></el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const query = reactive({ plate: '' })
const dialogVisible = ref(false)

const statusMap: Record<string, string> = { online: 'success', offline: 'info', running: 'primary' }
const statusLabel: Record<string, string> = { online: '在线', offline: '离线', running: '运输中' }

const tableData = ref([
  { plate: '豫A11111', type: '散装罐车', capacity: 35, driver: '张三', gpsDevice: 'GPS001', status: 'running', lastLocation: '郑州市金水区北三环' },
  { plate: '豫A22222', type: '散装罐车', capacity: 32, driver: '李四', gpsDevice: 'GPS002', status: 'online', lastLocation: '郑州市厂区' },
  { plate: '豫A33333', type: '袋装货车', capacity: 30, driver: '王五', gpsDevice: 'GPS003', status: 'offline', lastLocation: '郑州市中原区' },
  { plate: '豫A44444', type: '散装罐车', capacity: 35, driver: '赵六', gpsDevice: 'GPS004', status: 'running', lastLocation: '郑州市惠济区' }
])
</script>


