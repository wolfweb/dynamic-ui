<template>
  <el-form ref="form" :model="widget!" label-width="25%">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="默认值" prop="dataBinder.defaultValue">
          <el-input v-model="widget!.dataBinder!.defaultValue"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  export default defineComponent({
    name: "TextareaDataBinder",
    components:{
      
    },
    setup(props, context) {
      const { currentWidget } = useEditModel();

      const widget = currentWidget.value as IFormElementMetadata;

      return {
        widget
      }
    }
  })
</script>