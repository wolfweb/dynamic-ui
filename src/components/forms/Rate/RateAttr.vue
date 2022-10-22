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
        <el-form-item label="最大分值" prop="attributes.max">
          <el-input-number style="width: 100%;" v-model="element!.attributes.max" :min="0" :step="1" step-strictly />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="允许半选" prop="attributes['allow-half']">
          <el-switch v-model="element!.attributes['allow-half']" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="显示分数" prop="attributes['show-score']">
          <el-switch v-model="element!.attributes['show-score']" />
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
  import { defineComponent, reactive } from 'vue';
  import Validation from '@/components/common/Validation.vue';
  export default defineComponent({
    name: "RateAttr",
    components:{
      Validation
    },
    setup(props, context) {
      const { currentElement, requireChangeHandler } = useEditModel();

      const element = reactive(
        // @ts-ignore
        currentElement.value as IFormElementMetadata
      );

      return {
        element,
        requireChangeHandler
      }
    }
  })
</script>