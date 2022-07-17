import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import httpFactory from '@/utils/http';
import { showDialog } from '@/components/vDialog';
import { useEditModel } from '@/models/schema';
import { useAppStore } from '@/store/modules/appStore';
import { useSchemaStore } from '@/store/modules/schemaStore';
import { getWidgetCode } from '@/components/component.config';
import MonacoEditor from '@/editor/components/monaco-editor/MonacoEditor';

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
      icon: 'fa fa-eye',
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
      icon: 'fa fa-upload',
      onClick: () => {

      }
    },
    {
      title:'导入结构',
      icon: 'fa fa-download',
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
      icon: 'fa fa-code',
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
      icon: 'fa fa-save',
      onClick: () => {
        const schema = formSchema.value;
        schemaStore.updateSchema(schema);
      }
    },
    {
      title:'清空',
      icon: 'fa fa-eraser',
      onClick: () => {
        clearModelContext();
      }
    }
  ]
}
