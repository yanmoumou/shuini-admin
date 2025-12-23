import { mockDashboard, mock } from '@/mock'

export const dashboardApi = {
  summary: async () => {
    await mock.delay()
    return { code: 200, data: mockDashboard }
  }
}


