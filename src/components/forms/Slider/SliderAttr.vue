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
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="最大值" prop="attributes.max">
          <el-input-number style="width: 100%;" v-model="element!.attributes.max" :min="0" :step="1" step-strictly />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="最小值" prop="attributes.min">
          <el-input-number style="width: 100%;" v-model="element!.attributes.min" :min="0" :step="1" step-strictly />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="步长" prop="attributes.step">
          <el-input-number style="width: 100%;" v-model="element!.attributes.step" :min="0" :step="1" step-strictly />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="显示间断点" prop="attributes['show-stops']">
          <el-switch v-model="element!.attributes['show-stops']" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="显示tooltip" prop="attributes['show-tooltip']">
          <el-switch v-model="element!.attributes['show-tooltip']" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="范围选择" prop="attributes.range">
          <el-switch v-model="element!.attributes.range" />
        </el-form-item>
      </el-col>      
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="竖向模式" prop="attributes.vertical">
          <el-switch v-model="element!.attributes.vertical" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider>验证</el-divider>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="是否必填" prop="attributes.required">
          <el-switch v-model="element!.attributes.required" @change="requireChangeHandler" />
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
    name: "SliderAttr",
    components:{
      Validation
    },
    setup(props, context) {
      const { currentElement, requireChangeHandler } = useEditModel();

      const element = computed(()=> {
        // @ts-ignore
        return currentElement as IFormElementMetadata;
      }).value;

      return {
        element,
        requireChangeHandler
      }
    }
  })
</script>