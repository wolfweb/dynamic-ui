<template>
  <el-form ref="form" :model="widget!" label-width="20%">
    <el-row :gutter="10">
      <el-col :span="24">
        <el-form-item label="手风琴效果" prop="attributes.accordion">
          <el-switch v-model="widget.attributes.accordion" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="2"><el-form-item label=""><br /><el-icon><Sort /></el-icon></el-form-item></el-col>
      <el-col :span="10"><el-form-item label="">名称</el-form-item></el-col>
      <el-col :span="9"><el-form-item label="">值</el-form-item></el-col>
      <el-col :span="3"><el-form-item label="">操作</el-form-item></el-col>
    </el-row>
    <draggable animation="200" :list="widget!.childes" handle=".sortable_handle" ghost-class="sortable_ghost" item-key="name">
      <template #item="{ element, index }">
        <el-row :gutter="10" class="sortable">
          <el-col :span="2">
            <el-form-item class="sortable_handle">
              <i class="fa fa-sliders"></i>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item>
              <el-input v-model="element.display" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item>
              <el-input v-model="element.name" />
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
  import { useEditModel } from '@/models/schema';
  import { defineComponent, computed } from 'vue';
  import Validation from '@/components/common/Validation.vue';
  export default defineComponent({
    name: "CollapseAttrEdit",
    components:{
      draggable,
      Validation
    },
    methods:{
      removeChild(idx)  {
        this.widget.childes!.splice(idx, 1)
      },
      addChild()  {
        this.widget.childes!.push(({ name: '', display: '' } as IFormElementChildGroupMetadata))
      }
    },
    setup(props, context) {
      const { currentWidget } = useEditModel();

      const widget = computed(()=> {
        // @ts-ignore
        return currentWidget as IFormElementMetadata;
      }).value;

      return {
        widget
      }
    }
  })
</script>