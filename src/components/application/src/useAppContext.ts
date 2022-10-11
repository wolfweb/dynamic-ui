import { InjectionKey } from 'vue';
import { createContext, useContext } from '@/hooks/core/useContext';

export interface AppContext {
  App: Object
}

const key: InjectionKey<AppContext> = Symbol();

export function createAppProviderContext(context: AppContext) {
  return createContext<AppContext>(context, key);
}

export function useAppProviderContext() {
  return useContext<AppContext>(key);
}
