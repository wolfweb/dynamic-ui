<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-color-picker v-model="formModel[meta.dataBinder.name]"  :show-alpha="meta.attributes['show-alpha']" :color-format="meta.attributes['color-format']" />
  </el-form-item>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEditModel } from '@/models/schema'
  export default defineComponent({
    name: "ColorPicker",
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