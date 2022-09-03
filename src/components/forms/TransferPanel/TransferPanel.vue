<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-transfer v-model="formModel[meta.dataBinder.name]" :data="meta.attributes.options" :filterable="meta.attributes.filterable" :filter-method="filterItems">
    </el-transfer>
  </el-form-item>
</template>
<script lang="ts">
  import { useEditModel } from '@/models/schema';
  import { defineComponent, computed } from 'vue';
  export default defineComponent({
    name: "TransferPanel",
    props: {
      meta:null
    },
    setup(props, context) {
      const { formModel, ensureFormModelInit } = useEditModel();

      if(props.meta){
        ensureFormModelInit(props.meta);
      }

      const filterItems = (query, item) => {
        return item.key.indexOf(query) > -1 || item.label.indexOf(query) > -1;
      }

      const descriptor = computed(()=>{
        return props.meta.validation.map(x=>x.rule);
      }).value;

      return {
        filterItems,
        descriptor,
        formModel
      }
    }
  })
</script>