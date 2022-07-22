<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-upload
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :drag="meta.attributes.drag"
      :limit="meta.attributes.limit"
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
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    </el-upload>
  </el-form-item>
</template>
<script lang="ts">
  import httpFactory from '@/utils/http';
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  import { useMessage } from '@/hooks/web/useMessage';
  export default defineComponent({
    name: "Uploader",
    props: {
      meta:null
    },
    computed:{
      descriptor(){
        return this.meta.validation.map(x=>x.rule);
      }
    },
    setup(props, context) {
      const { formModel, ensureFormModelInit } = useEditModel();

      const { messageBox } = useMessage();

      if(props.meta){
        ensureFormModelInit(props.meta);
      }

      const handleRemove = (file, fileList) => {
        messageBox.confirm('确定删除文件吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //todo: 删除文件
          formModel[props.meta.dataBinder.name] = fileList;
        });
      }

      const handleSuccess = (res, file) => {
        if (res.status === 200) {
          formModel[props.meta.dataBinder.name] = res.data;
        }else{
          messageBox.alert(res.message);
        }
      }

      return {
        formModel,
        handleRemove,
        handleSuccess,
      }
    }
  })
</script>