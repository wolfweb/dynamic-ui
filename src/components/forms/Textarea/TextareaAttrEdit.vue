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
        <el-form-item label="显示行数" prop="attributes.rows">
          <el-input-number style="width: 100%;" v-model="widget!.attributes.rows" :min="0" :step="1" step-strictly />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="最大长度" prop="attributes.maxlength">
          <el-input-number style="width: 100%;" v-model="widget!.attributes.maxlength" :min="0" :step="1" step-strictly />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="最小长度" prop="attributes.minlength">
          <el-input-number style="width: 100%;" v-model="widget!.attributes.minlength" :min="0" :step="1" step-strictly />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="占位文本" prop="attributes.placeholder">
          <el-input v-model="widget!.attributes.placeholder"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="显示统计" prop="attributes['show-word-limit']">
          <el-switch v-model="widget!.attributes['show-word-limit']" />
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
    name: "TextareaAttrEdit",
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