import type { Directive, App } from 'vue'

const loadingDirective: Directive = {
  mounted(el, binding){
    //todo: 
    
  },
  updated(el, binding){
    const instance = el.instance;
    if (!instance) return;
    instance.setTip(el.getAttribute('loading-tip'));
    if (binding.oldValue !== binding.value) {
      if (binding.oldValue !== binding.value) {
        instance.setLoading?.(binding.value && !instance.loading);
      }
    }
  },
  unmounted(el){
    el?.instance?.close();
  }
}


export default loadingDirective