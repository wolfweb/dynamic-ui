<template>
  <el-form ref="form" :model="element!" label-width="20%">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="标签" prop="attributes.label">
          <el-input v-model="element!.attributes.label"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="字段名" prop="dataBinder.name">
          <el-input v-model="element!.dataBinder!.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="类型" prop="attributes.type">
          <el-select v-model="element!.attributes.type">
            <el-option label="年" value="year" />
            <el-option label="月" value="month" />
            <el-option label="天" value="date" />
            <el-option label="周" value="week" />
            <el-option label="日期时间" value="datetime" />
            <el-option label="日期时间范围" value="datetimerange" />
            <el-option label="日期范围" value="daterange" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>    
    <el-row>
      <el-col :span="24">
        <el-form-item label="可输入" prop="attributes.editable">
          <el-switch v-model="element!.attributes.editable" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="可清除" prop="attributes.clearable">
          <el-switch v-model="element!.attributes.clearable" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider>验证</el-divider>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="必填" prop="attributes.required">
          <el-switch v-model="element!.attributes.required" />
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
    name: "DateTimePickerAttrEdit",
    components:{
      Validation
    },
    setup(props, context) {
      const { currentElement } = useEditModel();

      const element = computed(()=> {
        // @ts-ignore
        return currentElement as IFormElementMetadata;
      }).value;

      return {
        element
      }
    }
  })
</script>