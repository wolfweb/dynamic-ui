<template>
  <node-view-wrapper>
    <ContentBlock>
      <template #toolbar-right>
        <el-button @click="onVideoEdit">
          <el-icon><Edit /></el-icon>
        </el-button>
      </template>
      <videoPlay v-bind="options"></videoPlay>
    </ContentBlock>
  </node-view-wrapper>
</template>
<script lang="ts">
  import "vue3-video-play/dist/style.css";

  import VideoAttrView from './TiptapVideoAttrView.vue';
  import ContentBlock from '../Components/TiptapBlockContent.vue';

  import { videoPlay } from "vue3-video-play";
  import { NodeViewWrapper } from '@tiptap/vue-3';
  import { defineComponent, reactive, watch  } from 'vue';
  import { showDialog } from '@/hooks/web/useDialog';

  export default defineComponent({
    name: "TiptapVideoView",
    components: {
      NodeViewWrapper,
      ContentBlock,
      videoPlay
    },
    props:{
      selected: {
        type: Boolean,
        default: false,
      }
    },
    setup(props, context) {
      // @ts-ignore
      const videoAttr = props.node.attrs;

      const options = reactive({
        src: videoAttr.src,
        title: videoAttr.title,
        width: videoAttr.width,
        height: videoAttr.height,
        control: videoAttr.controls,
        autoPlay: videoAttr.autoplay,
      });

      watch(
        ()=> videoAttr, 
        (v)=>{
          options.src = v.src;
          options.width = v.width;
          options.title = v.title,
          options.height = v.height;
          options.control = v.controls;
          options.autoPlay = v.autoplay;
        },
        {deep: true}
      );

      const onVideoEdit = (e) => {
        showDialog({
          title:"图片设置",
          props:{width: 600},
          content: ()=> h(VideoAttrView, { attr: videoAttr, showAdv: true })
        });
      };

      return {
        options,
        onVideoEdit
      };
    }
  });
</script>