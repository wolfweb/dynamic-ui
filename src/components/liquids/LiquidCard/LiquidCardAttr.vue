<template>
  <el-form ref="form" label-width="20%">
    <el-form-item label="标题">
      <el-input v-model="element.attributes.title" />      
    </el-form-item>
    <el-form-item label="样式">
      <el-select v-model="element.attributes.class">
        <el-option v-for="(item, index) in cardStyles" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  export default defineComponent({
    name: 'LiquidCardAttr',

    setup(props, context){
      const { currentElement } = useEditModel();

      const element = currentElement.value as ILiquidElementMetadata;

      const cardStyles = [
        {key:'primary', value: 'bg-primary text-white'},
        {key:'secondary', value: 'bg-secondary text-white'},
        {key:'success', value: 'bg-success text-white'},
        {key:'danger', value: 'bg-danger text-white'},
        {key:'warning', value: 'bg-warning'},
        {key:'info', value: 'bg-info text-white'},
        {key:'light', value: 'bg-light'},
        {key:'dark', value: 'bg-dark text-white'},
      ];

      return {
        cardStyles,
        element
      }
    }
  });
</script>