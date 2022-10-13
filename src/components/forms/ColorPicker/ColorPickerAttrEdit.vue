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
        <el-form-item label="颜色格式" prop="color-format">
          <el-select v-model="widget!.attributes['color-format']">
            <el-option label="hsl" value="hsl" />
            <el-option label="hsv" value="hsv" />
            <el-option label="rgb" value="rgb" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="开启透明度" prop="attributes.show-alpha">
          <el-switch v-model="widget!.attributes['show-alpha']" />
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
    name: "ColorPickerAttrEdit",
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