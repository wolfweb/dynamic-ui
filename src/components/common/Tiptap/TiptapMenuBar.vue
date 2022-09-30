<template>
  <div class="editor_menu">
    <template v-for="(menu, index) in tiptapMenus">
      <el-dropdown v-if="menu.children" @command="x=> menuChildHandler(menu,x) ">
        <el-button type="primary" plain style="padding:8px 4px;">
          <component :is="menu.icon"></component>
          <el-icon style="width:10px"><CaretBottom /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(child, idx) in menu.children" :command="child.command">
              <component :is="child.icon"></component>
              {{child.title}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-divider v-else-if="menu.divider" direction="vertical"></el-divider>
      <el-popover v-else-if="menu.popover" trigger="hover" placement="bottom" width="250">
        <template #reference>
          <el-button type="primary" plain class="editor_menu_item" :title="menu.title">
            <component :is="menu.icon"></component>
          </el-button>
        </template>
        <component :is="menu.popover.component" :editor="editor"></component>
      </el-popover>
      <el-button v-else type="primary" plain @click="()=>menuClick(menu)" class="editor_menu_item" :title="menu.title">
        <component :is="menu.icon"></component>
      </el-button>
    </template>
  </div>
</template>
<script lang="ts">
  import { TiptapMenus } from './MenuConfig';
  import { defineComponent, reactive } from 'vue';
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
      const tiptapMenus = props.menus || TiptapMenus;

      const menuClick = (menu, ...args)=>{
        menu.action(props.editor, args);
      };

      const menuChildHandler = (menu, cmd) => {
        menu.action(props.editor, cmd);
      }

      return {
        menuClick,
        tiptapMenus,
        menuChildHandler
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

  .el-button{
    border: none;
    height: 32px;
    margin-right:0px;
    border-radius: unset;
  }

  .el-button+.el-button{
    margin-left: 0;
    margin-bottom: 2px;
    border-radius:unset;
  }

  /* .el-button:first-child {
    border-radius: 5px 0 0 5px;
  }

  .el-button:last-child{
    border-radius: 0 5px 5px 0;
  } */

  .el-dropdown .el-dropdown__caret-button {
    width: 16px;
  }

  .el-divider--vertical{
    margin:0; 
    padding: 0; 
    height: 32px
  }
  
</style>