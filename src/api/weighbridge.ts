import { mockWeighRecords, mock } from '@/mock'

export interface WeighQuery {
  orderNo?: string
  vehiclePlate?: string
  startDate?: string
  endDate?: string
  page: number
  size: number
}

const filterRecords = (params: WeighQuery) => {
  let list = [...mockWeighRecords]
  if (params.orderNo) list = list.filter(r => r.orderNo.includes(params.orderNo!))
  if (params.vehiclePlate) list = list.filter(r => r.vehiclePlate.includes(params.vehiclePlate!))
  return list
}

export const weighbridgeApi = {
  list: async (params: WeighQuery) => {
    await mock.delay()
    const list = filterRecords(params)
    const start = (params.page - 1) * params.size
    return { code: 200, data: { list: list.slice(start, start + params.size), total: list.length } }
  },
  detail: async (id: string) => {
    await mock.delay()
    return { code: 200, data: mockWeighRecords.find(r => r.id === id) }
  },
  todaySummary: async () => {
    await mock.delay()
    return {
      code: 200,
      data: {
        totalCount: mockWeighRecords.length,
        totalWeight: mockWeighRecords.reduce((sum, r) => sum + r.netWeight, 0)
      }
    }
  }
}


