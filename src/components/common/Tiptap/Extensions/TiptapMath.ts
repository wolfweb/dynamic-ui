import { VueNodeViewRenderer } from '@tiptap/vue-3';
import { mergeAttributes, Node } from '@tiptap/core';

import TiptapMathView from '../Views/TiptapMathView.vue';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    math: {
      /**
       * Add an video
       */
      setMath: (options: { tex: string }) => ReturnType,
    }
  }
}

export interface MathOptions {
  inline: boolean,
  HTMLAttributes: Record<string, any>,
}

const Math = Node.create<MathOptions>({
  name: 'math',

  addOptions () {
    return {
      inline        : true,
      HTMLAttributes: {}
    }
  },

  inline () {
    return this.options.inline
  },

  group () {
    return this.options.inline ? 'inline' : 'block'
  },

  draggable: false,

  addAttributes () {
    return {
      tex: ''
    }
  },

  parseHTML () {
    return [
      {
        tag: 'math[tex]'
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return [ 'math', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes) ]
  },

  addCommands () {
    return {
      setMath: options => ({ commands }) => {
        return commands.insertContent({
          type : this.name,
          attrs: options
        })
      }
    }
  },

  addNodeView () {
    return VueNodeViewRenderer(TiptapMathView);
  }
});

export default Math;