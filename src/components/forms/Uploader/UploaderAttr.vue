<template>
  <el-form ref="form" :model="element!" label-width="23%">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="标签" prop="attributes.label">
          <el-input v-model="element!.attributes.label"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="字段名" prop="dataBinder.name">
          <el-input v-model="element!.dataBinder!.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="上传接口" prop="attributes.action">
          <el-input v-model="app!.uploadUrl" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="资源移除接口" prop="attributes.removeApi">
          <el-input v-model="app!.mediaRemoveApi" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="上传类型" prop="attributes.accept">
          <el-input v-model="element!.attributes.accept" type="textarea" :rows="2" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="上传图标" prop="attributes.uploadIcon">
          <el-select v-model="element!.attributes.uploadIcon" filterable placeholder="请选择" style="width: 100%;">
            <el-option key="" value="">无</el-option>
            <el-option v-for="item in ElIcons" :value="item.name">
              <span>
                <el-icon>
                  <component :is="item.name" />
                </el-icon>
                {{item.name}}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="上传提示" prop="attributes.accept">
          <el-input v-model="element!.attributes.tip" autosize />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="上传大小(M)" prop="attributes.limit">
          <el-input-number v-model="element!.attributes.limit" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="列表类型" prop="attributes['list-type']">
          <el-select v-model="element!.attributes['list-type']">
            <el-option value="text">文本</el-option>
            <el-option value="picture">图片</el-option>
            <el-option value="picture-card">图片卡片</el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="允许多选" prop="attributes.multiple">
          <el-switch v-model="element!.attributes.multiple" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="允许拖拽" prop="attributes.drag">
          <el-switch v-model="element!.attributes.drag" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="自动上传" prop="attributes['auto-upload']">
          <el-switch v-model="element!.attributes['auto-upload']" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider>验证</el-divider>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="是否必填" prop="attributes.required">
          <el-switch v-model="element!.attributes.required" @change="requireChangeHandler" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <validation />
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
  import draggable from 'vuedraggable';
  import { ElIcons } from '@/models/common';
  import { useEditModel } from '@/models/schema';
  import { defineComponent, reactive } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useAppStore } from '@/store/modules/appStore';
  import Validation from '@/components/common/Validation.vue';
  export default defineComponent({
    name: "UploaderAttr",
    components:{
      draggable,
      Validation    
    },
    methods:{
      removeChild(idx) {
        this.element.attributes.options.splice(idx, 1)
      },
      addChild() {
        this.element.attributes.options.push({ label: "", key: "" })
      }
    },
    setup(props, context) {
      const { currentElement, requireChangeHandler } = useEditModel();

      const { message } = useMessage();

      const app = useAppStore().AppContext;

      const element = reactive(
        // @ts-ignore
        currentElement.value as IFormElementMetadata
      );

      if(app == null){
        message.error("请先配置应用信息");
      }

      return {
        requireChangeHandler,
        element,
        ElIcons,
        app
      }
    }
  })
</script>