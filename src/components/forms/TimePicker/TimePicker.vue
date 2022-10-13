<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-time-select
      :editable="meta.attributes.editable"
      :clearable="meta.attributes.clearable"
      :placeholder="meta.attributes.placeholder"
      :start-placeholder="meta.attributes['start-placeholder']"
      :end-placeholder="meta.attributes['end-placeholder']"
      :align="meta.attributes.align"
      v-model="formModel[meta.dataBinder.name]" 
    />    
  </el-form-item>
</template>
<script lang="ts">
  import { useEditModel } from '@/models/schema';
  import { defineComponent, computed } from 'vue';
  export default defineComponent({
    name: "TimePicker",
    props: {
      meta:null
    },
    setup(props, context) {
      const { editerModel } = useEditModel();

      const descriptor = computed(()=>{
        return props.meta.validation.map(x=>x.rule);
      }).value;

      if(props.meta){
        editerModel.emitter.emit("onElementLoading", props.meta);
      }

      const formModel = editerModel.attributes.formViewAttr.model;

      return {
        formModel,
        descriptor,
      }
    }
  })
</script>