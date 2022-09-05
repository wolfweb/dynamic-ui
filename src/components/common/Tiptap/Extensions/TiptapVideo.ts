import { mergeAttributes, Node } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      /**
       * Add an video
       */
      setVideo: (options: { src: string, alt?: string, title?: string }) => ReturnType,
    }
  }
}

export interface VideoOptions {
  inline: boolean,
  HTMLAttributes: Record<string, any>,
}

export const Video = Node.create<VideoOptions>({
  name: 'video',
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
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      },
      width: {
        default: 400
      },
      height: {
        default: 300
      }
    }
  },

  parseHTML () {
    return [
      {
        tag: 'video[src]'
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return [ 'video', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes) ]
  },

  addCommands () {
    return {
      setVideo: options => ({ commands }) => {
        return commands.insertContent({
          type : this.name,
          attrs: options
        })
      }
    }
  }
});