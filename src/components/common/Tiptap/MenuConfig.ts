const TiptapMenus = [
  {
    icon: "arrow-go-back-line",
    title: "撤销",
    action: (editor, ...args: any[]) => editor.chain().focus().undo().run()
  },
  {
    icon: "arrow-go-forward-line",
    title: "重做",
    action: (editor, ...args: any[]) => editor.chain().focus().redo().run()
  },
  {
    icon: "paragraph",
    title: "段落",
    action: (editor, ...args: any[]) => editor.chain().focus().setParagraph().run()
  },
  {
    icon: "format-clear",
    title: "清除样式",
    action: (editor, ...args: any[]) => editor.chain().focus().clearNodes().unsetAllMarks().run()
  },
  {
    icon: "bold",
    title: "加粗",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleBold().run()
  },
  {
    icon: "italic",
    title: "斜体",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleItalic().run()
  },
  {
    icon: "underline",
    title: "下划线",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleUnderline().run()
  },
  {
    icon: "strikethrough",
    title: "文本线",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleStrike().run()
  },
  {
    icon: "mark-pen-line",
    title: "高亮",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleHighlight().run()
  },
  {
    icon: "font-color",
    title: "颜色",
    action: (editor, ...args: any[]) => editor.chain().focus().setColor(args[0]).run()
  },
  {
    icon: "align-left",
    title: "左对齐",
    action: (editor, ...args: any[]) => editor.chain().focus().setTextAlign('left').run()
  },
  {
    icon: "align-center",
    title: "居中",
    action: (editor, ...args: any[]) => editor.chain().focus().setTextAlign('center').run()
  },
  {
    icon: "align-right",
    title: "右对齐",
    action: (editor, ...args: any[]) => editor.chain().focus().setTextAlign('right').run()
  },
  {
    icon: "align-justify",
    title: "两端对齐",
    action: (editor, ...args: any[]) => editor.chain().focus().setTextAlign('justify').run()
  },
  {
    icon: "subscript",
    title: "上角标",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleSubscript().run()
  },
  {
    icon: "superscript",
    title: "下角标",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleSuperscript().run()
  },
  {
    icon: "h-1",
    title: "标题1",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleHeading({ level: 1 }).run()
  },
  {
    icon: "h-2",
    title: "标题2",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleHeading({ level: 2 }).run()
  },
  {
    icon: "h-3",
    title: "标题3",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleHeading({ level: 3 }).run()
  },
  {
    icon: "h-4",
    title: "标题4",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleHeading({ level: 4 }).run()
  },
  {
    icon: "h-5",
    title: "标题5",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleHeading({ level: 5 }).run()
  },
  {
    icon: "h-6",
    title: "标题6",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleHeading({ level: 6 }).run()
  },
  {
    icon: "list-unordered",
    title: "无序列表",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleBulletList().run()
  },
  {
    icon: "list-ordered",
    title: "有序列表",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleOrderedList().run()
  },
  {
    icon: "task-line",
    title: "任务列表",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleTaskList().run()
  },
  {
    icon: "double-quotes-l",
    title: "引用",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleBlockquote().run()
  },
  {
    icon: "separator",
    title: "横线",
    action: (editor, ...args: any[]) => editor.chain().focus().setHorizontalRule().run()
  },
  {
    icon: "link",
    title: "超链接",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleLink(args[0]).run()
  },
  {
    icon: "image-line",
    title: "插入图片",
    action: (editor, ...args: any[]) => editor.chain().focus().setImage(args[0]).run()
  },
  {
    icon: "code-view",
    title: "代码",
    action: (editor, ...args: any[]) => editor.chain().focus().toggleCodeBlock().run()
  },
  {
    icon: "delete-bin-6-line",
    title: "删除表格",
    action: (editor, ...args: any[]) => editor.chain().focus().deleteTable().run()
  },
  {
    icon: "merge-cells-horizontal",
    title: "合并拆分单元格",
    action: (editor, ...args: any[]) => editor.chain().focus().mergeOrSplit().run()
  },
  {
    icon: "insert-row-top",
    title: "上面添加一行",
    action: (editor, ...args: any[]) => editor.chain().focus().addRowBefore().run()
  },
  {
    icon: "insert-row-bottom",
    title: "下面添加一行",
    action: (editor, ...args: any[]) => editor.chain().focus().addRowAfter().run()
  },
  {
    icon: "delete-row",
    title: "删除行",
    action: (editor, ...args: any[]) => editor.chain().focus().deleteRow().run()
  },
  {
    icon: "insert-column-left",
    title: "左边添加一列",
    action: (editor, ...args: any[]) => editor.chain().focus().addColumnBefore().run()
  },
  {
    icon: "insert-column-right",
    title: "右边添加一列",
    action: (editor, ...args: any[]) => editor.chain().focus().addColumnAfter().run()
  },
  {
    icon: "delete-column",
    title: "删除行",
    action: (editor, ...args: any[]) => editor.chain().focus().deleteColumn().run()
  }
]