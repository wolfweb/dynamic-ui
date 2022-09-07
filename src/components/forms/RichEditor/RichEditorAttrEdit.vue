<template>
  <el-form ref="form" :model="widget">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="标签" prop="attributes.label">
          <el-input v-model="widget.attributes.label"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="字段名" prop="attributes.placeholder">
          <el-input v-model="widget.attributes.placeholder"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="字段名" prop="dataBinder.name">
          <el-input v-model="widget.dataBinder!.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
  import { useEditModel } from '@/models/schema';
  import { defineComponent, computed } from 'vue';
  import Validation from '@/components/common/Validation.vue';
  export default defineComponent({
    name: "RichEditorAttrEdit",
    components:{
      Validation
    },
    setup(props, context) {
      const { currentWidget } = useEditModel();

      const widget = computed(()=> {
        // @ts-ignore
        return currentWidget as IFormElementMetadata;
      }).value;

      return {
        widget
      }
    }
  })
</script>