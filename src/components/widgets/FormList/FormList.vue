<template>
  <el-table :data="tableData">
    <template v-for="(item,index) in meta.attributes.columns">
      <el-table-column v-if="item.enable" :prop="item.name" :label="item.label"></el-table-column>
    </template>
  </el-table>
</template>
<script lang="ts">
  import { defineComponent }  from 'vue';
  import { useEditModel } from '@/models/schema';

  export default defineComponent({
    name: "FormList",
    props: {
      meta:null
    },
    setup(props, context) {
      console.log(props.meta);
      
      const { editerModel } = useEditModel();

      const formModel = editerModel.attributes.formViewAttr.model;

      const tableData = [formModel];

      return {
        tableData
      }
    }
  })
</script>