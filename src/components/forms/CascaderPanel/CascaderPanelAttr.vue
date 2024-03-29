<template>
  <el-form ref="form" :model="element" label-width="20%">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="标签" prop="attributes.label">
          <el-input v-model="element.attributes.label"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="字段名" prop="dataBinder.name" required>
          <el-input v-model="element.dataBinder.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="可多选" prop="attributes.multiple">
          <el-switch v-model="element.attributes.multiple" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="display: content">
      <el-col :span="24">
        <el-form-item label="数据" prop="attributes.options">
          <template #label="{label}"><span title="右键可以操作哦">{{label}}<el-icon><QuestionFilled/></el-icon></span></template>
          <el-tree :data="element.attributes.options" accordion @node-contextmenu="treeContextMenu" title="右键试试吧！">
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <el-col :span="24">
                  <span>{{node.label}}</span>
                </el-col>
              </span>
            </template>
          </el-tree>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-button size="small" style="width:100%;" type="default" @click="(e)=> addChild(e, null) ">
          <el-icon><plus /></el-icon>
          <span>新增</span>
        </el-button>
      </el-col>
    </el-row>
    <el-divider>验证</el-divider>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="是否必填" prop="attributes.required">
          <el-switch v-model="element.attributes.required" @change="requireChangeHandler" />
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
<script lang="tsx">
  import { useEditModel } from '@/models/schema';
  import { showDialog } from '@/hooks/web/useDialog';
  import { defineComponent, reactive } from 'vue';
  import { ElForm, ElFormItem, ElInput } from 'element-plus';
  import { useContextMenu } from '@/hooks/web/useContextMenu';
  
  import Validation from '@/components/common/Validation.vue';

  export default defineComponent({
    name: "CascaderPanelAttr",
    components:{
      Validation
    },
    methods:{
      remove(node, data){
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex((d) => d.value === data.value);
        children.splice(index, 1);
      },
      removeChild(idx) {
        this.element.attributes.options.splice(idx, 1);
      },
      addChild(e: MouseEvent, treeNode: Nullable<Tree>) {
        const item = reactive({
          label: "选项",
          value: "option",
          children: []
        });
        showDialog({
          title: "配置",
          props:{
            width: 600
          },
          content: ()=> (
            <ElForm>
              <ElFormItem>
                <ElInput type="text" placeholder="请输入子项名" v-model={item.label} />            
              </ElFormItem>
              <ElFormItem>
                <ElInput type="text" placeholder="请输入子项值" v-model={item.value} />
              </ElFormItem>
            </ElForm>
          ),
          onConfirm: ()=>{
            if(treeNode && treeNode.children){
              treeNode.children.push(item);
            }else{
              this.element.attributes.options.push(item);
            }
          }
        });
      },
      treeContextMenu(e, data, node, tree){
        let contextMenuOptions: CreateContextOptions = { 
          event: e, 
          styles: {
            "border": "1px solid #fff"
          },
          items: [
          {
            icon: 'Plus',
            label:'新建',
            handler: ()=> {
              this.addChild(null, data);
            }
          },
          {
            icon: 'Delete',
            label: '删除',
            handler: ()=> {
              this.remove(node, data);
            }
          }
        ]};
        this.createContextMenu(contextMenuOptions);
      }
    },
    setup(props, context) {
      const { currentElement, requireChangeHandler } = useEditModel();

      const [createContextMenu] = useContextMenu();

      const element = reactive(
        // @ts-ignore
        currentElement.value as IFormElementMetadata
      );
      
      return {
        element,
        createContextMenu,
        requireChangeHandler
      }
    }
  })
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
</style>