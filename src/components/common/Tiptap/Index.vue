<template>
  <div class="editor-box">
    <bubble-menu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100, maxWidth:600,placement:'top-start' }"
    >
      bubble-menu
    </bubble-menu>
    <div class="editor" :class="{'focus':isFocused}">
      <menu-bar :editor="editor" />
      <editor-content class="editor_body" :editor="editor" ></editor-content>
    </div>
  </div>
</template>
<script lang="ts">
  import StarterKit from './TiptapInit';
  import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3';
  import { defineComponent, watch, onMounted, onBeforeUnmount, ref } from 'vue';
  import MenuBar from './TiptapMenuBar.vue';

  export default defineComponent({
    name: "TiptapEditor",
    components:{
      MenuBar,
      BubbleMenu,
      EditorContent
    },
    props: {
      placeholder: {
        type: String,
        default: ''
      }
    },
    emits:['update:modelValue'],
    setup(props, context) {
      const isFocused = ref(false);

      const editor = useEditor({
        content: props.modelValue || props.placeholder,
        extensions: [ StarterKit ],
        onUpdate: ({ editor }) => {
          const res = editor.getHTML();
          context.emit('update:modelValue', res);
        },
        onFocus: () => {
          isFocused.value = true;
        },
        onBlur: () => {
          isFocused.value = false;
        },
      });

      onMounted(() => {
        context.emit('update:modelValue', editor.value.getHTML());
      })

      onBeforeUnmount(() => {
        editor.value.destroy()
      })

      return {
        editor,
        isFocused
      }
    }
  })
</script>
<style lang="less">
  .ProseMirror {
      outline: 0;
  }

  .editor-box {
    width: 100%;
    height: 100%;

    .editor {
      border: 1px solid #e0e0e6;
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      min-height: 400px;
      transition-property: border-color, box-shadow;
      transition-duration: 0.2s;
      background: #ffffff;
  
      &_body {
        box-sizing: border-box;
        flex: 1 1 auto;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        padding: 10px;
      }
    }
  
    .focus {
      border-color: #fff;
      box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.2);
    }
  }

</style>