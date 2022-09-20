import * as icons from '@icon-park/vue-next';

import type {} from '@tiptap/core';

import mermaid from 'mermaid';
import CodeMirror from 'vue-codemirror6';
import { DiagramTemplates } from './Data/Diagram';

import { reactive, h, watch } from 'vue';
import { isEmpty } from 'lodash-es';
import { showDialog } from '@/hooks/web/useDialog';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElTabs } from 'element-plus';

mermaid.mermaidAPI.initialize({
  securityLevel: 'loose',
  sequence: { showSequenceNumbers: true }
})


export const TiptapMenus = [
  {
    icon: icons.BackOne,
    title: "撤销",
    action: (editor, ...args: any[]) => editor.chain().focus().undo().run(),
    active: (editor) => false
  },
  {
    icon: icons.GoAhead,
    title: "重做",
    action: (editor, ...args: any[]) => editor.chain().focus().redo().run(),
    active: (editor) => false
  },
  {
    divider: true
  },
  {
    icon: icons.ParagraphBreak,
    title: "段落",
    action: (editor, ...args: any[]) => editor.chain().focus().setParagraph().run(),
    active: (editor) => editor.isActive('paragraph')
  },
  {
    icon: icons.ClearFormat,
    title: "清除样式",
    action: (editor, ...args: any[]) => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    active: (editor) => false
  },
  {
    icon: icons.TextBold,
    title: "加粗",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleBold().run(),
    active: (editor) => editor.isActive('blod')
  },
  {
    icon: icons.TextItalic,
    title: "斜体",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleItalic().run(),
    active: (editor) => editor.isActive('italic')
  },
  {
    icon: icons.TextUnderline,
    title: "下划线",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleUnderline().run(),
    active: (editor) => editor.isActive('underline')
  },
  {
    icon: icons.Pisces,
    title: "删除线",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleStrike().run(),
    active: (editor) => editor.isActive('strike')
  },
  {
    icon: icons.HighLight,
    title: "高亮",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleHighlight().run(),
    active: (editor) => editor.isActive('highlight')
  },
  {
    icon: icons.Fill,
    title: "颜色",
    action: (editor, ...args: any[]) => editor.chain().focus().setColor(args[0]).run(),
    active: (editor) => editor.isActive('font-color')
  },
  {
    icon: icons.AlignTextLeft,
    title: "左对齐",
    action: (editor, ...args: any[]) => editor.chain().focus().setTextAlign('left').run(),
    active: (editor) => editor.isActive('align-left')
  },
  {
    icon: icons.AlignTextCenter,
    title: "居中",
    action: (editor, ...args: any[]) => editor.chain().focus().setTextAlign('center').run(),
    active: (editor) => editor.isActive('align-center')
  },
  {
    icon: icons.AlignTextRight,
    title: "右对齐",
    action: (editor, ...args: any[]) => editor.chain().focus().setTextAlign('right').run(),
    active: (editor) => editor.isActive('align-right')
  },
  {
    icon: icons.AlignTextBoth,
    title: "两端对齐",
    action: (editor, ...args: any[]) => editor.chain().focus().setTextAlign('justify').run(),
    active: (editor) => editor.isActive('align-justify')
  },
  {
    icon: icons.MenuFoldOne,
    title: "增加缩进",
    action: (editor, ...args: any[]) => editor.chain().focus().increaseIndent().run(),
    active: (editor) => false
  },
  {
    icon: icons.MenuUnfoldOne,
    title: "减少缩进",
    action: (editor, ...args: any[]) => editor.chain().focus().decreaseIndent().run(),
    active: (editor) => false
  },
  {
    icon: icons.TitleLevel,
    title: "标题",
    action: (editor, ...args: any[]) => {
      editor.chain().focus().toggleHeading({ level: args[0] }).run();
    },
    active: (editor) => false,
    children:[
      {
        icon: icons.H1,
        title: "标题1",
        command: "1"
      },
      {
        icon: icons.H2,
        title: "标题2",
        command: "2"
      },
      {
        icon: icons.H3,
        title: "标题3",
        command: "3"
      },
      {
        icon: icons.LevelFourTitle,
        title: "标题4",
        command: "4"
      },
      {
        icon: icons.LevelFiveTitle,
        title: "标题5",
        command: "5"
      },
      {
        icon: icons.LevelSixTitle,
        title: "标题6",
        command: "6"
      },
    ]
  },
  {
    icon: icons.ListTwo,
    title: "无序列表",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleBulletList().run(),
    active: (editor) => editor.isActive('bulletList')
  },
  {
    icon: icons.OrderedList,
    title: "有序列表",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleOrderedList().run(),
    active: (editor) => editor.isActive('orderedList')
  },
  {
    icon: icons.ListCheckbox,
    title: "任务列表",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleTaskList().run(),
    active: (editor) => editor.isActive('taskList')
  },
  {
    icon: icons.Quote,
    title: "引用",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleBlockquote().run(),
    active: (editor) => editor.isActive('blockquote')
  },
  {
    icon: icons.DividingLine,
    title: "横线",
    action: (editor, ...args: any[]) => editor.chain().focus().setHorizontalRule().run(),
    active: (editor) => false
  },
  {
    icon: icons.Link,
    title: "超链接",
    action: (editor, ...args: any[]) => {
      const item = reactive({
        href: '',
        target: '_blank'
      });
      
      if(editor.isActive('link')){
        const { href, target } = editor.getAttributes('link');
        item.href = href;
        item.target = target;
      }

      showDialog({
        title:'超链接设置',
        props:{
          width: 600
        },
        content: () =>(
          <ElForm>
            <ElFormItem>
              <ElInput type="text" placeholder="请输入链接地址" v-model={item.href} />            
            </ElFormItem>
            <ElFormItem>
              <ElSelect v-model={item.target}>
                <ElOption label="当前窗口" value="_self"></ElOption>
                <ElOption label="新窗口" value="_blank"></ElOption>
              </ElSelect>
            </ElFormItem>
          </ElForm>
        ),
        onConfirm: ()=>{
          editor.chain().focus().toggleLink(item).run();
        }
      });
    },
    active: (editor) => editor.isActive('link')
  },
  {
    icon: icons.ImageFiles,
    title: "插入图片",
    action: (editor, ...args: any[]) => {
      showDialog({
        title: '',
        props: {width: 600},
        content: () => (
          <>
          </>
        ),
        onConfirm: ()=>{
          editor.chain().focus().setImage(args[0]).run();
        }
      })
    },
    active: (editor) => false
  },
  {
    icon: icons.Code,
    title: "代码",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleCodeBlock().run(),
    active: (editor) => editor.isActive('code')
  },
  {
    icon: icons.InsertTable,
    title: "插入表格",
    action: (editor, ...args: any[]) => editor.chain().focus().insertTable().run(),
    active: (editor) => false
  },
  {
    icon: icons.Formula,
    title: "数学公式",
    action: (editor, ...args: any[]) => {
      editor.chain().focus().setMath({tex:'E=mc^2'}).run()
    },
    active: (editor) => false
  },
  {
    icon: icons.NetworkTree,
    title: "流程图",
    action: (editor, ...args: any[]) => {
      const editContext = reactive({
        code: DiagramTemplates.flow,
        svg: null
      });

      mermaid.mermaidAPI.render(`svg-${new Date().getTime()}`, editContext.code, res => editContext.svg = res);

      showDialog({
        title: '流程图设置',
        props:{width: 600},
        content: ()=>(
          <ElForm labelPosition="top">
            <ElFormItem label="模板">
              <ElSelect v-model={editContext.code}>
                {
                  Object.keys(DiagramTemplates).map((item)=>(
                    <ElOption label={item} value={item}></ElOption>
                  ))
                }
              </ElSelect>
            </ElFormItem>
            <ElFormItem label="源码">
              {h(CodeMirror, { basic:true, lintGutter:true, modelValue: editContext.code, style:'width:100%', ['onChanged']: (v) => { try{ mermaid.mermaidAPI.render(`svg-${new Date().getTime()}`, v, res => editContext.svg = res); }catch(e){ console.log(e) } }  })}
            </ElFormItem>
            <ElFormItem label="预览">
              <div innerHTML={editContext.svg}></div>
            </ElFormItem>
          </ElForm>
        ),
        onConfirm: ()=>{
          editor.chain().focus().setDiagram({text:''}).run();
        }
      })
    },
    active: (editor) => false
  },
];