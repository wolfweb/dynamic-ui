<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-rate v-model="formModel[meta.dataBinder.name]" :max="meta.attributes.max" :allow-half="meta.attributes['allow-half']" :show-score="meta.attributes['show-score']" />
  </el-form-item>
</template>
<script lang="ts">
  import { useEditModel } from '@/models/schema';
  import { defineComponent, computed } from 'vue';
  export default defineComponent({
    name: "Rate",
    props: {
      meta:null
    },
    setup(props, context) {
      const { formModel, ensureFormModelInit } = useEditModel();

      const descriptor = computed(()=>{
        return props.meta.validation.map(x=>x.rule);
      }).value;

      if(props.meta){
        ensureFormModelInit(props.meta);
      }

      return {
        formModel,
        descriptor
      }
    }
  })
</script>