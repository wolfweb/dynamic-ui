<template>
  <div>
    <el-button v-for="(menu,index) in TiptapMenus" type="primary" plain @click="()=>menuClick(menu)">
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
      editor: null
    },
    setup(props, context) {
      const { editor } = props;

      const menuClick = (menu)=>{
        console.log(editor);
        menu.action(editor);
      };

      return {
        menuClick,
        TiptapMenus,
      };
    }
  });
</script>