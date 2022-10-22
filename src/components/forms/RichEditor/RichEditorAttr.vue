<template>
  <el-form ref="form" :model="element" label-width="20%">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="标签" prop="attributes.label">
          <el-input v-model="element.attributes.label"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="字段名" prop="dataBinder.name">
          <el-input v-model="element.dataBinder!.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="占位文本" prop="attributes.placeholder">
          <el-input v-model="element.attributes.placeholder"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
  import { useEditModel } from '@/models/schema';
  import { defineComponent, reactive} from 'vue';
  import Validation from '@/components/common/Validation.vue';
  export default defineComponent({
    name: "RichEditorAttr",
    components:{
      Validation
    },
    setup(props, context) {
      const { currentElement } = useEditModel();

      const element = reactive(
        // @ts-ignore
        currentElement.value as IFormElementMetadata
      );

      return {
        element
      }
    }
  })
</script>