import { ref, reactive, onMounted } from 'vue'
import type { PageResult } from '@/types'

interface UseTableOptions<T, Q> {
  api: (params: Q) => Promise<PageResult<T>>
  defaultQuery?: Partial<Q>
  immediate?: boolean
}

export function useTable<T, Q extends { page: number; size: number }>({
  api,
  defaultQuery = {},
  immediate = true
}: UseTableOptions<T, Q>) {
  const loading = ref(false)
  const tableData = ref<T[]>([]) as any
  const selectedRows = ref<T[]>([])
  
  const pagination = reactive({
    page: 1,
    size: 10,
    total: 0
  })

  const query = reactive<Q>({
    page: 1,
    size: 10,
    ...defaultQuery
  } as Q)

  const fetchData = async () => {
    loading.value = true
    try {
      const res = await api({ ...query, page: pagination.page, size: pagination.size } as Q)
      tableData.value = res.list
      pagination.total = res.total
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const handleSearch = () => {
    pagination.page = 1
    fetchData()
  }

  const handleReset = () => {
    Object.keys(query).forEach(key => {
      if (key !== 'page' && key !== 'size') {
        (query as any)[key] = undefined
      }
    })
    handleSearch()
  }

  const handlePageChange = (page: number) => {
    pagination.page = page
    fetchData()
  }

  const handleSizeChange = (size: number) => {
    pagination.size = size
    pagination.page = 1
    fetchData()
  }

  const handleSelectionChange = (rows: T[]) => {
    selectedRows.value = rows
  }

  const refresh = () => fetchData()

  if (immediate) {
    onMounted(fetchData)
  }

  return {
    loading,
    tableData,
    selectedRows,
    pagination,
    query,
    fetchData,
    handleSearch,
    handleReset,
    handlePageChange,
    handleSizeChange,
    handleSelectionChange,
    refresh
  }
}


