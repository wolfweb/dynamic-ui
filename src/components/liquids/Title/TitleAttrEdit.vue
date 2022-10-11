<template>
  <el-form ref="form" label-width="20%">
    <el-form-item label="标题">
      <el-select v-model="meta.attributes.tagType">
        <el-option v-for="(item, index) in titleLevel" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "TitleAttrEdit",
    setup(props, context){
      const titleLevel = [
        {key:'标题1', value: 'h1'},
        {key:'标题2', value: 'h2'},
        {key:'标题3', value: 'h3'},
        {key:'标题4', value: 'h4'},
        {key:'标题5', value: 'h5'},
        {key:'标题6', value: 'h6'},
        {key:'标题7', value: 'h7'}
      ];

      return {
        titleLevel
      }
    }
  });  
</script>