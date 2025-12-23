import { mockDrivers, mock } from '@/mock'
import type { Driver } from '@/types'

export interface DriverQuery {
  name?: string
  phone?: string
  type?: string
  status?: string
  page: number
  size: number
}

const filterDrivers = (params: DriverQuery) => {
  let list = [...mockDrivers]
  if (params.name) list = list.filter(d => d.name.includes(params.name!))
  if (params.type) list = list.filter(d => d.type === params.type)
  if (params.status) list = list.filter(d => d.status === params.status)
  return list
}

export const driverApi = {
  list: async (params: DriverQuery) => {
    await mock.delay()
    const list = filterDrivers(params)
    const start = (params.page - 1) * params.size
    return { code: 200, data: { list: list.slice(start, start + params.size), total: list.length } }
  },
  detail: async (id: string) => {
    await mock.delay()
    return { code: 200, data: mockDrivers.find(d => d.id === id) }
  },
  create: async (data: Partial<Driver>) => {
    await mock.delay()
    const newDriver = { ...data, id: String(Date.now()) } as Driver
    mockDrivers.unshift(newDriver)
    return { code: 200, data: newDriver }
  },
  update: async (id: string, data: Partial<Driver>) => {
    await mock.delay()
    const idx = mockDrivers.findIndex(d => d.id === id)
    if (idx > -1) Object.assign(mockDrivers[idx], data)
    return { code: 200, data: mockDrivers[idx] }
  },
  delete: async (id: string) => {
    await mock.delay()
    const idx = mockDrivers.findIndex(d => d.id === id)
    if (idx > -1) mockDrivers.splice(idx, 1)
    return { code: 200 }
  },
  available: async () => {
    await mock.delay()
    return { code: 200, data: mockDrivers.filter(d => d.status === 'idle') }
  }
}
