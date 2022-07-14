<template>
  <el-form ref="form" :model="widget!">
    <el-row :gutter="10" style="display: content">
      <el-col :span="2"><el-form-item label=""><br /><el-icon><Sort /></el-icon></el-form-item></el-col>
      <el-col :span="10"><el-form-item label="">名称</el-form-item></el-col>
      <el-col :span="9"><el-form-item label="">值</el-form-item></el-col>
      <el-col :span="3"><el-form-item label="">操作</el-form-item></el-col>
    </el-row>
    <draggable animation="200" :list="widget!.attributes.cols" handle=".sortable_handle" ghost-class="sortable_ghost" item-key="label">
      <template #item="{ element, index }">
        <el-row :gutter="10" class="sortable">
          <el-col :span="2">
            <el-form-item class="sortable_handle">
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
              <el-input v-model="element.width" />
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
  </el-form>
</template>
<script lang="ts">
  import draggable from 'vuedraggable';
  import styles from '../index.module.scss';
  import { nanoid } from 'nanoid';
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  export default defineComponent({
    name: "RowAttrEdit",
    components:{
      draggable,
    },
    computed: {
      widget() {
        return this.currentWidget as ILayoutElementMetadata;
      }
    },
    methods: {
      removeChild(idx)  {
        this.widget!.attributes.cols.splice(idx, 1)
      },
      addChild() {
        this.widget!.attributes.cols.push({ label: nanoid(16), childes: [] })
      }
    },
    setup(props, context) {
      const { currentWidget } = useEditModel();

      return {
        currentWidget,
        styles
      }
    }
  })
</script>
<style>
  .el-radio__label{
    width: 100%;
  }
</style>