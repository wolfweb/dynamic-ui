<template>
  <el-form ref="form" label-width="20%">
    <el-form-item label="样式">
      <el-select v-model="currentElement.attributes.class">
        <el-option v-for="(item, index) in linkStyles" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="内容">
      <el-input v-model="currentElement.attributes.content" />
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  export default defineComponent({
    name: "LinkAttrEdit",
    setup(props, context){
      const { currentElement } = useEditModel();

      const linkStyles = [
        {key:'Primary', value: 'btn btn-primary'},
        {key:'Secondary', value: 'btn btn-secondary'},
        {key:'Success', value: 'btn btn-success'},
        {key:'Info', value: 'btn btn-info'},
        {key:'Warning', value: 'btn btn-warning'},
        {key:'Danger', value: 'btn btn-danger'},
        {key:'Light', value: 'btn btn-light'},
        {key:'Dark', value:"btn btn-dark"},
        {key:'Link', value:"btn btn-link"}
      ];

      return {
        linkStyles,
        currentElement
      }
    }
  });  
</script>