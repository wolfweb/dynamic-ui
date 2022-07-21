<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :required="meta.attributes.required" :rules="descriptor">
    <el-input
      type="textarea"
      :maxlength="meta.attributes.maxlength"
      :minlength="meta.attributes.minlength"
      :show-word-limit="meta.attributes['show-word-limit']"
      :placeholder="meta.attributes.placeholder"
      :rows="meta.attributes.rows"
      v-model="formModel[meta.dataBinder.name]" 
    />
  </el-form-item>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEditModel } from '@/models/schema'
  export default defineComponent({
    name: "Textarea",
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