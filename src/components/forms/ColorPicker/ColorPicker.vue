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
      const { editerModel } = useEditModel();

      const descriptor = props.meta.validation.map(x=>x.rule);

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