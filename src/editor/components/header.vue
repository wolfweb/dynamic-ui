<template>
  <el-row type="flex" class="header">
    <el-col :span="6" class="flex items-center">
      <div class="logo"></div>
      <h3 class="font-semibold">可视化UI设计系统</h3>
    </el-col>
    <el-col class="flex items-center" :span="12">
      <template v-for="(toolItem, toolIndex) in tools" :key="toolIndex">
        <div :class="[`w-1/${tools.length}`]" class="w-1/9">
          <div class="tool-item flex flex-col items-center cursor-pointer" @click="toolItem.onClick">
            <i :class="toolItem.icon"></i>
            <div class="title">{{ toolItem.title }}</div>
          </div>
        </div>
      </template>
    </el-col>
  </el-row>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { actions } from '../actions'
  export default defineComponent({
    name: 'Header',
    setup() {
      const state = reactive({
        isShowH5Preview: false
      })
      const BASE_URL = ""
      const tools = actions()

      return {
        ...toRefs(state),
        tools,
        BASE_URL
      }
    }
  })
</script>
<style lang="scss" scoped>
  .header {
    width: 100%;

    .logo {
      width: 102px;
      height: 75px;
      background-image: url('@/assets/logo.svg');
      background-repeat: no-repeat;
      background-size: contain;
    }

    .tool-item {
      .title {
        margin-top: 4px;
        font-size: 12px;
      }
    }

    .el-button {
      font-size: 22px;
    }

    .right-tools>* {
      margin-left: 8px;
    }
  }
</style>