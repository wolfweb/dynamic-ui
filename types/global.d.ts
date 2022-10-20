declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module 'virtual:*' {
  const result: any
  export default result
}

declare interface Navigator{
  msSaveBlob: any
}

declare global {
  interface Window {
    navigator: Navigator,
    initAppContextCallback: Function,
    initEditModelContextCallback: Function,
  }
}

declare function initAppContextCallback(any)

declare function initEditModelContextCallback(any)

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type Nullable<T> = T | null

declare type NonNullable<T> = T extends null | undefined ? never : T

declare type Recordable<T = any> = Record<string, T>

declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T
}

declare type CustomizedHTMLElement<T> = HTMLElement & T

declare type Indexable<T> = {
  [key: string]: T
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>

declare type IntervalHandle = ReturnType<typeof setInterval>

declare type Optional<T> = T | undefined;

declare interface Dictionary<T = unknown> {
  [key: string]: Optional<T>;
}

declare var REDIRECT_NAME = 'Redirect'

declare var validations: FormElementValidation[]

declare type TargetContext = '_self' | '_blank';

declare type LocaleType = 'zh_CN' | 'en';

declare interface LocaleSetting {
  locale: LocaleType;
  fallback: LocaleType;
  showPicker: boolean;
  availableLocales: LocaleType[];
}

//
declare interface AppContext{
  name: string;
  apiUrl: string;
  version: string;
  loginPath: string;
  uploadUrl: string;
  cacheType: CacheType;
  themeMode: 'light' | 'dark';
  mediaRemoveApi?: string;
}

//