<template>
  <el-form ref="form" :model="element!">
    <el-row :gutter="10" style="display: content">
      <el-col :span="2"><el-form-item label=""><br /><el-icon><Sort /></el-icon></el-form-item></el-col>
      <el-col :span="10"><el-form-item label="">名称</el-form-item></el-col>
      <el-col :span="9"><el-form-item label="">值</el-form-item></el-col>
      <el-col :span="3"><el-form-item label="">操作</el-form-item></el-col>
    </el-row>
    <draggable animation="200" :list="element!.attributes.cols" handle=".sortable_handle" ghost-class="sortable_ghost" item-key="label">
      <template #item="{ element, index }">
        <el-row :gutter="10" class="sortable">
          <el-col :span="2">
            <el-form-item class="sortable_handle">
              <el-icon><Operation /></el-icon>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item>
              <el-input v-model="element.label" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item>
              <el-input-number v-model="element.width" />
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
  import styles from '../index.module.scss';
  
  import draggable from 'vuedraggable';
  import { nanoid } from 'nanoid';
  import { useEditModel } from '@/models/schema';
  import { defineComponent, reactive } from 'vue';
  export default defineComponent({
    name: "RowAttr",
    components:{
      draggable,
    },
    methods: {
      removeChild(idx)  {
        this.element.attributes.cols.splice(idx, 1)
      },
      addChild() {
        this.element.attributes.cols.push({ label: nanoid(16), childes: [] })
      }
    },
    setup(props, context) {
      const { currentElement } = useEditModel();

      const element = reactive(
        // @ts-ignore
        currentElement.value as ILayoutElementMetadata
      );

      return {
        element,
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