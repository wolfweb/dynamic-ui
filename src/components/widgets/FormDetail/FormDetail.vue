<template>
  <el-descriptions 
    :title="meta.attributes.title" 
    :column="meta.attributes.column"
    :border="meta.attributes.border"
    :direction="meta.attributes.direction"
  >
  <template v-for="(item,index) in meta.columns">
    <el-descriptions-item v-if="item.enable" :label="item.label">
      {{ formModel[item.name] }}
    </el-descriptions-item>
  </template>
  </el-descriptions>
</template>
<script lang="ts">
  import { remove } from 'lodash-es';
  import { defineComponent, watch }  from 'vue';
  import { useEditModel } from '@/models/schema';

  export default defineComponent({
    name: "FormDetail",
    props: {
      meta:null
    },
    setup(props, context) {
      const { formModel, recursionFind } = useEditModel();

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
        },{deep: true}
      )

      return {
        formModel
      }
    }
  });
</script>