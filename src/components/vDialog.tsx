import { defineComponent, reactive, createApp, PropType, getCurrentInstance, ComponentInternalInstance, isVNode } from 'vue';
import { ElButton, ElDialog } from 'element-plus';
import { isFunction, isString } from 'lodash-es';

export interface DialogOptions {
  title?: string
  footer?: null | (() => JSX.Element)
  content: ComponentInternalInstance | (() => JSX.Element)
  onConfirm?: () => void
  onCancel?: () => void
  props?: {
    [propName: string]: any
  }
}

const Dialog = defineComponent({
  props: {
    options: {
      type: Object as PropType<DialogOptions>,
      default: () => ({})
    }
  },
  setup(props) {
    const instance = getCurrentInstance()!

    const state = reactive({
      options: props.options,
      visible: true
    })

    const methods = {
      service: (options: DialogOptions) => {
        state.options = options
        methods.show()
      },
      show: () => (state.visible = true),
      hide: () => (state.visible = false)
    }

    const handler = {
      onConfirm: async () => {
        await state.options.onConfirm?.()
        methods.hide()
      },
      onCancel: () => {
        state.options.onCancel?.()
        methods.hide()
      }
    }

    Object.assign(instance.proxy, methods)

    return () => (
      <ElDialog
        modelValue={state.visible}
        title={state.options.title}
        destroyOnClose={true}
        {...state.options.props}
        onClose={handler.onCancel}
      >
        {{
          default: () =>
            isVNode(state.options.content) ? (
              <content />
            ) : isFunction(state.options.content) ? (
              state.options.content()
            ) : null,
          footer: () =>
            state.options.footer === null ? null : (
              <div>
                <ElButton {...({ onClick: handler.onCancel } as any)}>取消</ElButton>
                <ElButton type={'primary'} {...({ onClick: handler.onConfirm } as any)}>
                  确定
                </ElButton>
              </div>
            )
        }}
      </ElDialog>
    )
  }
})

export const showDialog = (() => {
  let instance: any
  return (options: DialogOptions) => {
    if (instance) {
      instance.service(options)
      return instance
    }
    const div = document.createElement('div')
    document.body.appendChild(div)
    const app = createApp(Dialog, { options })
    instance = app.mount(div)
    return instance
  }
})()
