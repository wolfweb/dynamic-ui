<template>
  <el-form ref="form" :model="widget!">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="标签" prop="attributes.label">
          <el-input v-model="widget!.attributes.label"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="字段名" prop="dataBinder.name">
          <el-input v-model="widget!.dataBinder!.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  import Validation from '@/components/common/Validation.vue';
  export default defineComponent({
    name: "RichEditorAttrEdit",
    components:{
      Validation
    },
    computed: {
      widget() {
        return this.currentWidget as IFormElementMetadata;
      }
    },
    setup(props, context) {
      const { currentWidget } = useEditModel();

      return {
        currentWidget
      }
    }
  })
</script>