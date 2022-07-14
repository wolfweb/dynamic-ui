import { Monaco } from './monaco'
import { defineComponent, onMounted, PropType, shallowRef, ref, onBeforeUnmount, watch } from 'vue'
import styles from './MonacoEditor.module.scss'
let subscription: Monaco.IDisposable | undefined
let preventTriggerChangeEvent = false

export default defineComponent({
  name: 'MonacoEditor',
  props: {
    code: {
      type: String as PropType<string>,
      required: true
    },
    layout: {
      type: Object as PropType<Monaco.editor.IDimension>,
      required: true,
      default: () => ({})
    },
    options: {
      type: Object as PropType<Monaco.editor.IStandaloneEditorConstructionOptions>,
      default: () => ({})
    },
    vid: [String, Number],
    onChange: {
      type: Function as PropType<
        (value: string, event: Monaco.editor.IModelContentChangedEvent) => void
      >
    },
    title: {
      type: String as PropType<string>,
      default: ''
    },
    lang: {
      type: String as PropType<string>,
      default: 'json'
    }
  },
  setup(props) {
    const editorRef = shallowRef<Monaco.editor.IStandaloneCodeEditor | null>(null)
    const containerDomRef = ref(null)
    const formatCode = () => {
      window.requestIdleCallback(
        () => {
          editorRef.value!.getAction('editor.action.formatDocument').run()
        },
        { timeout: 800 }
      )
    }

    onMounted(() => {
      editorRef.value = Monaco.editor.create(containerDomRef.value!, {
        value: props.code,
        theme: 'vs-dark', 
        language: props.lang, 
        formatOnPaste: true, 
        tabSize: 2, 
        minimap: {
          enabled: false 
        },
        fontFamily: '微软雅黑', 
        automaticLayout: true, 
        overviewRulerBorder: false,
        scrollBeyondLastLine: false, 
        ...props.options
      })

      subscription = editorRef.value.onDidChangeModelContent((event) => {
        if (!preventTriggerChangeEvent) {
          props.onChange?.(editorRef.value!.getValue(), event)
        }
      })
      formatCode()
      editorRef.value.layout(props.layout)
    })

    onBeforeUnmount(() => {
      if (subscription) {
        subscription.dispose()
      }
    })
    
    const refreshEditor = () => {
      if (editorRef.value) {
        const editor = editorRef.value
        const model = editor.getModel()

        if (model && props.code !== model.getValue()) {
          editor.pushUndoStop()
          preventTriggerChangeEvent = true
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: props.code
              }
            ],
            () => null
          )
        }

        editor.pushUndoStop()
        preventTriggerChangeEvent = false
        formatCode()
      }
    }

    watch(() => props.vid, refreshEditor, { immediate: true })

    return () => {
      return (
        <div class={styles.container}>
          {props.title && (
            <div class={styles.title}>
              <span>{props.title}</span>
            </div>
          )}
          <div class={styles.code} ref={containerDomRef}></div>
        </div>
      )
    }
  }
})
