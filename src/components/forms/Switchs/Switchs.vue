<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-switch
      :width="meta.attributes.width"
      :active-text="meta.attributes['active-text']"
      :inactive-text="meta.attributes['inactive-text']"
      :active-color="meta.attributes['active-color']"
      :inactive-color="meta.attributes['inactive-color']"
      v-model="formModel[meta.dataBinder.name]" 
    />
  </el-form-item>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEditModel } from '@/models/schema'
  export default defineComponent({
    name: "Switchs",
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