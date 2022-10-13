<template>
  <el-table :data="tableData">
    <template v-for="(item,index) in meta.columns">
      <el-table-column v-if="item.enable" :prop="item.name" :label="item.label"></el-table-column>
    </template>
  </el-table>
</template>
<script lang="ts">
  import { some } from 'lodash-es';
  import { defineComponent, watch }  from 'vue';
  import { useEditModel } from '@/models/schema';

  export default defineComponent({
    name: "FormList",
    props: {
      meta:null
    },
    setup(props, context) {
      const { editerModel, recursionFind } = useEditModel();

      const formModel = editerModel.attributes.formViewAttr.model;

      const tableData = [formModel.value];

      const addOrUpdateColumns = (element) => {
        const fields = recursionFind(element.formSchema, x => x.hasOwnProperty('dataBinder') && x.hasOwnProperty('validation'));
        for(var i=0; i<fields.length; i++){
          if(!some(element.columns, x=> x.id == fields[i].id)){
            element.columns.push({
              id: fields[i].id,
              label: fields[i].attributes.label,
              name: fields[i].dataBinder.name,
              enable: true
            });
          }
        }
      }

      addOrUpdateColumns(props.meta);

      watch(
        ()=> props.meta.formSchema,
        (v)=>{
          addOrUpdateColumns(props.meta);
        },{deep: true}
      );

      return {
        tableData
      }
    }
  })
</script>