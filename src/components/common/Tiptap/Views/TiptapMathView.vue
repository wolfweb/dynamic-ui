<template>
  <node-view-wrapper class="math-block">
    <div class="preview">
      <p v-html="mathHtml" />
    </div>
  </node-view-wrapper>
</template>
<script lang="ts">
  import katex from 'katex';
  import { NodeViewWrapper } from '@tiptap/vue-3';
  import { defineComponent, ref, computed } from 'vue';

  export default defineComponent({
    name: "TiptapMathView",
    components:{
      NodeViewWrapper
    },
    setup(props, context){
      // @ts-ignore
      const { tex } = props.node.attrs;
      const mathTex = ref(tex);

      const mathHtml = computed(()=> katex.renderToString(mathTex.value, { displayMode: true }) );
      console.log(mathHtml.value);

      return {
        mathHtml
      };
    }
  });
</script>
<style lang="less" scoped>
  .math-block {
    position: relative;
    max-width: 100%;
    box-sizing: border-box;
    line-height: 0;
    float: none;
    vertical-align: baseline;
    padding: 0 5px;

    .preview {
      padding: 10px;
      box-sizing: border-box;
      border: 1px dashed rgb(224,224,230);
      border-radius: 3px;
      min-height: 80px;
      font-size: 20px;
    }
  }
</style>