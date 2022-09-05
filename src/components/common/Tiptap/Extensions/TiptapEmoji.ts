import { nodeInputRule, Node } from '@tiptap/core';
import { EMOJI_EMOTICONS, EMOTICON_REGEX, UNICODE_REGEX } from '../Data/Emoji/Emojis';
import { parse } from 'twemoji-parser';

function parseEmoji(emoji: string) {
  const [twemoji] = parse(emoji)

  return {
      src: twemoji.url,
      alt: twemoji.text,
      class: 'emoji',
      draggable: 'false',
  }
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    emojiReplacer: {
      insertEmoji: (emoji: string) => ReturnType
    }
  }
}

export const Emoji = Node.create({
  name: 'emoji',

  addAttributes() {
    return {
      emoji: {
        default: null,
        parseHTML: (element) => element.children[0].getAttribute('alt'),
        renderHTML: (attributes) => {
          if (!attributes.emoji) {
            return {}
          }

          if (UNICODE_REGEX.test(attributes.emoji)) {
            return parseEmoji(attributes.emoji)
          }

          return parseEmoji(EMOJI_EMOTICONS[attributes.emoji])
        },
      },
    }
  },

  parseHTML() {
    return [{ tag: 'span[data-emoji-replacer]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', { 'data-emoji-replacer': '' }, ['img', HTMLAttributes]]
  },
  renderText({ node }) {
    return node.attrs.emoji
  },

  addCommands() {
    return {
      insertEmoji: (emoji) => ({ tr, dispatch }) => {
        const node = this.type.create({ emoji })

        if (dispatch) {
          tr.replaceRangeWith(tr.selection.from, tr.selection.to, node)
        }

        return true
      },
    }
  },
  addKeyboardShortcuts() {
    return {
      Backspace: () => {
        const bla = this.editor.commands.first(({ commands }) => [
          () => commands.deleteSelection(),
          () => commands.joinBackward(),
          () => commands.selectNodeBackward(),
        ])
        console.log(bla)
        return true
      }
    }
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: EMOTICON_REGEX,
        type: this.type,
        getAttributes: (match) => {
          return {
            emoji: match[1],
          }
        },
      }),
      nodeInputRule({
        find: UNICODE_REGEX,
        type: this.type,
        getAttributes: (match) => ({
          emoji: match[0],
        }),
      }),
    ]
  },
})
