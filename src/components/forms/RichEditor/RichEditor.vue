<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :rules="descriptor">
    
  </el-form-item>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useEditModel } from '@/models/schema'
  
  export default defineComponent({
    name: "RichEditor",
    components: {
      
    },
    props: {
      meta:null
    },
    setup(props, context) {
      const { formModel, ensureFormModelInit } = useEditModel();

      if(props.meta){
        ensureFormModelInit(props.meta);
      }

      const descriptor = reactive(props.meta.validation.map(x=>x.rule));

      const updateHandler = ({html, json}) => {

      }

      return {
        formModel,
        descriptor,
        updateHandler
      }
    }
  })
</script>

<style>
  .richEditor{
    min-width: 440px;
    min-height: 300px;
  }
</style>