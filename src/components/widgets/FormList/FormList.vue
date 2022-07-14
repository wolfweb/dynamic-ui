<template>
  <el-table :data="tableData">
    <template v-for="(item,index) in meta.columns">
      <el-table-column v-if="item.enable" :prop="item.name" :label="item.label"></el-table-column>
    </template>
  </el-table>
</template>
<script lang="ts">
  import { remove, reduce } from 'lodash-es';
  import { defineComponent, watch }  from 'vue';
  import { useEditModel } from '@/models/schema';

  export default defineComponent({
    name: "FormList",
    props: {
      meta:null
    },
    setup(props, context) {
      const { formModel, recursionFind } = useEditModel();

      const tableData = [formModel.value];

      const updateColumns = (widget) => {
        remove(widget.columns);
        const fields = recursionFind(widget.formSchema, x => x.hasOwnProperty('dataBinder') && x.hasOwnProperty('validation'));
        for(var i=0; i<fields.length; i++){
          widget.columns.push({
            id: fields[i].id,
            label: fields[i].attributes.label,
            name: fields[i].dataBinder.name,
            enable: true
          });
        }
      }

      updateColumns(props.meta);

      watch(
        ()=> props.meta.formSchema,
        (v)=>{
          updateColumns(props.meta);
          console.log(tableData);
        },{deep: true}
      );

      return {
        tableData
      }
    }
  })
</script>