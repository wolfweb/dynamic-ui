<template>
  <node-view-wrapper>
    <el-popover trigger="hover" placement="right" :width="74">
      <el-button @click="onImageEdit">
        <el-icon><Edit /></el-icon>
      </el-button>
      <template #reference>
        <el-image :src="imgAttr.src" :preview-src-list="[imgAttr.src]" :alt="imgAttr.alt" :style="{'width': imgAttr.width, 'height': imgAttr.height}" />
      </template>
    </el-popover>
  </node-view-wrapper>
</template>
<script lang="ts">
  import ImageAttrView from './TiptapImageAttrView.vue';

  import { defineComponent, ref, h } from 'vue';
  import { NodeViewWrapper } from '@tiptap/vue-3';
  import { showDialog } from '@/hooks/web/useDialog';

  export default defineComponent({
    name: "TiptapImageView",
    components: {
      NodeViewWrapper
    },
    props:{
      selected: {
        type: Boolean,
        default: false,
      }
    },
    setup(props, context) {
      // @ts-ignore
      const imgAttr = props.node.attrs;

      const onImageEdit = (e) => {
        showDialog({
          title:"图片设置",
          props:{width: 600},
          content: ()=> h(ImageAttrView, { attr: imgAttr, showAdv: true })
        });
      };
      
      return {
        imgAttr,
        onImageEdit
      };
    }
  });
</script>