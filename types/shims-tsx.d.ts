import Vue, { VNode, App } from 'vue'

declare module '*.tsx' {
  import Vue from 'compatible-vue'
  export default Vue
}

declare global {
  namespace JSX {
    type Element = VNode
    type ElementClass = Vue
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $$app: App
  }
}
