<template>
<el-form ref="formRef" :model="formModel" style="min-width: 70%;">
  <dynamic-component v-for="element in formSchema" :meta="element" />

  <el-form-item>
    <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
    <el-button @click="resetForm(formRef)">Reset</el-button>
  </el-form-item>
</el-form>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import httpFactory from '@/utils/http';
import { useEditModel } from '@/models/schema';
import { useMessage } from '@/hooks/web/useMessage';
import { useSchemaStore } from '@/store/modules/schemaStore';

const formRef = ref<FormInstance>();
const schemaStore = useSchemaStore();
const formSchema = schemaStore.Schema;
const { formModel } = useEditModel();
const { message } = useMessage();


const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  
  httpFactory().get({
    url: "/test-retry"
  },  {
    retryRequest: {
      isOpenRetry: true,
      count: 5,
      waitTime: 1000,
    },
  });

  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      message.error('请检查输入数据是否正确!');
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>