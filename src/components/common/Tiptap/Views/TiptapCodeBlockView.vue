<template>
  <node-view-wrapper as="p" class="editor_codeblock">
    <el-dropdown @command="changeLang">
      <span class="el-dropdown-link">{{selectedLanguage || 'auto'}}</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(lang,index) in languages" :command="lang">{{lang}}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <pre>
      <node-view-content />
    </pre>
  </node-view-wrapper>
</template>
<script lang="ts">
  import 'highlight.js/styles/vs.css';
  import { defineComponent, ref, watch} from 'vue';
  import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3';

  export default defineComponent({
    name: 'TiptapCodeBlockView',
    components:{
      NodeViewContent,
      NodeViewWrapper
    },
    setup(props, context) {
      // @ts-ignore
      const languages = props.extension.options.lowlight.listLanguages().map(x => x);

      languages.unshift('auto');

      // @ts-ignore
      const selectedLanguage = ref(props.node.attrs.language);

      const changeLang = (x) => {
        selectedLanguage.value = x;
      }

      watch(selectedLanguage, () => {
        if (selectedLanguage.value === 'auto') {
          // @ts-ignore
          props.updateAttributes({ language: null })
        } else {
          // @ts-ignore
          props.updateAttributes({ language: selectedLanguage.value })
        }
      });

      return {
        languages,
        changeLang,
        selectedLanguage
      }
    }
  })
</script>
<style lang="scss">
  .editor_codeblock{
    position: relative;

    .el-dropdown{
      top: 4px;
      right: 0;
      padding: 0 10px;
      border-radius: 4px;
      position: absolute;
    }
  }
</style>