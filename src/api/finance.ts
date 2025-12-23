import { mockSettlements, mock } from '@/mock'

export interface SettlementQuery {
  driverName?: string
  period?: string
  status?: string
  page: number
  size: number
}

const filterSettlements = (params: SettlementQuery) => {
  let list = [...mockSettlements]
  if (params.driverName) list = list.filter(s => s.driverName.includes(params.driverName!))
  if (params.period) list = list.filter(s => s.period.includes(params.period!))
  if (params.status) list = list.filter(s => s.status === params.status)
  return list
}

export const financeApi = {
  settlementList: async (params: SettlementQuery) => {
    await mock.delay()
    const list = filterSettlements(params)
    const start = (params.page - 1) * params.size
    return { code: 200, data: { list: list.slice(start, start + params.size), total: list.length } }
  },
  settle: async (id: string) => {
    await mock.delay()
    const settlement = mockSettlements.find(s => s.id === id)
    if (settlement) {
      settlement.status = 'settled'
      settlement.settleTime = new Date().toLocaleDateString()
    }
    return { code: 200 }
  },
  summary: async () => {
    await mock.delay()
    return {
      code: 200,
      data: {
        pendingCount: mockSettlements.filter(s => s.status === 'pending').length,
        pendingAmount: mockSettlements.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.actualAmount, 0),
        settledCount: mockSettlements.filter(s => s.status === 'settled').length,
        settledAmount: mockSettlements.filter(s => s.status === 'settled').reduce((sum, s) => sum + s.actualAmount, 0)
      }
    }
  }
}
