import { Extension } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';

/****************load tiptap extensions****************/
import Bold from '@tiptap/extension-bold';
import Code from '@tiptap/extension-code';
import Link from '@tiptap/extension-link';
import Text from '@tiptap/extension-text';
import Color from '@tiptap/extension-color';
import Table from '@tiptap/extension-table';
import Strike from '@tiptap/extension-strike';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import Document from '@tiptap/extension-document';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TableRow from '@tiptap/extension-table-row';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import Highlight from '@tiptap/extension-highlight';
import Gapcursor from '@tiptap/extension-gapcursor';
import Subscript from '@tiptap/extension-subscript';
import Underline from '@tiptap/extension-underline';
import TableCell from '@tiptap/extension-table-cell';
import TextAlign from '@tiptap/extension-text-align';
import HardBreak from '@tiptap/extension-hard-break';
import Blockquote from '@tiptap/extension-blockquote';
import Dropcursor from '@tiptap/extension-dropcursor';
import BulletList from '@tiptap/extension-bullet-list';
import Superscript from '@tiptap/extension-superscript';
import Placeholder from '@tiptap/extension-placeholder';
import OrderedList from '@tiptap/extension-ordered-list';
import TableHeader from '@tiptap/extension-table-header';
import CharacterCount from '@tiptap/extension-character-count';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

/****************load custom extensions****************/
import Math from './Extensions/TiptapMath';
import Video from './Extensions/TiptapVideo';
import Diagram from './Extensions/TiptapDiagram';
import IndentExtension from './Extensions/TiptapIndent';
import TextStyleExtension from './Extensions/TiptapTextstyle';
import { BackgroundColor, BlockStyles, TextFormats, TextIndent } from './Extensions/text-styles';

/****************load custom extensions view****************/
import TiptapMathView from './Views/TiptapMathView.vue';
import TiptapVideoView from './Views/TiptapVideoView.vue';
import TiptapDiagramView from './Views/TiptapDiagramView.vue';
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
      ...TextFormats,
      ...BlockStyles.map((v) => v.configure({ types: ['listItem', 'taskItem', 'heading', 'paragraph'] })),
      TextIndent.configure({
        types: ['paragraph'],
      }),
      Color,
      BackgroundColor,
      IndentExtension,
      TextStyleExtension,
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
        return VueNodeViewRenderer(TiptapVideoView);
      }
    }));

    extensions.push(Diagram.extend({
      addNodeView () {
        return VueNodeViewRenderer(TiptapDiagramView);
      }
    }))

    return extensions;
  }
});

export default StarterKit