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
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: "Slider",
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