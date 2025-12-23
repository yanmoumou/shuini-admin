export interface Order {
  id: string
  orderNo: string
  customerId?: string
  customerName?: string
  productId?: string
  productName?: string
  quantity?: number
  unit?: string
  deliveryAddress?: string
  contactName?: string
  contactPhone?: string
  driverId?: string
  driverName?: string
  vehicleId?: string
  vehiclePlate?: string
  status: string
  freightPrice?: number
  freightAmount?: number
  createTime?: string
  dispatchTime?: string
  loadTime?: string
  deliveryTime?: string
}

export type OrderStatus = 'pending' | 'dispatched' | 'loading' | 'transporting' | 'arrived' | 'signed' | 'completed' | 'cancelled'

export interface Driver {
  id: string
  name: string
  phone: string
  idCard?: string
  type: string
  status: string
  vehicleId?: string
  vehiclePlate?: string
  licenseNo?: string
  licenseExpiry?: string
  joinDate?: string
  totalOrders?: number
  monthOrders?: number
  totalAmount?: number
  monthAmount?: number
}

export interface Vehicle {
  id: string
  plateNo: string
  type: string
  brand?: string
  model?: string
  capacity: number
  status: string
  driverId?: string
  driverName?: string
  buyDate?: string
  insuranceExpiry?: string
  inspectionExpiry?: string
}

export interface Customer {
  id: string
  name: string
  shortName?: string
  contactName?: string
  contactPhone?: string
  address?: string
  creditLimit?: number
  balance?: number
  status?: string
  level?: string
  createTime?: string
}

export interface Weighbridge {
  id: string
  name: string
  code: string
  location: string
  status: 'online' | 'offline'
  lastWeight?: number
  lastUpdateTime?: string
}

export interface Settlement {
  id: string
  driverId: string
  driverName: string
  vehiclePlate: string
  periodStart: string
  periodEnd: string
  trips: number
  totalWeight: number
  totalAmount: number
  deduction: number
  actualAmount: number
  status: 'pending' | 'confirmed' | 'paid'
  paidTime?: string
  createTime: string
}

export interface User {
  id: string
  username: string
  nickname?: string
  phone?: string
  email?: string
  roleId?: string
  roleName?: string
  status?: string
  createTime?: string
}

export interface Role {
  id: string
  name: string
  code: string
  description?: string
  permissions?: string[]
  createTime?: string
}

export interface MenuItem {
  path: string
  name: string
  meta: {
    title: string
    icon?: string
    hidden?: boolean
    permissions?: string[]
  }
  children?: MenuItem[]
}

export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  size: number
}

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

