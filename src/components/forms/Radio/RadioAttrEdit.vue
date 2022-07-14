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
        <el-form-item label="按钮效果" prop="attributes.useButton">
          <el-switch v-model="widget!.attributes.useButton" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="显示边框" prop="attributes.border">
          <el-switch v-model="widget!.attributes.border" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="2"><el-form-item label=""><br /><el-icon><Sort /></el-icon></el-form-item></el-col>
      <el-col :span="10"><el-form-item label="">名称</el-form-item></el-col>
      <el-col :span="9"><el-form-item label="">值</el-form-item></el-col>
      <el-col :span="3"><el-form-item label="">操作</el-form-item></el-col>
    </el-row>
    <draggable animation="200" :list="widget!.attributes.options" handle=".sortable__handle" ghost-class="sortable__ghost">
      <template #item="{ element, index }">
        <el-row :gutter="10" class="sortable">
          <el-col :span="2">
            <el-form-item class="sortable__handle">
              <i class="fa fa-sliders"></i>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item>
              <el-input v-model="element.label" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item>
              <el-input v-model="element.value" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-icon style="cursor: pointer;" @click="() => removeChild(index)"><Delete/></el-icon>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </draggable>
    <el-button size="small" style="width: 100%;" type="default" @click="addChild">
      <i class="el-icon-plus"></i>
      <span>新增</span>
    </el-button>
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
  import Validation from '@/components/common/Validation.vue';
  export default defineComponent({
    name: "RadioAttrEdit",
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
        this.widget!.attributes.options.splice(idx, 1);
      },
       addChild() {
        this.widget!.attributes.options.push({ label: "" });
      }
    },
    setup(props, context) {
      const { currentWidget, requireChangeHandler } = useEditModel();

      return {
        requireChangeHandler,
        currentWidget,
      }
    }
  })
</script>