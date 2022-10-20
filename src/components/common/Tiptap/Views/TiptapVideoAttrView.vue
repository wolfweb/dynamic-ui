<template>
  <el-tabs>
    <el-tab-pane label="网络地址">
      <el-form label-width='20%'>
        <el-form-item label="地址">
          <el-input v-model="attr.src" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="本地上传">
      <el-upload drag accept="video/*">
        <el-icon size={40}><UploadFilled /></el-icon>
        <div>
          拖放文件或者单击上传
        </div>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
  <el-collapse v-model="collapseModel">
    <el-collapse-item title="高级设置" name="adv">
      <el-form label-width='20%'>
        <el-form-item label="显示标题">
          <el-input v-model="attr.title" />
        </el-form-item>
        <el-form-item label="大小">
          <el-col :span="10"><el-input v-model="attr.width" /></el-col>
          <el-col :span="2" style="text-align:center">×</el-col>
          <el-col :span="10"><el-input v-model="attr.height" /></el-col>
        </el-form-item>
        <el-form-item label="自动播放">
          <el-switch v-model="attr.autoplay" />
        </el-form-item>
        <el-form-item label="启用视频控制">
          <el-switch v-model="attr.controls" />
        </el-form-item>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { UploadFilled } from '@element-plus/icons-vue';

  export default defineComponent({
    name: 'TiptapVideoAttrView',
    components:{
      UploadFilled
    },
    props: {
      attr: {
        type: Object,
        default: null
      },
      showAdv: {
        type: Boolean,
        default: false
      }
    },
    setup(props, context) {
      const collapseModel = ref(props.showAdv? 'adv' : null);
      return {
        collapseModel
      }
    }
  });
</script>