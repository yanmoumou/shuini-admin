import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'

export const formatDate = (date: string | Date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return date ? dayjs(date).format(format) : ''
}

export const formatMoney = (value: number, decimals = 2) => {
  return value?.toLocaleString('zh-CN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) ?? '0'
}

export const formatWeight = (value: number) => {
  return value?.toFixed(2) ?? '0'
}

export const confirm = (message: string, title = '提示') => {
  return ElMessageBox.confirm(message, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}

export const success = (message: string) => ElMessage.success(message)
export const error = (message: string) => ElMessage.error(message)
export const warning = (message: string) => ElMessage.warning(message)

export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

export const debounce = <T extends (...args: any[]) => any>(fn: T, delay = 300) => {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export const statusColorMap: Record<string, string> = {
  pending: 'info',
  dispatched: 'warning', 
  loading: 'warning',
  transporting: 'primary',
  arrived: 'primary',
  signed: 'success',
  completed: 'success',
  cancelled: 'danger',
  active: 'success',
  inactive: 'info',
  online: 'success',
  offline: 'info',
  running: 'primary',
  maintenance: 'warning',
  own: 'primary',
  external: 'warning'
}

export const orderStatusOptions = [
  { value: 'pending', label: '待派单' },
  { value: 'dispatched', label: '已派单' },
  { value: 'loading', label: '装货中' },
  { value: 'transporting', label: '运输中' },
  { value: 'arrived', label: '已到达' },
  { value: 'signed', label: '已签收' },
  { value: 'completed', label: '已完成' },
  { value: 'cancelled', label: '已取消' }
]

export const vehicleTypeOptions = [
  { value: 'bulk', label: '散装罐车' },
  { value: 'bag', label: '袋装货车' }
]

export const driverTypeOptions = [
  { value: 'own', label: '自有司机' },
  { value: 'external', label: '外协司机' }
]

export const productOptions = [
  { value: 'P.O42.5', label: 'P.O42.5', price: 450 },
  { value: 'P.O52.5', label: 'P.O52.5', price: 520 },
  { value: 'P.C32.5', label: 'P.C32.5', price: 380 },
  { value: 'P.S.A32.5', label: 'P.S.A32.5', price: 360 }
]

