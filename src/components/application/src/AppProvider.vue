<script lang="ts">
  import { ElLoading } from 'element-plus';
  import { createAppProviderContext } from './useAppContext';
  import { defineComponent ,getCurrentInstance } from 'vue';
  import { useSchemaStore } from '@/store/modules/schemaStore';
  import { useEditModel } from '@/models/schema';
  import { formInitialize } from '@/models/formSchemaService';
  import { layoutInitialize } from '@/models/layoutSchemaService';

  import { getPlugins, initEditorPlus } from '@/components/component.config';

  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    async setup(props, { slots }){
      const { proxy } = getCurrentInstance();

      createAppProviderContext({
        App: proxy.$$app
      });

      const schemaStore = useSchemaStore();
      const { editerModel } = useEditModel();

      const loading = ElLoading.service({
        lock: true,
        text: '正在初始化组件',
        background: 'rgba(0, 0, 0, 0.7)',
      });

      if(schemaStore.Mode == 'Form'){
        formInitialize(proxy.$$app, editerModel);
      }else if(schemaStore.Mode == 'Layout'){
        layoutInitialize(proxy.$$app, editerModel);
      }else if(schemaStore.Mode == 'Liquid'){
        
      }

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