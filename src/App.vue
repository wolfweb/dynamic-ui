<template>
  <el-config-provider :locale="zhCn">
    <div style="display: flex;">
      <router-link to="/">home</router-link>
      <router-link to="/design">design</router-link>
      <router-link to="/layout">layout</router-link>
    </div>
    <router-view #="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
  import { isUndefined } from 'lodash-es';
  import 'font-awesome/css/font-awesome.min.css';
  import zhCn from 'element-plus/lib/locale/lang/zh-cn';
  import { useAppStore } from '@/store/modules/appStore';
  import { createBreakpointListen } from '@/hooks/event/useBreakpoint';
  import { initEditModelContext, initAppContext } from '@/models/schema';
  
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