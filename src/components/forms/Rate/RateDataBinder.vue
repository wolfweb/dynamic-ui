<template>
  <el-form ref="form" :model="element!" label-width="25%">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="默认值" prop="dataBinder.defaultValue">
          <el-input v-model="element!.dataBinder!.defaultValue"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="可以用来排序" prop="dataBinder.isSort">
          <el-switch v-model="element!.dataBinder!.isSort"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="可以用来过滤" prop="dataBinder.isFilter">
          <el-switch v-model="element!.dataBinder!.isFilter"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="是否唯一值" prop="dataBinder.uniqueKey">
          <el-switch v-model="element!.dataBinder!.uniqueKey"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  export default defineComponent({
    name: "RateDataBinder",
    components:{
      
    },
    setup(props, context) {
      const { currentElement } = useEditModel();

      const element = currentElement.value as IFormElementMetadata;

      return {
        element
      }
    }
  })
</script>