import { mockVehicles, mock } from '@/mock'
import type { Vehicle } from '@/types'

export interface VehicleQuery {
  plateNo?: string
  type?: string
  status?: string
  page: number
  size: number
}

const filterVehicles = (params: VehicleQuery) => {
  let list = [...mockVehicles]
  if (params.plateNo) list = list.filter(v => v.plateNo.includes(params.plateNo!))
  if (params.type) list = list.filter(v => v.type === params.type)
  if (params.status) list = list.filter(v => v.status === params.status)
  return list
}

export const vehicleApi = {
  list: async (params: VehicleQuery) => {
    await mock.delay()
    const list = filterVehicles(params)
    const start = (params.page - 1) * params.size
    return { code: 200, data: { list: list.slice(start, start + params.size), total: list.length } }
  },
  detail: async (id: string) => {
    await mock.delay()
    return { code: 200, data: mockVehicles.find(v => v.id === id) }
  },
  create: async (data: Partial<Vehicle>) => {
    await mock.delay()
    const newVehicle = { ...data, id: String(Date.now()) } as Vehicle
    mockVehicles.unshift(newVehicle)
    return { code: 200, data: newVehicle }
  },
  update: async (id: string, data: Partial<Vehicle>) => {
    await mock.delay()
    const idx = mockVehicles.findIndex(v => v.id === id)
    if (idx > -1) Object.assign(mockVehicles[idx], data)
    return { code: 200, data: mockVehicles[idx] }
  },
  delete: async (id: string) => {
    await mock.delay()
    const idx = mockVehicles.findIndex(v => v.id === id)
    if (idx > -1) mockVehicles.splice(idx, 1)
    return { code: 200 }
  },
  available: async () => {
    await mock.delay()
    return { code: 200, data: mockVehicles.filter(v => v.status === 'idle') }
  }
}
