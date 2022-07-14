<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-select
      v-model="formModel[meta.dataBinder.name]" 
      :placeholder="meta.attributes.placeholder"
      :clearable="meta.attributes.clearable"
      :filterable="meta.attributes.filterable"
    >
      <el-option v-for="(item, index) in meta.attributes.options" :key="index" :label="item.label" :value="item.value" />
    </el-select>
  </el-form-item>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEditModel } from '@/models/schema'
  export default defineComponent({
    name: "DropdownList",
    props: {
      meta:null
    },
    setup(props, context) {
      const { formModel, ensureFormModelInit } = useEditModel()

      if(props.meta){
        ensureFormModelInit(props.meta)
      }

      const descriptor = reactive(props.meta.validation.map(x=>x.rule));

      return {
        formModel,
        descriptor
      }
    }
  })
</script>