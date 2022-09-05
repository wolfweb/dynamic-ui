import { joinShortcodes, CompactEmoji } from 'emojibase';
import EMOJIBASE_REGEX from 'emojibase-regex';
import emojis from 'emojibase-data/en/compact.json';
import shortcodes from 'emojibase-data/en/shortcodes/emojibase.json';
import { isArray, forEach, escapeRegExp } from 'lodash-es';

type Emoji = {
    emoji: string
    shortcode?: string
}

const emojisWithShortcodes = joinShortcodes(emojis as CompactEmoji[], [shortcodes])

let EMOJI_EMOTICONS: { [emoticon: string]: string } = {}
let EMOJI_SUGGESTIONS: Emoji[] = []

let emoticonsForRegex: string[] = []

emojisWithShortcodes.forEach(({ unicode, emoticon, shortcodes }) => {
    if (emoticon) {
        if(isArray(emoticon)){
          forEach(emoticon, (it) => {
            emoticonsForRegex.push(escapeRegExp(it));
            EMOJI_EMOTICONS[it] = unicode;
          });
        }else{
          emoticonsForRegex.push(escapeRegExp(emoticon));
          EMOJI_EMOTICONS[emoticon] = unicode;
        }
    }

    if (shortcodes) {
        EMOJI_SUGGESTIONS.push({
            emoji: unicode,
            shortcode: `:${shortcodes[0]}:`.toLowerCase(),
        })
    }
})

const EMOTICON_REGEX = new RegExp(`(?:${emoticonsForRegex.join('|')})\\s$`)

const EMOTICON_REGEX_PASTE = new RegExp(`(?:${emoticonsForRegex.join('|')})`, 'g')

const UNICODE_REGEX = new RegExp(`(?:${EMOJIBASE_REGEX.source})$`)

const UNICODE_REGEX_PASTE = new RegExp(`(?:${EMOJIBASE_REGEX.source})`, 'g')

export {
    EMOJI_EMOTICONS,
    EMOJI_SUGGESTIONS,
    EMOTICON_REGEX,
    EMOTICON_REGEX_PASTE,
    UNICODE_REGEX,
    UNICODE_REGEX_PASTE,
}

export type { Emoji }
