<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-upload
      :on-remove="handleRemove"
      :drag="meta.attributes.drag"
      :limit="meta.attributes.limit"
      :accept="meta.attributes.accept"
      :action="meta.attributes.action"
      :multiple="meta.attributes.multiple"
      :list-type="meta.attributes['list-type']"
      :with-credentials="true"
      v-model="formModel[meta.dataBinder.name]" 
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    </el-upload>
  </el-form-item>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  import { useMessage } from '@/hooks/web/useMessage';
  export default defineComponent({
    name: "Uploader",
    props: {
      meta:null
    },
    setup(props, context) {
      const { formModel, ensureFormModelInit } = useEditModel();

      const { messageBox } = useMessage();

      if(props.meta){
        ensureFormModelInit(props.meta);
      }

      const descriptor = reactive(props.meta.validation.map(x=>x.rule));

      const handleRemove = (file, fileList) => {
        console.log(file, fileList);
      }

      const handlePreview = (file) => {
        console.log(file);
      }

      const handleSuccess = (res, file) => {
        console.log(URL.createObjectURL(file.raw!));
      }

      return {
        formModel,
        descriptor,
        handleRemove,
        handleSuccess,
      }
    }
  })
</script>