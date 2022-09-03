<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :rules="descriptor">
    
  </el-form-item>
</template>
<script lang="ts">
  import { useEditModel } from '@/models/schema';
  import { defineComponent, computed } from 'vue';
  
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

      const descriptor = computed(()=>{
        return props.meta.validation.map(x=>x.rule);
      }).value;

      const updateHandler = ({html, json}) => {

      };

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