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
        <el-form-item label="最大值" prop="attributes.max">
          <el-input-number style="width: 100%;" v-model="widget!.attributes.max" :min="0" :step="1" step-strictly />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="最小值" prop="attributes.min">
          <el-input-number style="width: 100%;" v-model="widget!.attributes.min" :min="0" :step="1" step-strictly />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="步长" prop="attributes.step">
          <el-input-number style="width: 100%;" v-model="widget!.attributes.step" :min="0" :step="1" step-strictly />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="显示间断点" prop="attributes['show-stops']">
          <el-switch v-model="widget!.attributes['show-stops']" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="显示tooltip" prop="attributes['show-tooltip']">
          <el-switch v-model="widget!.attributes['show-tooltip']" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="范围选择" prop="attributes.range">
          <el-switch v-model="widget!.attributes.range" />
        </el-form-item>
      </el-col>      
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="竖向模式" prop="attributes.vertical">
          <el-switch v-model="widget!.attributes.vertical" />
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
  import { useEditModel } from '@/models/schema';
  import { defineComponent, computed } from 'vue';
  import Validation from '@/components/common/Validation.vue';
  export default defineComponent({
    name: "SliderAttrEdit",
    components:{
      Validation
    },
    setup(props, context) {
      const { currentElement, requireChangeHandler } = useEditModel();

      const widget = computed(()=> {
        // @ts-ignore
        return currentElement as IFormElementMetadata;
      }).value;

      return {
        widget,
        requireChangeHandler
      }
    }
  })
</script>