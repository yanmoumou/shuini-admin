<template>
  <el-dialog v-model="visible" :title="isEdit ? '编辑司机' : '新增司机'" width="700" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="基本信息" name="basic">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入手机号" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="form.idCard" placeholder="请输入身份证号" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="司机类型" prop="type">
                <el-radio-group v-model="form.type">
                  <el-radio value="own">自有司机</el-radio>
                  <el-radio value="external">外协司机</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="驾驶证号" prop="licenseNo">
                <el-input v-model="form.licenseNo" placeholder="请输入驾驶证号" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效期至" prop="licenseExpiry">
                <el-date-picker v-model="form.licenseExpiry" type="date" placeholder="选择日期" value-format="YYYY-MM-DD" style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="入职日期">
                <el-date-picker v-model="form.entryDate" type="date" placeholder="选择日期" value-format="YYYY-MM-DD" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-switch v-model="form.status" active-value="active" inactive-value="inactive" active-text="在职" inactive-text="离职" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="证件照片" name="docs">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="身份证正面">
                <el-upload class="avatar-uploader" action="#" :show-file-list="false" :auto-upload="false">
                  <img v-if="form.idCardFront" :src="form.idCardFront" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证反面">
                <el-upload class="avatar-uploader" action="#" :show-file-list="false" :auto-upload="false">
                  <img v-if="form.idCardBack" :src="form.idCardBack" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="驾驶证">
                <el-upload class="avatar-uploader" action="#" :show-file-list="false" :auto-upload="false">
                  <img v-if="form.driverLicense" :src="form.driverLicense" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="结算信息" name="bank">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="开户银行">
                <el-input v-model="form.bankName" placeholder="请输入开户银行" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银行账号">
                <el-input v-model="form.bankAccount" placeholder="请输入银行账号" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="紧急联系人">
                <el-input v-model="form.emergencyContact" placeholder="请输入紧急联系人" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="紧急联系电话">
                <el-input v-model="form.emergencyPhone" placeholder="请输入电话" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps<{
  modelValue: boolean
  data?: any
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const isEdit = computed(() => !!props.data?.id)
const loading = ref(false)
const activeTab = ref('basic')
const formRef = ref<FormInstance>()

const defaultForm = {
  id: '',
  name: '',
  phone: '',
  idCard: '',
  type: 'own',
  licenseNo: '',
  licenseExpiry: '',
  entryDate: '',
  status: 'active',
  idCardFront: '',
  idCardBack: '',
  driverLicense: '',
  bankName: '',
  bankAccount: '',
  emergencyContact: '',
  emergencyPhone: ''
}

const form = reactive({ ...defaultForm })

const rules: FormRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { pattern: /^1\d{10}$/, message: '手机号格式不正确', trigger: 'blur' }],
  idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
  type: [{ required: true, message: '请选择司机类型', trigger: 'change' }]
}

watch(() => props.data, (val) => {
  if (val) {
    Object.assign(form, val)
  } else {
    Object.assign(form, defaultForm)
  }
  activeTab.value = 'basic'
}, { immediate: true })

const handleClose = () => {
  visible.value = false
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  loading.value = true
  setTimeout(() => {
    ElMessage.success(isEdit.value ? '修改成功' : '创建成功')
    loading.value = false
    visible.value = false
    emit('success')
  }, 500)
}
</script>

<style scoped>
.avatar-uploader {
  width: 120px;
  height: 80px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}
</style>


