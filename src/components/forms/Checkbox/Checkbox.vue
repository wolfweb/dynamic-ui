<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-checkbox-group v-model="formModel[meta.dataBinder.name]" style="width: 100%;">
      <template v-for="(item, index) in meta.attributes.options">
        <el-checkbox-button v-if="meta.attributes.useButton" :label="item.value" :border="meta.attributes.border">
          {{ item.label }}
        </el-checkbox-button>
        <el-checkbox v-else :label="item.value" :border="meta.attributes.border">
          {{ item.label }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
  </el-form-item>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEditModel } from '@/models/schema'
  export default defineComponent({
    name: "Checkbox",
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