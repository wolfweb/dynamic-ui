<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-cascader 
      :props="{multiple: meta.attributes.multiple}"
      :clearable="meta.attributes.clearable"
      :options="meta.attributes.options"
      :filterable="meta.attributes.filterable"
      v-model="formModel[meta.dataBinder.name]"
    >
    </el-cascader>
  </el-form-item>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEditModel } from '@/models/schema'
  export default defineComponent({
    name: "Cascader",
    props: {
      meta:null
    },
    setup(props, context) {
      const { formModel, ensureFormModelInit } = useEditModel();
      
      if(props.meta){
        ensureFormModelInit(props.meta)
      }

      const descriptor = computed(()=>props.meta.validation.map(x=>x.rule)).value;

      return {
        formModel,
        descriptor,
      }
    }
  })
</script>