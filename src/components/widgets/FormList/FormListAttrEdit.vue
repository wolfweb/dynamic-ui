<template>
  <el-form ref="form" :model="widget!" label-width="20%">
    <el-row>
      <el-col :span="24">
        <el-form-item label="列" prop="attributes.column">
          <el-input v-model="widget!.attributes.column" type="number"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="现实边框" prop="attributes.border">
          <el-switch v-model="widget!.attributes.border"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="绑定表单" prop="attributes.border">
          <el-select v-model="widget!.formSchemaId">
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
    <draggable animation="200" :list="widget!.columns" handle=".sortable_handle" ghost-class="sortable_ghost" item-key="id">
      <template #item="{ element }">
        <el-row :gutter="10" class="sortable">
          <el-col :span="2">
            <el-form-item class="sortable_handle">
              <i class="fa fa-sliders"></i>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item>{{element.label}}</el-form-item>
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
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  export default defineComponent({
    name: "FormListAttrEdit",
    components:{
      draggable
    },
    computed: {
      widget() {
        return this.currentWidget as DisplayElementMetadata;
      }
    },
    setup(props, context){
      const { currentWidget } = useEditModel();

      return {
        currentWidget
      }
    }
  })
</script>