<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-input 
    :type="meta.attributes.type" 
    :name="meta.dataBinder.name" 
    :maxlength="meta.attributes.maxlength"
    :minlength="meta.attributes.minlength"
    :clearable="meta.attributes.clearable" 
    :placeholder="meta.attributes.placeholder"
    :prefix-icon="meta.attributes['prefix-icon']"
    :suffix-icon="meta.attributes['suffix-icon']"
    :show-password="meta.attributes['show-password']"
    :show-word-limit="meta.attributes['show-word-limit']"
    v-model="formModel[meta.dataBinder.name]"
    >      
    </el-input>
  </el-form-item>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useEditModel } from '@/models/schema';
  export default defineComponent({
    name: "Input",
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