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
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="最大分值" prop="attributes.max">
          <el-input-number style="width: 100%;" v-model="widget!.attributes.max" :min="0" :step="1" step-strictly />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="允许半选" prop="attributes['allow-half']">
          <el-switch v-model="widget!.attributes['allow-half']" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="显示分数" prop="attributes['show-score']">
          <el-switch v-model="widget!.attributes['show-score']" />
        </el-form-item>
      </el-col>      
    </el-row>
    <el-divider>验证</el-divider>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="是否必填" prop="attributes.required">
          <el-switch v-model="widget!.attributes.required" @change="requireChangeHandler" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <validation />
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  import Validation from '@/components/common/Validation.vue';
  export default defineComponent({
    name: "RateAttrEdit",
    components:{
      Validation
    },
    computed: {
      widget() {
        return this.currentWidget as IFormElementMetadata;
      }
    },
    setup(props, context) {
      const { currentWidget, requireChangeHandler } = useEditModel();

      return {
        currentWidget,
        requireChangeHandler
      }
    }
  })
</script>