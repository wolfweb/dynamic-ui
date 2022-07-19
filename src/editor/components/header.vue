<template>
  <el-row type="flex" class="header">
    <el-col :span="6" class="flex items-center">
      <div class="logo"></div>
      <h3 class="font-semibold">可视化UI设计系统</h3>
    </el-col>
    <el-col class="flex items-center" :span="12">
      <el-menu mode="horizontal">
        <el-menu-item v-for="(item,index) in tools" :key="index" @click.native="item.onClick">
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            {{item.title}}
          </template>
        </el-menu-item>
      </el-menu>
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

    .el-button {
      font-size: 22px;
    }
  }
</style>