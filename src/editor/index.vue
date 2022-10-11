<template>
  <el-container>
    <el-header height="80px" class="flex items-center shadow-md">
      <Header />
    </el-header>
    <el-container class="layout-container">
      <el-aside class="shadow-sm" width="246px">
        <suspense>
          <left-panel />
        </suspense>
      </el-aside>
      <el-main>
        <Main />
        <right-panel />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { createAsyncComponent } from '@/components/createAsyncComponent';
  export default defineComponent({
    components: {
      Header: createAsyncComponent(() => import('./components/header.vue')),
      LeftPanel : createAsyncComponent(() => import('./components/left-panel/left-panel.vue')),
      RightPanel: createAsyncComponent(() => import('./components/right-panel/index.vue')),
      Main : createAsyncComponent(() => import('./components/main.vue')),
    },
  });
</script>
<style lang="scss">
  .el-header,
  .el-footer {
    position: relative;
    z-index: 99;
    background-color: white;
  }
  
  .el-aside {
    background-color: white;
  }
  
  .layout-container {
    height: calc(100vh - 80px);
  }
  
  .el-main {
    position: relative;
    padding: 12px;
    background-color: #f5f5f5;
    @media (min-width: 1111px) {
      overflow-x: hidden;
    }
  }
  .el-tabs__content{ height: 100%; }
  
</style>
  