<template>
  <el-form ref="form" :model="element!" label-width="20%">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="行内表单" prop="attributes.inline">
          <el-switch v-model="element!.attributes.inline" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="标签后缀" prop="attributes['label-suffix']">
          <el-input v-model="element!.attributes['label-suffix']"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="组件尺寸" prop="attributes['size']">
          <el-radio-group v-model="element!.attributes.size">
            <el-radio-button label="large">large</el-radio-button>
            <el-radio-button label="default">default</el-radio-button>
            <el-radio-button label="small">small</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="标签位置" prop="attributes['label-position']">
          <el-select v-model="element!.attributes['label-position']">
            <el-option label="默认" value="">默认</el-option>
            <el-option label="上" value="top">上</el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { useEditModel } from '@/models/schema';
  export default defineComponent({
    name: "FormAttr",
    setup(props, context) {
      const { currentElement } = useEditModel();

      const element = reactive(
        // @ts-ignore
        currentElement.value as ILayoutElementMetadata
      );

      return {
        element
      }
    }
  })
</script>