<template>
  <el-form ref="form" :model="element!" label-width="24%">
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
        <el-form-item label="打开时的描述" prop="attributes['active-text']">
          <el-input v-model="element!.attributes['active-text']" placeholder="例如: 启用" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="关闭时的描述" prop="attributes['inactive-text']">
          <el-input v-model="element!.attributes['inactive-text']" placeholder="例如: 停用" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="打开时背景色" prop="attributes['active-color']">
          <el-color-picker v-model="element!.attributes['active-color']" color-format="rgb" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="关闭时背景色" prop="attributes['inactive-color']">
          <el-color-picker v-model="element!.attributes['inactive-color']" color-format="rgb" />
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
  import { defineComponent } from 'vue';
  import Validation from '@/components/common/Validation.vue';
  export default defineComponent({
    name: "SwitchsAttr",
    components:{
      Validation
    },
    setup(props, context) {
      const { currentElement, requireChangeHandler } = useEditModel();

      const element = currentElement.value as IFormElementMetadata;;

      return {
        element,
        requireChangeHandler
      }
    }
  })
</script>