<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-input-number
      :min="meta.attributes.min"
      :max="meta.attributes.max"
      :step="meta.attributes.step"
      :step-strictly="meta.attributes['step-strictly']"
      :precision="meta.attributes.precision"
      :controls="meta.attributes.controls"
      :controls-position="meta.attributes['controls-position']"
      :placeholder="meta.attributes.placeholder"
      v-model="formModel[meta.dataBinder.name]" 
    />
  </el-form-item>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEditModel } from '@/models/schema'
  export default defineComponent({
    name: "InputNumber",
    props: {
      meta:null
    },
    computed:{
      descriptor(){
        return this.meta.validation.map(x=>x.rule);
      }
    },
    setup(props, context) {
      const { formModel, ensureFormModelInit } = useEditModel();

      if(props.meta){
        ensureFormModelInit(props.meta);
      }

      return {
        formModel,
      }
    }
  })
</script>