<template>
  <node-view-wrapper>
    <div v-html="editContext.svg" :style="`height:${editContext.height}px`"></div>
  </node-view-wrapper>
</template>
<script lang="ts">
  import mermaid from 'mermaid';
  import {defineComponent, reactive} from 'vue';
  import { NodeViewWrapper } from '@tiptap/vue-3';

  export default defineComponent({
    name: 'TiptapDiagramView',
    components:{
      NodeViewWrapper
    },
    setup(props, context){
      // @ts-ignore
      const { code } = props.node.attrs;

      mermaid.mermaidAPI.initialize({
        securityLevel: 'loose',
        sequence: { showSequenceNumbers: true }
      });

      const editContext = reactive({
        code: code,
        svg: null
      });

      mermaid.mermaidAPI.render(`svg-${new Date().getTime()}`, editContext.code, res => editContext.svg = res);

      return {
        editContext
      };
    }
  });


</script>