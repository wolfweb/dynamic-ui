import { VueNodeViewRenderer } from '@tiptap/vue-3';
import { mergeAttributes, Node } from '@tiptap/core';

import TiptapVideoView from '../Views/TiptapVideoView.vue';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      /**
       * Add an video
       */
      setVideo: (options: SetVideoOptions) => ReturnType,
    }
  }
}

export interface SetVideoOptions {
  src: string;
  title?: string;
  controls?: boolean;

  [key: string]: any;
}

export interface VideoOptions {
  inline: boolean,
  allowBase64: boolean;
  HTMLAttributes: Record<string, any>,
}

const Video = Node.create<VideoOptions>({
  name: 'video',
  addOptions () {
    return {
      inline        : true,
      allowBase64   : false,
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
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      controls: {
        default: true,
      },
      autoplay: {
        default: false,
        renderHTML: (attrs) => {
          if (attrs['autoplay'] === false) {
            return {};
          }
          return { autoplay: attrs['autoplay'] };
        },
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },

  parseHTML () {
    return [
      {
        tag: this.options.allowBase64 ? 'video[src]' : 'video[src]:not([src^="data:"])',
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
  },

  addNodeView() {
    return VueNodeViewRenderer(TiptapVideoView);
  }
});

export default Video;