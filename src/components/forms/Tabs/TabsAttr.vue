<template>
  <el-form ref="form" :model="element!" label-width="20%">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="标签" prop="attributes.label">
          <el-input v-model="element!.attributes.label"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="风格类型" prop="attributes.type">
          <el-radio-group v-model="element!.attributes.type">
            <el-radio label="">默认</el-radio>
            <el-radio label="card">卡片</el-radio>
            <el-radio label="border-card">卡片+边框</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="选项卡位置" prop="attributes['tab-position']">
          <el-radio-group v-model="element!.attributes['tab-position']">
            <el-radio label="top">上</el-radio>
            <el-radio label="right">右</el-radio>
            <el-radio label="bottom">下</el-radio>
            <el-radio label="left">左</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="可关闭" prop="attributes.closable">
          <el-switch v-model="element!.attributes.closable" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="可增加" prop="attributes.addable">
          <el-switch v-model="element!.attributes.addable" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="可编辑" prop="attributes.editable">
          <el-switch v-model="element!.attributes.editable" />
        </el-form-item>
      </el-col>
    </el-row>
    
    <el-row :gutter="10">
      <el-col :span="2"><el-form-item label=""><br /><el-icon><Sort /></el-icon></el-form-item></el-col>
      <el-col :span="19"><el-form-item label="">标题</el-form-item></el-col>
      <el-col :span="3"><el-form-item label="">操作</el-form-item></el-col>
    </el-row>
    <draggable animation="200" :list="element!.childes" handle=".sortable__handle" ghost-class="sortable__ghost" item-key="id">
      <template #item="{ element, index }">
        <el-row :gutter="10" class="sortable">
          <el-col :span="2">
            <el-form-item class="sortable_handle">
              <el-icon><Operation /></el-icon>
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
  export default defineComponent({
    name: "TabsAttr",
    components:{
      draggable
    },
    methods:{
      removeChild(idx)  {
        this.element.childes!.splice(idx, 1)
      },
      addChild()  {
        this.element.childes!.push(({ name: '', display: '' } as IFormElementChildGroupMetadata))
      }
    },
    setup(props, context) {
      const { currentElement } = useEditModel();

      const element = computed(()=> {
        // @ts-ignore
        return currentElement as IFormElementMetadata;
      }).value;

      return {
        element
      }
    }
  })
</script>