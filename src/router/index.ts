import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'HomeFilled' }
      }
    ]
  },
  {
    path: '/order',
    component: () => import('@/layout/index.vue'),
    redirect: '/order/list',
    meta: { title: '订单管理', icon: 'Document' },
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order/list.vue'),
        meta: { title: '订单列表' }
      },
      {
        path: 'create',
        name: 'OrderCreate',
        component: () => import('@/views/order/create.vue'),
        meta: { title: '创建订单' }
      },
      {
        path: 'detail/:id',
        name: 'OrderDetail',
        component: () => import('@/views/order/detail.vue'),
        meta: { title: '订单详情', hidden: true }
      }
    ]
  },
  {
    path: '/dispatch',
    component: () => import('@/layout/index.vue'),
    redirect: '/dispatch/schedule',
    meta: { title: '调度管理', icon: 'SetUp' },
    children: [
      {
        path: 'schedule',
        name: 'DispatchSchedule',
        component: () => import('@/views/dispatch/schedule.vue'),
        meta: { title: '调度排班' }
      },
      {
        path: 'queue',
        name: 'DispatchQueue',
        component: () => import('@/views/dispatch/queue.vue'),
        meta: { title: '排队叫号' }
      }
    ]
  },
  {
    path: '/customer',
    component: () => import('@/layout/index.vue'),
    redirect: '/customer/list',
    meta: { title: '客户管理', icon: 'OfficeBuilding' },
    children: [
      {
        path: 'list',
        name: 'CustomerList',
        component: () => import('@/views/customer/list.vue'),
        meta: { title: '客户列表' }
      }
    ]
  },
  {
    path: '/driver',
    component: () => import('@/layout/index.vue'),
    redirect: '/driver/list',
    meta: { title: '司机管理', icon: 'User' },
    children: [
      {
        path: 'list',
        name: 'DriverList',
        component: () => import('@/views/driver/list.vue'),
        meta: { title: '司机列表' }
      },
      {
        path: 'vehicle',
        name: 'VehicleList',
        component: () => import('@/views/driver/vehicle.vue'),
        meta: { title: '车辆管理' }
      }
    ]
  },
  {
    path: '/weighbridge',
    component: () => import('@/layout/index.vue'),
    redirect: '/weighbridge/index',
    meta: { title: '过磅管理', icon: 'ScaleToOriginal' },
    children: [
      {
        path: 'index',
        name: 'Weighbridge',
        component: () => import('@/views/weighbridge/index.vue'),
        meta: { title: '过磅记录' }
      }
    ]
  },
  {
    path: '/finance',
    component: () => import('@/layout/index.vue'),
    redirect: '/finance/settlement',
    meta: { title: '财务管理', icon: 'Money' },
    children: [
      {
        path: 'settlement',
        name: 'Settlement',
        component: () => import('@/views/finance/settlement.vue'),
        meta: { title: '运费结算' }
      },
      {
        path: 'bill',
        name: 'Bill',
        component: () => import('@/views/finance/bill.vue'),
        meta: { title: '账单管理' }
      }
    ]
  },
  {
    path: '/monitor',
    component: () => import('@/layout/index.vue'),
    redirect: '/monitor/map',
    meta: { title: '监控中心', icon: 'Location' },
    children: [
      {
        path: 'map',
        name: 'MonitorMap',
        component: () => import('@/views/monitor/map.vue'),
        meta: { title: '车辆定位' }
      },
      {
        path: 'track',
        name: 'MonitorTrack',
        component: () => import('@/views/monitor/track.vue'),
        meta: { title: '轨迹回放' }
      }
    ]
  },
  {
    path: '/report',
    component: () => import('@/layout/index.vue'),
    redirect: '/report/statistics',
    meta: { title: '报表统计', icon: 'DataAnalysis' },
    children: [
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/report/statistics.vue'),
        meta: { title: '统计报表' }
      }
    ]
  },
  {
    path: '/system',
    component: () => import('@/layout/index.vue'),
    redirect: '/system/user',
    meta: { title: '系统管理', icon: 'Setting' },
    children: [
      {
        path: 'user',
        name: 'SystemUser',
        component: () => import('@/views/system/user.vue'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        name: 'SystemRole',
        component: () => import('@/views/system/role.vue'),
        meta: { title: '角色管理' }
      },
      {
        path: 'product',
        name: 'SystemProduct',
        component: () => import('@/views/system/product.vue'),
        meta: { title: '品种管理' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title || ''} - 水泥运输管理系统`
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
