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
  import { defineComponent, computed } from 'vue'
  import { useEditModel } from '@/models/schema'
  export default defineComponent({
    name: "DropdownList",
    props: {
      meta:null
    },
    setup(props, context) {
      const { editerModel } = useEditModel()

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