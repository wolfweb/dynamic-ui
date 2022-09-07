import * as icons from '@icon-park/vue-next';

export const TiptapMenus = [
  {
    icon: icons.BackOne,
    title: "撤销",
    action: (editor, ...args: any[]) => editor.chain().focus().undo().run()
  },
  {
    icon: icons.GoAhead,
    title: "重做",
    action: (editor, ...args: any[]) => editor.chain().focus().redo().run()
  },
  {
    icon: icons.ParagraphBreak,
    title: "段落",
    action: (editor, ...args: any[]) => editor.chain().focus().setParagraph().run()
  },
  {
    icon: icons.ClearFormat,
    title: "清除样式",
    action: (editor, ...args: any[]) => editor.chain().focus().clearNodes().unsetAllMarks().run()
  },
  {
    icon: icons.TextBold,
    title: "加粗",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleBold().run()
  },
  {
    icon: icons.TextItalic,
    title: "斜体",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleItalic().run()
  },
  {
    icon: icons.TextUnderline,
    title: "下划线",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleUnderline().run()
  },
  {
    icon: icons.Pisces,
    title: "文本线",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleStrike().run()
  },
  {
    icon: icons.HighLight,
    title: "高亮",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleHighlight().run()
  },
  {
    icon: icons.Fill,
    title: "颜色",
    action: (editor, ...args: any[]) => editor.chain().focus().setColor(args[0]).run()
  },
  {
    icon: icons.AlignTextLeft,
    title: "左对齐",
    action: (editor, ...args: any[]) => editor.chain().focus().setTextAlign('left').run()
  },
  {
    icon: icons.AlignTextCenter,
    title: "居中",
    action: (editor, ...args: any[]) => editor.chain().focus().setTextAlign('center').run()
  },
  {
    icon: icons.AlignTextRight,
    title: "右对齐",
    action: (editor, ...args: any[]) => editor.chain().focus().setTextAlign('right').run()
  },
  {
    icon: icons.AlignTextBoth,
    title: "两端对齐",
    action: (editor, ...args: any[]) => editor.chain().focus().setTextAlign('justify').run()
  },
  {
    icon: "fa-superscript",
    title: "上角标",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleSubscript().run()
  },
  {
    icon: "fa-subscript",
    title: "下角标",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleSuperscript().run()
  },
  {
    icon: icons.H1,
    title: "标题1",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleHeading({ level: 1 }).run()
  },
  {
    icon: icons.H2,
    title: "标题2",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleHeading({ level: 2 }).run()
  },
  {
    icon: icons.H3,
    title: "标题3",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleHeading({ level: 3 }).run()
  },
  {
    icon: icons.ListTwo,
    title: "无序列表",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleBulletList().run()
  },
  {
    icon: icons.OrderedList,
    title: "有序列表",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleOrderedList().run()
  },
  {
    icon: icons.ListCheckbox,
    title: "任务列表",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleTaskList().run()
  },
  {
    icon: icons.Quote,
    title: "引用",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleBlockquote().run()
  },
  {
    icon: icons.DividingLine,
    title: "横线",
    action: (editor, ...args: any[]) => editor.chain().focus().setHorizontalRule().run()
  },
  {
    icon: icons.Link,
    title: "超链接",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleLink(args[0]).run()
  },
  {
    icon: icons.ImageFiles,
    title: "插入图片",
    action: (editor, ...args: any[]) => editor.chain().focus().setImage(args[0]).run()
  },
  {
    icon: icons.Code,
    title: "代码",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleCodeBlock().run()
  },
  {
    icon: icons.InsertTable,
    title: "插入表格",
    action: (editor, ...args: any[]) => editor.chain().focus().insertTable().run()
  },
];