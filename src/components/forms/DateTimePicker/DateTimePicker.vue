<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-date-picker
      :type="meta.attributes.type"
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
  import { defineComponent, computed } from 'vue'
  import { useEditModel } from '@/models/schema'
  export default defineComponent({
    name: "DateTimePicker",
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
        descriptor
      }
    }
  })
</script>