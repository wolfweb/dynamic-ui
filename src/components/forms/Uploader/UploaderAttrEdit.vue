<template>
  <el-form ref="form" :model="widget!" label-width="23%">
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
        <el-form-item label="上传地址" prop="attributes.action">
          <el-input v-model="app.uploadUrl" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="上传类型" prop="attributes.accept">
          <el-input v-model="widget!.attributes.accept" autosize type="textarea" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="上传大小(M)" prop="attributes.limit">
          <el-input-number v-model="widget!.attributes.limit" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="列表类型" prop="attributes['list-type']">
          <el-select v-model="widget!.attributes['list-type']">
            <el-option value="text">文本</el-option>
            <el-option value="picture">图片</el-option>
            <el-option value="picture-card">图片卡片</el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="允许多选" prop="attributes.multiple">
          <el-switch v-model="widget!.attributes.multiple" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="允许拖拽" prop="attributes.drag">
          <el-switch v-model="widget!.attributes.drag" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="自动上传" prop="attributes['auto-upload']">
          <el-switch v-model="widget!.attributes['auto-upload']" />
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
  import draggable from 'vuedraggable';
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  import { useAppStore } from '@/store/modules/appStore';
  import Validation from '@/components/common/Validation.vue';
  export default defineComponent({
    name: "UploaderAttrEdit",
    components:{
      draggable,
      Validation    
    },
    computed: {
      widget() {
        return this.currentWidget as IFormElementMetadata;
      }
    },
    methods:{
      removeChild(idx) {
        this.widget!.attributes.options.splice(idx, 1)
      },
      addChild() {
        this.widget!.attributes.options.push({ label: "", key: "" })
      }
    },
    setup(props, context) {
      const { currentWidget, requireChangeHandler } = useEditModel();

      const app = useAppStore().AppContext;

      return {
        requireChangeHandler,
        currentWidget,
        app
      }
    }
  })
</script>