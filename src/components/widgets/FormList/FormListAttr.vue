<template>
  <el-form ref="form" :model="element" label-width="20%">
    <el-row>
      <el-col :span="24">
        <el-form-item label="列" prop="attributes.column">
          <el-input v-model="element.attributes.column" type="number"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="现实边框" prop="attributes.border">
          <el-switch v-model="element.attributes.border"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="绑定表单" prop="attributes.formSchemaId">
          <el-select v-model="element.attributes.formSchemaId">
            <el-option value=""></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="display: content">
      <el-col :span="2"><el-form-item label=""><br /><el-icon><Sort /></el-icon></el-form-item></el-col>
      <el-col :span="16"><el-form-item label="">名称</el-form-item></el-col>
      <el-col :span="6"><el-form-item label="">操作</el-form-item></el-col>
    </el-row>
    <draggable animation="200" :list="element.attributes.columns" handle=".sortable_handle" ghost-class="sortable_ghost" item-key="id">
      <template #item="{ element }">
        <el-row :gutter="10" class="sortable">
          <el-col :span="2">
            <el-form-item class="sortable_handle">
              <el-icon><Operation /></el-icon>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item>{{element.element.attributes.label}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-switch v-model="element.enable"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </draggable>
  </el-form>
</template>
<script lang="ts">
  import draggable from 'vuedraggable';
  import { useEditModel } from '@/models/schema';
  import { defineComponent, reactive } from 'vue';
  import type { DisplayElementMetadata } from '@/models/schema';

  export default defineComponent({
    name: "FormListAttr",
    components:{
      draggable
    },
    setup(props, context){
      const { currentElement } = useEditModel();

      const element = reactive(
        // @ts-ignore
        currentElement.value as DisplayElementMetadata
      );

      return {
        element
      }
    }
  })
</script>