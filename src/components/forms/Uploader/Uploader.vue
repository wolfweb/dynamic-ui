<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-upload
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :drag="meta.attributes.drag"
      :accept="meta.attributes.accept"
      :action="meta.attributes.action"
      :multiple="meta.attributes.multiple"
      :list-type="meta.attributes['list-type']"
      :with-credentials="true"
      v-model="formModel[meta.dataBinder.name]" 
    >
      <template #tip>
        <div class="el-upload__tip">
          {{ meta.attributes.tip }}
        </div>
      </template>
      <el-icon class="el-icon--upload"><component :is="meta.attributes.uploadIcon" /></el-icon>
    </el-upload>
  </el-form-item>
</template>
<script lang="ts">
  import httpFactory from '@/utils/http';
  import { useEditModel } from '@/models/schema';
  import { defineComponent, computed } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';
  export default defineComponent({
    name: "Uploader",
    props: {
      meta:null
    },
    setup(props, context) {
      const { editerModel } = useEditModel();

      const { message, messageBox } = useMessage();

      if(props.meta){
        editerModel.emitter.emit("onElementLoading", props.meta);
      }

      const formModel = editerModel.attributes.formViewAttr.model;

      const handleRemove = (file, fileList) => {
        if (file && file.status==="success") {
          messageBox.confirm('确定删除文件吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //todo: 删除文件
            formModel[props.meta.dataBinder.name] = fileList;
          });
        }
      }

      const handleSuccess = (res, file) => {
        if (res.status === 200) {
          formModel[props.meta.dataBinder.name] = res.data;
        }else{
          messageBox.alert(res.message);
        }
      }

      const beforeUpload = (file) => {
        if (file.size / 1024 / 1024 > props.meta.attributes.limit) {
          message.error(`最大上传文件质量 ${props.meta.attributes.limit}MB!`);
          return false;
        }
        return true;
      }

      const descriptor = computed(()=>{
        return props.meta.validation.map(x=>x.rule);
      }).value;

      return {
        formModel,
        descriptor,
        beforeUpload,
        handleRemove,
        handleSuccess,
      }
    }
  })
</script>