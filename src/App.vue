<template>
  <el-config-provider :locale="zhCn">
    <!-- 
      <router-link to="/">view</router-link>
      <router-link to="/design">design</router-link> 
    -->
    <Suspense>
      <AppProvider>
        <router-view #="{ Component, route }">
          <component :is="Component" :key="route.path" />
        </router-view>
      </AppProvider>
    </Suspense>
  </el-config-provider>
</template>

<script setup lang="ts">
  import '@icon-park/vue-next/styles/index.css';
  import 'mdb-ui-kit/css/mdb.min.css';

  import { isUndefined } from 'lodash-es';
  import zhCn from 'element-plus/lib/locale/lang/zh-cn';
  import { useAppStore } from '@/store/modules/appStore';
  import { createBreakpointListen } from '@/hooks/event/useBreakpoint';
  import { initEditModelContext, initAppContext } from '@/models/schema';
  import { AppProvider } from '@/components/application';
  
  initEditModelContext({title:'表单', callback:(state)=>{
    if(!isUndefined(window.initEditModelContextCallback)) {
      initEditModelContextCallback(state);
    }
  }});

  initAppContext(app=>{
    if(!isUndefined(window.initAppContextCallback)) {
      initAppContextCallback(app);
    }
    useAppStore().updateApp(app);    
  });

  createBreakpointListen(({ screenMap, sizeEnum, width }) => {
    const lgWidth = screenMap.get(sizeEnum.LG);
    if (lgWidth) {
       console.log( width.value - 1 , lgWidth);
    }
  });
</script>

<style lang="scss">
  @import 'styles/main'
</style>