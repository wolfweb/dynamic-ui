<template>
  <el-form ref="form" :model="element!" label-width="20%">
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
        <el-form-item label="按钮效果" prop="attributes.useButton">
          <el-switch v-model="element!.attributes.useButton" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="边框显示" prop="attributes.border">
          <el-switch v-model="element!.attributes.border" />
        </el-form-item>
      </el-col>
    </el-row>    
    <el-row :gutter="10" style="display: content">
      <el-col :span="2"><el-form-item label=""><br /><el-icon><Sort /></el-icon></el-form-item></el-col>
      <el-col :span="11"><el-form-item label="">名称</el-form-item></el-col>
      <el-col :span="8"><el-form-item label="">值</el-form-item></el-col>
      <el-col :span="3"><el-form-item label="">操作</el-form-item></el-col>
    </el-row>
    <draggable animation="200" :list="element!.attributes.options" handle=".sortable_handle" ghost-class="sortable_ghost" item-key="value">
      <template #item="{ element, index }">
        <el-row :gutter="10" class="sortable">
          <el-col :span="2">
            <el-form-item class="sortable_handle">
              <el-icon><Operation /></el-icon>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item>
              <el-input v-model="element.label" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
  import draggable from 'vuedraggable';
  import { useEditModel } from '@/models/schema';
  import { defineComponent, reactive } from 'vue';
  import Validation from '@/components/common/Validation.vue';
  export default defineComponent({
    name: "CheckboxAttr",
    components:{
      draggable,
      Validation
    },
    methods: {
      removeChild(idx)  {
        this.element.attributes.options.splice(idx, 1)
      },
      addChild() {
        this.element.attributes.options.push({ text: "" })
      }
    },
    setup(props, context) {
      const { currentElement, requireChangeHandler } = useEditModel();

      const element = reactive(
        // @ts-ignore
        currentElement.value as IFormElementMetadata
      );

      return {
        requireChangeHandler,
        element
      }
    }
  })
</script>