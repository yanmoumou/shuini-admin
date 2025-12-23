import type { Order, Driver, Vehicle, Customer, User, Role } from '@/types'

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms))

export const mockOrders: Order[] = [
  { id: '1', orderNo: 'OD20241223001', customerId: '1', customerName: '华夏建设集团', productId: '1', productName: 'P.O 42.5水泥', quantity: 50, unit: '吨', deliveryAddress: '北京市朝阳区建国路88号工地', contactName: '王经理', contactPhone: '13800138001', driverId: '1', driverName: '张师傅', vehicleId: '1', vehiclePlate: '京A12345', status: 'completed', freightPrice: 80, freightAmount: 4000, createTime: '2024-12-23 08:30:00', dispatchTime: '2024-12-23 09:00:00', loadTime: '2024-12-23 09:30:00', deliveryTime: '2024-12-23 11:00:00' },
  { id: '2', orderNo: 'OD20241223002', customerId: '2', customerName: '远东房地产', productId: '2', productName: 'P.C 32.5水泥', quantity: 35, unit: '吨', deliveryAddress: '北京市海淀区中关村大厦项目', contactName: '李工', contactPhone: '13900139002', driverId: '2', driverName: '李师傅', vehicleId: '2', vehiclePlate: '京B67890', status: 'transporting', freightPrice: 75, freightAmount: 2625, createTime: '2024-12-23 09:00:00', dispatchTime: '2024-12-23 09:30:00', loadTime: '2024-12-23 10:00:00' },
  { id: '3', orderNo: 'OD20241223003', customerId: '3', customerName: '中建八局', productId: '1', productName: 'P.O 42.5水泥', quantity: 60, unit: '吨', deliveryAddress: '北京市通州区副中心项目', contactName: '赵总', contactPhone: '13700137003', driverId: '3', driverName: '王师傅', vehicleId: '3', vehiclePlate: '京C11111', status: 'loading', freightPrice: 85, freightAmount: 5100, createTime: '2024-12-23 09:30:00', dispatchTime: '2024-12-23 10:00:00' },
  { id: '4', orderNo: 'OD20241223004', customerId: '1', customerName: '华夏建设集团', productId: '3', productName: 'P.S 42.5矿�ite水泥', quantity: 40, unit: '吨', deliveryAddress: '北京市大兴区机场项目', contactName: '王经理', contactPhone: '13800138001', status: 'dispatched', freightPrice: 90, freightAmount: 3600, createTime: '2024-12-23 10:00:00', dispatchTime: '2024-12-23 10:30:00' },
  { id: '5', orderNo: 'OD20241223005', customerId: '4', customerName: '万科地产', productId: '1', productName: 'P.O 42.5水泥', quantity: 45, unit: '吨', deliveryAddress: '北京市丰台区万科城项目', contactName: '孙经理', contactPhone: '13600136004', status: 'pending', freightPrice: 78, freightAmount: 3510, createTime: '2024-12-23 10:30:00' },
  { id: '6', orderNo: 'OD20241222001', customerId: '2', customerName: '远东房地产', productId: '2', productName: 'P.C 32.5水泥', quantity: 55, unit: '吨', deliveryAddress: '北京市西城区金融街项目', contactName: '李工', contactPhone: '13900139002', driverId: '1', driverName: '张师傅', vehicleId: '1', vehiclePlate: '京A12345', status: 'completed', freightPrice: 82, freightAmount: 4510, createTime: '2024-12-22 08:00:00', dispatchTime: '2024-12-22 08:30:00', loadTime: '2024-12-22 09:00:00', deliveryTime: '2024-12-22 11:30:00' },
  { id: '7', orderNo: 'OD20241222002', customerId: '5', customerName: '碧桂园', productId: '1', productName: 'P.O 42.5水泥', quantity: 70, unit: '吨', deliveryAddress: '河北廊坊碧桂园项目', contactName: '周总', contactPhone: '13500135005', driverId: '4', driverName: '刘师傅', vehicleId: '4', vehiclePlate: '冀A22222', status: 'completed', freightPrice: 95, freightAmount: 6650, createTime: '2024-12-22 09:00:00', dispatchTime: '2024-12-22 09:30:00', loadTime: '2024-12-22 10:00:00', deliveryTime: '2024-12-22 13:00:00' },
  { id: '8', orderNo: 'OD20241221001', customerId: '3', customerName: '中建八局', productId: '1', productName: 'P.O 42.5水泥', quantity: 80, unit: '吨', deliveryAddress: '天津滨海新区项目', contactName: '赵总', contactPhone: '13700137003', driverId: '5', driverName: '陈师傅', vehicleId: '5', vehiclePlate: '津A33333', status: 'completed', freightPrice: 100, freightAmount: 8000, createTime: '2024-12-21 07:30:00', dispatchTime: '2024-12-21 08:00:00', loadTime: '2024-12-21 08:30:00', deliveryTime: '2024-12-21 12:00:00' }
]

export const mockDrivers: Driver[] = [
  { id: '1', name: '张师傅', phone: '13800138101', idCard: '110101199001011234', type: 'own', status: 'working', vehicleId: '1', vehiclePlate: '京A12345', licenseNo: 'A2123456', licenseExpiry: '2026-05-15', joinDate: '2020-03-01', totalOrders: 856, monthOrders: 45, totalAmount: 68000, monthAmount: 4500 },
  { id: '2', name: '李师傅', phone: '13800138102', idCard: '110101198505052345', type: 'own', status: 'working', vehicleId: '2', vehiclePlate: '京B67890', licenseNo: 'A2234567', licenseExpiry: '2025-08-20', joinDate: '2019-06-15', totalOrders: 1024, monthOrders: 52, totalAmount: 82000, monthAmount: 5200 },
  { id: '3', name: '王师傅', phone: '13800138103', idCard: '110101199203033456', type: 'own', status: 'loading', vehicleId: '3', vehiclePlate: '京C11111', licenseNo: 'A2345678', licenseExpiry: '2027-01-10', joinDate: '2021-01-20', totalOrders: 428, monthOrders: 38, totalAmount: 34000, monthAmount: 3800 },
  { id: '4', name: '刘师傅', phone: '13800138104', idCard: '130102199108084567', type: 'external', status: 'idle', vehicleId: '4', vehiclePlate: '冀A22222', licenseNo: 'A2456789', licenseExpiry: '2025-12-01', joinDate: '2022-04-10', totalOrders: 312, monthOrders: 28, totalAmount: 25000, monthAmount: 2800 },
  { id: '5', name: '陈师傅', phone: '13800138105', idCard: '120101198712125678', type: 'external', status: 'idle', vehicleId: '5', vehiclePlate: '津A33333', licenseNo: 'A2567890', licenseExpiry: '2026-03-25', joinDate: '2022-08-01', totalOrders: 256, monthOrders: 22, totalAmount: 20000, monthAmount: 2200 },
  { id: '6', name: '赵师傅', phone: '13800138106', idCard: '110101199505056789', type: 'own', status: 'offline', vehicleId: '6', vehiclePlate: '京D44444', licenseNo: 'A2678901', licenseExpiry: '2025-06-30', joinDate: '2023-02-15', totalOrders: 156, monthOrders: 18, totalAmount: 12000, monthAmount: 1800 }
]

export const mockVehicles: Vehicle[] = [
  { id: '1', plateNo: '京A12345', type: 'bulk', brand: '解放', model: 'J6P', capacity: 35, status: 'working', driverId: '1', driverName: '张师傅', buyDate: '2020-01-15', insuranceExpiry: '2025-06-30', inspectionExpiry: '2025-03-15' },
  { id: '2', plateNo: '京B67890', type: 'bulk', brand: '东风', model: '天龙', capacity: 32, status: 'working', driverId: '2', driverName: '李师傅', buyDate: '2019-05-20', insuranceExpiry: '2025-05-20', inspectionExpiry: '2025-02-20' },
  { id: '3', plateNo: '京C11111', type: 'bulk', brand: '陕汽', model: '德龙X3000', capacity: 38, status: 'loading', driverId: '3', driverName: '王师傅', buyDate: '2021-03-10', insuranceExpiry: '2025-09-10', inspectionExpiry: '2025-06-10' },
  { id: '4', plateNo: '冀A22222', type: 'bag', brand: '重汽', model: '豪沃', capacity: 30, status: 'idle', driverId: '4', driverName: '刘师傅', buyDate: '2022-02-28', insuranceExpiry: '2025-08-28', inspectionExpiry: '2025-05-28' },
  { id: '5', plateNo: '津A33333', type: 'bulk', brand: '福田', model: '欧曼', capacity: 33, status: 'idle', driverId: '5', driverName: '陈师傅', buyDate: '2022-07-15', insuranceExpiry: '2025-07-15', inspectionExpiry: '2025-04-15' },
  { id: '6', plateNo: '京D44444', type: 'bag', brand: '解放', model: 'J7', capacity: 28, status: 'maintenance', driverId: '6', driverName: '赵师傅', buyDate: '2023-01-20', insuranceExpiry: '2026-01-20', inspectionExpiry: '2025-10-20' }
]

export const mockCustomers: Customer[] = [
  { id: '1', name: '华夏建设集团', shortName: '华夏建设', contactName: '王经理', contactPhone: '13800138001', address: '北京市朝阳区建国路88号', creditLimit: 500000, balance: 125000, status: 'normal', level: 'vip', createTime: '2020-01-15' },
  { id: '2', name: '远东房地产开发有限公司', shortName: '远东地产', contactName: '李工', contactPhone: '13900139002', address: '北京市海淀区中关村南大街1号', creditLimit: 300000, balance: 85000, status: 'normal', level: 'normal', createTime: '2020-03-20' },
  { id: '3', name: '中国建筑第八工程局', shortName: '中建八局', contactName: '赵总', contactPhone: '13700137003', address: '北京市东城区东直门内大街5号', creditLimit: 1000000, balance: 320000, status: 'normal', level: 'vip', createTime: '2019-06-10' },
  { id: '4', name: '万科企业股份有限公司', shortName: '万科地产', contactName: '孙经理', contactPhone: '13600136004', address: '北京市丰台区南四环西路188号', creditLimit: 800000, balance: 210000, status: 'normal', level: 'vip', createTime: '2019-09-15' },
  { id: '5', name: '碧桂园控股有限公司', shortName: '碧桂园', contactName: '周总', contactPhone: '13500135005', address: '河北省廊坊市广阳区新华路100号', creditLimit: 600000, balance: 180000, status: 'normal', level: 'normal', createTime: '2021-02-28' },
  { id: '6', name: '保利发展控股集团', shortName: '保利地产', contactName: '吴经理', contactPhone: '13400134006', address: '北京市西城区金融街28号', creditLimit: 700000, balance: 95000, status: 'warning', level: 'vip', createTime: '2020-08-12' }
]

export const mockUsers: User[] = [
  { id: '1', username: 'admin', nickname: '系统管理员', phone: '13800000001', email: 'admin@cement.com', roleId: '1', roleName: '超级管理员', status: 'active', createTime: '2020-01-01' },
  { id: '2', username: 'dispatch', nickname: '调度员小王', phone: '13800000002', email: 'dispatch@cement.com', roleId: '2', roleName: '调度员', status: 'active', createTime: '2021-03-15' },
  { id: '3', username: 'finance', nickname: '财务张姐', phone: '13800000003', email: 'finance@cement.com', roleId: '3', roleName: '财务人员', status: 'active', createTime: '2021-05-20' },
  { id: '4', username: 'operator', nickname: '操作员小李', phone: '13800000004', email: 'operator@cement.com', roleId: '4', roleName: '操作员', status: 'active', createTime: '2022-01-10' },
  { id: '5', username: 'viewer', nickname: '访客账号', phone: '13800000005', email: 'viewer@cement.com', roleId: '5', roleName: '访客', status: 'disabled', createTime: '2023-06-01' }
]

export const mockRoles: Role[] = [
  { id: '1', name: '超级管理员', code: 'admin', description: '拥有系统全部权限', permissions: ['*'], createTime: '2020-01-01' },
  { id: '2', name: '调度员', code: 'dispatch', description: '负责订单调度和车辆管理', permissions: ['order:*', 'driver:*', 'vehicle:*', 'dispatch:*'], createTime: '2020-01-01' },
  { id: '3', name: '财务人员', code: 'finance', description: '负责财务结算和报表', permissions: ['order:view', 'finance:*', 'report:*'], createTime: '2020-01-01' },
  { id: '4', name: '操作员', code: 'operator', description: '负责日常订单操作', permissions: ['order:view', 'order:create', 'order:edit'], createTime: '2020-01-01' },
  { id: '5', name: '访客', code: 'viewer', description: '只能查看信息', permissions: ['order:view', 'driver:view', 'customer:view'], createTime: '2020-01-01' }
]

export const mockProducts = [
  { id: '1', name: 'P.O 42.5水泥', code: 'PO425', price: 380, unit: '吨', stock: 5000 },
  { id: '2', name: 'P.C 32.5水泥', code: 'PC325', price: 320, unit: '吨', stock: 8000 },
  { id: '3', name: 'P.S 42.5矿渣水泥', code: 'PS425', price: 360, unit: '吨', stock: 3000 },
  { id: '4', name: 'P.O 52.5水泥', code: 'PO525', price: 450, unit: '吨', stock: 2000 }
]

export const mockWeighRecords = [
  { id: '1', orderNo: 'OD20241223001', vehiclePlate: '京A12345', driverName: '张师傅', productName: 'P.O 42.5水泥', grossWeight: 68.5, tareWeight: 18.5, netWeight: 50, weighTime: '2024-12-23 09:35:00', weighbridge: '1号磅', operator: '李操作员' },
  { id: '2', orderNo: 'OD20241223002', vehiclePlate: '京B67890', driverName: '李师傅', productName: 'P.C 32.5水泥', grossWeight: 52.8, tareWeight: 17.8, netWeight: 35, weighTime: '2024-12-23 10:15:00', weighbridge: '2号磅', operator: '王操作员' },
  { id: '3', orderNo: 'OD20241223003', vehiclePlate: '京C11111', driverName: '王师傅', productName: 'P.O 42.5水泥', grossWeight: 78.2, tareWeight: 18.2, netWeight: 60, weighTime: '2024-12-23 10:45:00', weighbridge: '1号磅', operator: '李操作员' },
  { id: '4', orderNo: 'OD20241222001', vehiclePlate: '京A12345', driverName: '张师傅', productName: 'P.C 32.5水泥', grossWeight: 73.5, tareWeight: 18.5, netWeight: 55, weighTime: '2024-12-22 09:10:00', weighbridge: '1号磅', operator: '李操作员' },
  { id: '5', orderNo: 'OD20241222002', vehiclePlate: '冀A22222', driverName: '刘师傅', productName: 'P.O 42.5水泥', grossWeight: 88.0, tareWeight: 18.0, netWeight: 70, weighTime: '2024-12-22 10:20:00', weighbridge: '2号磅', operator: '王操作员' }
]

export const mockSettlements = [
  { id: '1', driverId: '1', driverName: '张师傅', period: '2024年12月', orderCount: 45, totalWeight: 1850, totalAmount: 14800, deduction: 200, actualAmount: 14600, status: 'settled', settleTime: '2024-12-20' },
  { id: '2', driverId: '2', driverName: '李师傅', period: '2024年12月', orderCount: 52, totalWeight: 2100, totalAmount: 16800, deduction: 150, actualAmount: 16650, status: 'settled', settleTime: '2024-12-20' },
  { id: '3', driverId: '3', driverName: '王师傅', period: '2024年12月', orderCount: 38, totalWeight: 1520, totalAmount: 12160, deduction: 0, actualAmount: 12160, status: 'pending', settleTime: null },
  { id: '4', driverId: '4', driverName: '刘师傅', period: '2024年12月', orderCount: 28, totalWeight: 980, totalAmount: 7840, deduction: 100, actualAmount: 7740, status: 'pending', settleTime: null },
  { id: '5', driverId: '1', driverName: '张师傅', period: '2024年11月', orderCount: 48, totalWeight: 1920, totalAmount: 15360, deduction: 180, actualAmount: 15180, status: 'settled', settleTime: '2024-11-25' }
]

export const mockDashboard = {
  todayOrders: 128,
  todayWeight: 4520,
  todayVehicles: 52,
  todayDrivers: 48,
  monthOrders: 3256,
  monthWeight: 125800,
  monthAmount: 478520,
  orderTrend: [
    { date: '12-17', count: 98 },
    { date: '12-18', count: 112 },
    { date: '12-19', count: 135 },
    { date: '12-20', count: 108 },
    { date: '12-21', count: 125 },
    { date: '12-22', count: 118 },
    { date: '12-23', count: 128 }
  ],
  vehicleStatus: { working: 36, loading: 8, idle: 12, offline: 6 },
  productDistribution: [
    { name: 'P.O 42.5', value: 45 },
    { name: 'P.C 32.5', value: 30 },
    { name: 'P.S 42.5', value: 15 },
    { name: 'P.O 52.5', value: 10 }
  ],
  driverRanking: [
    { name: '李师傅', orders: 52, amount: 5200 },
    { name: '张师傅', orders: 45, amount: 4500 },
    { name: '王师傅', orders: 38, amount: 3800 },
    { name: '刘师傅', orders: 28, amount: 2800 },
    { name: '陈师傅', orders: 22, amount: 2200 }
  ]
}

export const mock = { delay, mockOrders, mockDrivers, mockVehicles, mockCustomers, mockUsers, mockRoles, mockProducts, mockWeighRecords, mockSettlements, mockDashboard }
export default mock


