<template>
  <el-form ref="form" :model="widget!" label-width="20%">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="标签" prop="attributes.label">
          <el-input v-model="widget!.attributes.label"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="字段名" prop="dataBinder.name">
          <el-input v-model="widget!.dataBinder!.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="类型" prop="attributes.type">
          <el-select v-model="widget!.attributes.type">
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
          <el-switch v-model="widget!.attributes.editable" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="可清除" prop="attributes.clearable">
          <el-switch v-model="widget!.attributes.clearable" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider>验证</el-divider>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="必填" prop="attributes.required">
          <el-switch v-model="widget!.attributes.required" />
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
    name: "DateTimePickerAttrEdit",
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