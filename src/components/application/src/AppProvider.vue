<script lang="ts">
  import { ElLoading } from 'element-plus';
  import { createAppProviderContext } from './useAppContext';
  import { defineComponent ,getCurrentInstance } from 'vue';
  import { useSchemaStore } from '@/store/modules/schemaStore';
  import { useEditModel } from '@/models/schema';
  import { initialize } from '@/models/formSchemaService';
  import { getPlugins, initEditorPlus } from '@/components/component.config';

  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    async setup(props, { slots }){
      const { proxy } = getCurrentInstance();

      const schemaStore = useSchemaStore();
      const { editerModel } = useEditModel();

      initialize(proxy.$$app, editerModel);

      createAppProviderContext({
        App: proxy.$$app
      });

      const loading = ElLoading.service({
        lock: true,
        text: '正在初始化组件',
        background: 'rgba(0, 0, 0, 0.7)',
      });

      const plugins = await getPlugins(schemaStore.Mode);

      loading.setText("正在装载组件");

      initEditorPlus(proxy.$$app);

      setTimeout(()=>{ 
        loading.close();
      }, 400);      

      return () => slots.default?.();
    }
  });  
</script>