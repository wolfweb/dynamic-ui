import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import httpFactory from '@/utils/http';
import { showDialog } from '@/hooks/web/useDialog';
import { useEditModel } from '@/models/schema';
import { useAppStore } from '@/store/modules/appStore';
import { useSchemaStore } from '@/store/modules/schemaStore';
import { getWidgetCode } from '@/components/component.config';
import { createAsyncComponent } from '@/components/createAsyncComponent';
import MonacoEditor from '@/editor/components/monaco-editor/MonacoEditor';
import { Cellphone, Document, Download, Refrigerator, TakeawayBox, Upload, View } from '@element-plus/icons-vue';

export const actions = () =>{
  const app = useAppStore().AppContext;
  const router = useRouter();
  const { clearModelContext, formSchema, listSchema, detailSchema, appendFormSchema } = useEditModel();
  const schemaStore = useSchemaStore(formSchema.value);
  const state = reactive({
    jsonValue: JSON.stringify(schemaStore.Schema)
  })
  const importJsonChange = (value) => {
    clearModelContext();
    const schema = JSON.parse(value);
    schema.forEach(x => appendFormSchema(x));
    schemaStore.updateSchema(schema);
  }

  return [
    {
      title:'查看结构',
      icon: View,
      onClick: () => {
        showDialog({
          title: '表单结构',
          props: {
            width: 660
          },
          content: () => (
            <>
              <MonacoEditor
                code={JSON.stringify({ formSchema: formSchema.value, listSchema: listSchema.value, detailSchema: detailSchema.value })}
                layout={{ width: 700, height: 600 }}
              />
            </>
          )
        })
      }
    },
    {
      title:'导出结构',
      icon: Upload,
      onClick: () => {
        const code = JSON.stringify({ formSchema: formSchema.value, listSchema: listSchema.value, detailSchema: detailSchema.value });
        const blob = new Blob([code], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'schema.json';
        a.click();
        URL.revokeObjectURL(url);
      }
    },
    {
      title:'导入结构',
      icon: Download,
      onClick: () => {
        showDialog({
          title: '导入结构',
          props: {
            width: 660
          },
          content: () => (
            <>
              <MonacoEditor
                onChange={importJsonChange}
                code={state.jsonValue}
                layout={{ width: 700, height: 600 }}
              />
            </>
          )
        });
      }
    },
    {
      title:'生成源码',
      icon: Document,
      onClick: () => {
        const schema = formSchema.value;
        const codes:Array<string> = [];
        schema.forEach(item=>{
          codes.push(getWidgetCode(item)) 
        });
        showDialog({
          title: '源码',
          props: {
            width: 600,
          },
          content: () => (
            <>
              <MonacoEditor
                code={codes.join('\n')}
                lang="html"
                layout={{ width: 700, height: 600 }}
              />
            </>
          )
        });
      }
    },
    {
      title:'保存',
      icon: Cellphone,
      onClick: () => {
        const schema = formSchema.value;
        schemaStore.updateSchema(schema);
      }
    },
    {
      title:'清空',
      icon: Refrigerator,
      onClick: () => {
        clearModelContext();
      }
    },
    {
      title:'预览',
      icon: TakeawayBox,
      onClick: async () => {        
        const preview = await createAsyncComponent(()=> import('@/views/index.vue'));
        showDialog({
          title: '预览',
          props: {
            width: 660
          },
          content: () => (
            <>
              <preview />
            </>
          )
        });
      }
    }
  ]
}
