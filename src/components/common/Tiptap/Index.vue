<template>
  <div class="editor-box">
    <bubble-menu
      v-if="enableBubbleMenu && editor"
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
      enableBubbleMenu: {
        type: Boolean,
        default: true
      },
      modelValue: {
        type   : String,
        default: ''
      }
    },
    emits:['update:modelValue'],
    setup(props, context) {
      const isFocused = ref(false);

      const editor = useEditor({
        content: props.modelValue,
        extensions: [ StarterKit ],
        onUpdate: ({ editor }) => {
          const res = editor.getHTML();
          console.log(res);
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
    min-height: 120px;
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
        line-height: 1.7;
        overflow-x: auto;
        text-align: left;

        > * {
          box-sizing: border-box;
        }

        ::selection {
          background: rgba(102, 211, 255, 0.82);
        }

        p {
          margin-bottom: 0;
          margin-top: 0;
          outline: none;
        }

        a {
          color: #409eff;
          cursor: pointer;
        }

        code {
          background-color: #d9ecff;
          border-radius: 4px;
          color: #409eff;
          display: inline-block;
          font-size: 14px;
          font-weight: 700;
          padding: 0 8px;
        }

        mark {
          display: inline-block; 
        }

        pre {
          display: flex;
          margin: 10px 0;
          overflow-x: auto;
          padding: 14px 20px;
          border-radius: 5px;
          background-color: rgb(197 197 197 / 15%);
        }

        blockquote {
          border-left: 5px solid #edf2fc;
          border-radius: 2px;
          color: #606266;
          margin: 10px 0;
          padding-left: 1em;
        }

        ul, ol {
          counter-reset: none;
          list-style-type: none;
          margin-bottom: 0;
          margin-left: 24px;
          margin-top: 0;
          padding-bottom: 5px;
          padding-left: 0;
          padding-top: 5px;
        }

        li > p {
          margin: 0;
        }

        li > p:first-child::before {
          content: counter(el-tiptap-counter) ".";
          display: inline-block;
          left: -5px;
          line-height: 1;
          margin-left: -24px;
          position: relative;
          text-align: right;
          top: 0;
          width: 24px;
        }

        ul li > p:first-child::before {
          content: '\2022';
          text-align: center;
        }

        ol {
          counter-reset: el-tiptap-counter;
        }

        ol li > p:first-child::before {
          counter-increment: el-tiptap-counter;
        }

        ul[data-type=taskList] {
          margin-left: 5px;
        }

        ul[data-type=taskList] li {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          margin-bottom: 0;
          align-items: center;
        }

        ul[data-type=taskList] li label {
          display: flex;
          align-items: center;
          margin-top: 2px;
          margin-right: 5px;
          justify-content: flex-start;
          margin-left: -2px;
        }
      }
    }
  
    .focus {
      border-color: #fff;
      box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.2);
    }
  }

</style>