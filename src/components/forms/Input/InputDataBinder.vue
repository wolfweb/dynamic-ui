<template>
  <el-form ref="form" :model="widget!" label-width="25%">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="数据类型" prop="dataBinder.bindType">
          <el-select v-model="widget!.dataBinder!.bindType">
            <el-option value="Guid">Guid</el-option>
            <el-option value="String">字符串</el-option>
            <el-option value="Int32">整型</el-option>
            <el-option value="Int64">长整型</el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="默认值" prop="dataBinder.defaultValue">
          <el-input v-model="widget!.dataBinder!.defaultValue"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="是否主键" prop="dataBinder.primaryKey">
          <el-switch v-model="widget!.dataBinder!.primaryKey"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="可用来排序" prop="dataBinder.isSort">
          <el-switch v-model="widget!.dataBinder!.isSort"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="可用来过滤" prop="dataBinder.isFilter">
          <el-switch v-model="widget!.dataBinder!.isFilter"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="是否唯一值" prop="dataBinder.uniqueKey">
          <el-switch v-model="widget!.dataBinder!.uniqueKey"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  export default defineComponent({
    name: "InputDataBinder",
    components:{
      
    },
    setup(props, context) {
      const { currentElement } = useEditModel();

      const widget = currentElement.value as IFormElementMetadata;

      return {
        widget
      }
    }
  })
</script>