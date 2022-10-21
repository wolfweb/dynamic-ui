<template>
  <el-form-item :label="meta.attributes.label" :prop="meta.dataBinder.name" :rules="descriptor">
    <editor v-model="editorContent" />
  </el-form-item>
</template>
<script lang="ts">
  import { useEditModel } from '@/models/schema';
  import { defineComponent, computed, ref } from 'vue';
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
      const { editerModel } = useEditModel();

      if(props.meta){
        editerModel.emitter.emit("onElementLoading", props.meta);
      }

      const formModel = editerModel.attributes.formViewAttr.model;

      const editorContent = computed(()=>{
        const mv = formModel[props.meta.dataBinder.name];
        if(mv) return mv;
        return props.meta.attributes.placeholder;
      }).value;


      const descriptor = props.meta.validation.map(x=>x.rule);

      return {
        editorContent,
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