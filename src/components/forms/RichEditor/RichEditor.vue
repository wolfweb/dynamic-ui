<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :rules="descriptor">
    <editor 
      v-model="formModel[meta.dataBinder.name]"
      :placeholder="meta.attributes.placeholder"
    />
  </el-form-item>
</template>
<script lang="ts">
  import { useEditModel } from '@/models/schema';
  import { defineComponent, computed, watch } from 'vue';
  import editor from '@/components/common/Tiptap/Index.vue';
  
  export default defineComponent({
    name: "RichEditor",
    components: {
      editor
    },
    props: {
      meta:null
    },
    setup(props, context) {
      const { formModel, ensureFormModelInit } = useEditModel();

      if(props.meta){
        ensureFormModelInit(props.meta);
      }

      const descriptor = computed(()=>{
        return props.meta.validation.map(x=>x.rule);
      }).value;

      return {
        formModel,
        descriptor,
      }
    }
  })
</script>

<style>
  .richEditor{
    min-width: 440px;
    min-height: 300px;
  }
</style>