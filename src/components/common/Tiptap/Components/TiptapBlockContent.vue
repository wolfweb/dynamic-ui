<template>
  <section class="block-content" :class="{ 'fullscreen': fullScreen, 'selected': selected }">
    <el-row class="block-toolbar" :gutter="12" v-if="toolbar">
      <el-col :span="18">
        <slot name="toolbar-left"></slot>
      </el-col>
      <el-col :span="6">
        <el-button @click="onToggleScreen">
          <el-icon><FullScreen /></el-icon>
        </el-button>
        <slot name="toolbar-right"></slot>
      </el-col>
    </el-row>
    <section v-else class="block-inner-toolbar">
      
    </section>
    <slot></slot>
  </section>
</template>
<script lang="ts">
  import { defineComponent, watch, ref } from 'vue';
  export default defineComponent({
    name: "TiptapBlockContent",
    props:{
      selected: {
        type: Boolean,
        default: false
      },
      toolbar: {
        type: Boolean,
        default: true
      }
    },
    emits:['toggle-screen'],
    setup(props, context){
      const fullScreen = ref(false);

      const onToggleScreen = (e) => {
        fullScreen.value = true;
        this.$emit('toggle-screen', fullScreen);
      };

      return {
        fullScreen,
        onToggleScreen
      };
    }
  });
</script>

<style lang="scss" scoped>
  .block-content{
    position: relative;
    min-height: 40px;
    background: #ffffff;

    .block-toolbar {
      position: absolute;
      top: -44px;
      width: 100%;
      height: 40px;
      margin: 4px 0;
      line-height: 2.3rem;
      background: #efefef;
      border:-radius 5px;
      visibility: hidden;
    }

    .block-inner-toolbar {
      position: absolute;
      top: 10px;
      right: 10px;
      visibility: hidden;
    }

    &.selected {
      .block-toolbar {
        visibility: visible;
      }
    }


    &:hover {
      .block-toolbar {
        visibility: visible;
      }
      .block-inner-toolbar {
        visibility: visible;
        z-index: 1000;
      }
      .block-content {
        background: rgba(0,0,0,0.02);
      }
    }
  }
</style>