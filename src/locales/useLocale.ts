import moment from 'moment';
import { i18n } from './setupI18n';
import { unref, computed } from 'vue';
import { loadLocalePool, setHtmlPageLang } from './helper';
import { useLocaleStore } from '@/store/modules/locale';

interface LangModule {
  message: Recordable;
  momentLocale: Recordable;
  momentLocaleName: string;
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStore();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localeStore.setLocaleInfo({ locale });
  setHtmlPageLang(locale);
}

export function useLocale() {
  const localeStore = useLocaleStore();
  const getLocale = computed(() => localeStore.getLocale);
  const getShowLocalePicker = computed(() => localeStore.getShowPicker);

  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }
    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
    if (!langModule) return;

    const { message, momentLocale, momentLocaleName } = langModule;

    globalI18n.setLocaleMessage(locale, message);
    moment.updateLocale(momentLocaleName, momentLocale);
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
  };
}

