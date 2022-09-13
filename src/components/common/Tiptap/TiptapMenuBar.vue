<template>
  <div class="editor_menu">
    <el-button v-for="(menu,index) in tiptapMenus" type="primary" plain @click="()=>menuClick(menu)" class="editor_menu_item" :title="menu.title">
      <component :is="menu.icon"></component>
    </el-button>
  </div>
</template>
<script lang="ts">
  import { TiptapMenus } from './MenuConfig';
  import { defineComponent, ref } from 'vue';
  import * as icons from '@icon-park/vue-next';

  export default defineComponent({
    name: 'TiptapMenuBar',
    components:{
      ...icons
    },
    props: {
      editor: null,
      menus: null
    },
    setup(props, context) {
      const { editor } = props;
      const tiptapMenus = props.menus || TiptapMenus;

      const menuClick = (menu)=>{
        menu.action(props.editor);
      };

      return {
        menuClick,
        tiptapMenus,
      };
    }
  });
</script>
<style lang="less">
  .editor_menu{
    padding: 2px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid #ccc;
    &_item{
      width: 30px;
      height: 30px;
    }
  }

  .el-button+.el-button{
    margin-right:2px;
    margin-left: 0;
    margin-bottom: 2px;
  }
  
</style>