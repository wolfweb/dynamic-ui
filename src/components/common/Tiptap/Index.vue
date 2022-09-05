<template>
  <div>
    <editor-content :editor="editor"></editor-content>
  </div>
</template>
<script lang="ts">
  import StarterKit from './TiptapInit';
  import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "TiptapEditor",
    components:{
      EditorContent
    },
    setup(props, context) {
      const editor = useEditor({
        content: '内容',
        extensions: [ StarterKit ],
      });

      return {
        editor
      }
    }
  })
</script>