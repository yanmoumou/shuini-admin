import { mockUsers, mockRoles, mockProducts, mock } from '@/mock'
import type { User } from '@/types'

export const userApi = {
  list: async (params: { username?: string; status?: string; page: number; size: number }) => {
    await mock.delay()
    let list = [...mockUsers]
    if (params.username) list = list.filter(u => u.username.includes(params.username!) || u.nickname?.includes(params.username!))
    if (params.status) list = list.filter(u => u.status === params.status)
    const start = (params.page - 1) * params.size
    return { code: 200, data: { list: list.slice(start, start + params.size), total: list.length } }
  },
  detail: async (id: string) => {
    await mock.delay()
    return { code: 200, data: mockUsers.find(u => u.id === id) }
  },
  create: async (data: Partial<User>) => {
    await mock.delay()
    const newUser = { ...data, id: String(Date.now()), createTime: new Date().toLocaleString() } as User
    mockUsers.unshift(newUser)
    return { code: 200, data: newUser }
  },
  update: async (id: string, data: Partial<User>) => {
    await mock.delay()
    const idx = mockUsers.findIndex(u => u.id === id)
    if (idx > -1) Object.assign(mockUsers[idx], data)
    return { code: 200, data: mockUsers[idx] }
  },
  delete: async (id: string) => {
    await mock.delay()
    const idx = mockUsers.findIndex(u => u.id === id)
    if (idx > -1) mockUsers.splice(idx, 1)
    return { code: 200 }
  }
}

export const roleApi = {
  list: async () => {
    await mock.delay()
    return { code: 200, data: mockRoles }
  },
  detail: async (id: string) => {
    await mock.delay()
    return { code: 200, data: mockRoles.find(r => r.id === id) }
  }
}

export const authApi = {
  login: async (data: { username: string; password: string }) => {
    await mock.delay(500)
    if (data.username === 'admin' && data.password === '123456') {
      const user = mockUsers[0]
      return { code: 200, data: { token: 'mock_token_' + Date.now(), userInfo: user } }
    }
    if (data.password === '123456') {
      const user = mockUsers.find(u => u.username === data.username) || mockUsers[0]
      return { code: 200, data: { token: 'mock_token_' + Date.now(), userInfo: user } }
    }
    return { code: 401, message: '用户名或密码错误' }
  },
  logout: async () => {
    await mock.delay()
    return { code: 200 }
  },
  profile: async () => {
    await mock.delay()
    return { code: 200, data: mockUsers[0] }
  }
}

export const dictApi = {
  products: async () => {
    await mock.delay()
    return { code: 200, data: mockProducts }
  }
}
