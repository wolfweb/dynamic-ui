<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-slider
      :min="meta.attributes.min"
      :max="meta.attributes.max"
      :step="meta.attributes.step"
      :show-stops="meta.attributes['show-stops']"
      :show-tooltip="meta.attributes['show-tooltip']"
      :range="meta.attributes.range"
      :vertical="meta.attributes.vertical"
      v-model="formModel[meta.dataBinder.name]" 
    />
  </el-form-item>
</template>
<script lang="ts">
  import { useEditModel } from '@/models/schema';
  import { defineComponent, computed } from 'vue';
  export default defineComponent({
    name: "Slider",
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