import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { success, error } from '@/utils'

interface UseFormOptions<T> {
  createApi?: (data: T) => Promise<any>
  updateApi?: (id: string, data: T) => Promise<any>
  onSuccess?: () => void
}

export function useForm<T extends Record<string, any>>(
  defaultData: T,
  options: UseFormOptions<T> = {}
) {
  const formRef = ref<FormInstance>()
  const visible = ref(false)
  const loading = ref(false)
  const isEdit = ref(false)
  const editId = ref('')
  const formData = reactive<T>({ ...defaultData })

  const open = (data?: T & { id?: string }) => {
    if (data?.id) {
      isEdit.value = true
      editId.value = data.id
      Object.assign(formData, data)
    } else {
      isEdit.value = false
      editId.value = ''
      Object.assign(formData, defaultData)
    }
    visible.value = true
  }

  const close = () => {
    visible.value = false
    formRef.value?.resetFields()
  }

  const submit = async () => {
    await formRef.value?.validate()
    loading.value = true
    try {
      if (isEdit.value && options.updateApi) {
        await options.updateApi(editId.value, formData as any)
        success('修改成功')
      } else if (options.createApi) {
        await options.createApi(formData as any)
        success('创建成功')
      }
      close()
      options.onSuccess?.()
    } catch (e: any) {
      error(e.message || '操作失败')
    } finally {
      loading.value = false
    }
  }

  return {
    formRef,
    visible,
    loading,
    isEdit,
    formData,
    open,
    close,
    submit
  }
}

