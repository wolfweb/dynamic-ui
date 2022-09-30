import { Node, mergeAttributes } from '@tiptap/core';

export interface DiagramOptions {
  inline: boolean,
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    diagram: {
      /**
       * Add an diagram
       */
       setDiagram: (options: { code: string; height?: string; }) => ReturnType;
    };
  }
}

const Diagram = Node.create<DiagramOptions>({
  name: 'diagram',

  addOptions () {
    return {
      inline        : true,
      HTMLAttributes: {}
    }
  },

  addAttributes(){
    return {
      code:{ default: null },
      height: { default: 300}
    }
  },

  inline () {
    return this.options.inline
  },

  group () {
    return this.options.inline ? 'inline' : 'block'
  },

  parseHTML() {
    return [{ tag: 'diagram[code]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['diagram', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  draggable: false,

  addCommands(){
    return {
      setDiagram: options => ({ commands }) => {
        return commands.insertContent({
          type : this.name,
          attrs: options
        })
      }
    }
  }
});

export default Diagram;