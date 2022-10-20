<template>
  <el-form ref="form" :model="element!" label-width="20%">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="容器名称" prop="attributes.title">
          <el-input v-model="element!.attributes.title" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="容器类型" prop="attributes.style">
          <el-select v-model="element!.attributes.style">
            <el-option label="流式布局" value="container-fluid"></el-option>
            <el-option label="sm小屏" value="container-sm">sm</el-option>
            <el-option label="md" value="container-md">md</el-option>
            <el-option label="lg" value="container-lg">lg</el-option>
            <el-option label="xl" value="container-xl">xl</el-option>
            <el-option label="xxl" value="container-xxl">xxl</el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  export default defineComponent({
    name: "LayoutAttr",
    setup(props, context) {
      const { currentElement } = useEditModel();

      const element = currentElement.value as ILayoutElementMetadata;

      return {
        element,
      }
    }
  })
</script>