import { mockOrders, mock } from '@/mock'
import type { Order } from '@/types'

export interface OrderQuery {
  orderNo?: string
  customerId?: string
  driverId?: string
  status?: string
  startDate?: string
  endDate?: string
  page: number
  size: number
}

const filterOrders = (params: OrderQuery) => {
  let list = [...mockOrders]
  if (params.orderNo) list = list.filter(o => o.orderNo.includes(params.orderNo!))
  if (params.status) list = list.filter(o => o.status === params.status)
  if (params.customerId) list = list.filter(o => o.customerId === params.customerId)
  return list
}

export const orderApi = {
  list: async (params: OrderQuery) => {
    await mock.delay()
    const list = filterOrders(params)
    const start = (params.page - 1) * params.size
    return { code: 200, data: { list: list.slice(start, start + params.size), total: list.length } }
  },
  detail: async (id: string) => {
    await mock.delay()
    return { code: 200, data: mockOrders.find(o => o.id === id) }
  },
  create: async (data: Partial<Order>) => {
    await mock.delay()
    const newOrder = { ...data, id: String(Date.now()), orderNo: `OD${Date.now()}`, status: 'pending', createTime: new Date().toLocaleString() } as Order
    mockOrders.unshift(newOrder)
    return { code: 200, data: newOrder }
  },
  update: async (id: string, data: Partial<Order>) => {
    await mock.delay()
    const idx = mockOrders.findIndex(o => o.id === id)
    if (idx > -1) Object.assign(mockOrders[idx], data)
    return { code: 200, data: mockOrders[idx] }
  },
  delete: async (id: string) => {
    await mock.delay()
    const idx = mockOrders.findIndex(o => o.id === id)
    if (idx > -1) mockOrders.splice(idx, 1)
    return { code: 200 }
  },
  dispatch: async (id: string, data: { driverId: string; vehicleId: string }) => {
    await mock.delay()
    const order = mockOrders.find(o => o.id === id)
    if (order) {
      order.status = 'dispatched'
      order.driverId = data.driverId
      order.vehicleId = data.vehicleId
      order.dispatchTime = new Date().toLocaleString()
    }
    return { code: 200 }
  },
  cancel: async (id: string) => {
    await mock.delay()
    const order = mockOrders.find(o => o.id === id)
    if (order) order.status = 'cancelled'
    return { code: 200 }
  }
}
