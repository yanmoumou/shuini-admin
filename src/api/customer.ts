import { mockCustomers, mock } from '@/mock'
import type { Customer } from '@/types'

export interface CustomerQuery {
  name?: string
  status?: string
  level?: string
  page: number
  size: number
}

const filterCustomers = (params: CustomerQuery) => {
  let list = [...mockCustomers]
  if (params.name) list = list.filter(c => c.name.includes(params.name!) || c.shortName?.includes(params.name!))
  if (params.status) list = list.filter(c => c.status === params.status)
  if (params.level) list = list.filter(c => c.level === params.level)
  return list
}

export const customerApi = {
  list: async (params: CustomerQuery) => {
    await mock.delay()
    const list = filterCustomers(params)
    const start = (params.page - 1) * params.size
    return { code: 200, data: { list: list.slice(start, start + params.size), total: list.length } }
  },
  detail: async (id: string) => {
    await mock.delay()
    return { code: 200, data: mockCustomers.find(c => c.id === id) }
  },
  create: async (data: Partial<Customer>) => {
    await mock.delay()
    const newCustomer = { ...data, id: String(Date.now()), createTime: new Date().toLocaleString() } as Customer
    mockCustomers.unshift(newCustomer)
    return { code: 200, data: newCustomer }
  },
  update: async (id: string, data: Partial<Customer>) => {
    await mock.delay()
    const idx = mockCustomers.findIndex(c => c.id === id)
    if (idx > -1) Object.assign(mockCustomers[idx], data)
    return { code: 200, data: mockCustomers[idx] }
  },
  delete: async (id: string) => {
    await mock.delay()
    const idx = mockCustomers.findIndex(c => c.id === id)
    if (idx > -1) mockCustomers.splice(idx, 1)
    return { code: 200 }
  },
  all: async () => {
    await mock.delay()
    return { code: 200, data: mockCustomers }
  }
}
