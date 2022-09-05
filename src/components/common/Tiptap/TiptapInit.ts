import { Extension } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';

/****************load tiptap extensions****************/
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import CharacterCount from '@tiptap/extension-character-count';

/****************load custom extensions****************/
import { Video } from './Extensions/TiptapVideo';
import { Math } from './Extensions/TiptapMath';

/****************load custom extensions view****************/
import TiptapMathView from './Views/TiptapMathView.vue';
import TiptapVideoView from './Views/TiptapVideoView.vue';
import TiptapCodeBlockView from './Views/TiptapCodeBlockView.vue';

/****************load extensions config****************/
import lowlight from './Data/Codeblock/CodeblockLowlight';

const StarterKit = Extension.create({
  name: 'start-kit',
  addExtensions(){
    const extensions: Array<any> = [
      CharacterCount,
      Blockquote,
      Bold,
      BulletList,
      Code,
      Document,
      Dropcursor,
      Gapcursor,
      HardBreak,
      Heading,
      History,
      HorizontalRule,
      Italic,
      ListItem,
      OrderedList,
      Paragraph,
      Strike,
      Text,
      Highlight,
      Table,
      TableRow,
      TableHeader,
      TableCell,
      Underline,
      TaskList,
      TaskItem,
      Subscript,
      Superscript,
      TextStyle,
      Color
    ];   

    extensions.push(CodeBlockLowlight
      .extend({
        addNodeView () {
          return VueNodeViewRenderer(TiptapCodeBlockView)
        }
      }).configure({ lowlight })
    );

    extensions.push(Link.configure({
      protocols: [ 'ftp', 'mailto', 'http', 'https' ],
      autolink : false
    }));
      
    extensions.push(Math.extend({
      addNodeView () {
        return VueNodeViewRenderer(TiptapMathView);
      }
    }));

    extensions.push(Placeholder.configure({
      placeholder: ''
    }));

    extensions.push(TextAlign.configure({
      types: [ 'heading', 'paragraph' ]
    }));

    extensions.push(Video.extend({
      addNodeView () {
        return VueNodeViewRenderer(TiptapVideoView)
      }
    }));

    return extensions;
  }
});

export default StarterKit