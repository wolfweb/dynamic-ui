import { store } from '..';
import { isNil } from 'lodash-es';
import { defineStore } from 'pinia';

interface AppStoreState {
  AppContext: Nullable<AppContext>
}

const appStore = () => {
  return defineStore({
    id: "appStore",
    state: (): AppStoreState => {
      return { AppContext: null };
    },
    getters: {
      
    },
    actions: {
      updateApp(app: AppContext) {
        if (isNil(this.AppContext)) {
          this.AppContext = app;
        }
      }
    }
  })(store);
}

export function useAppStore() {
  return appStore();
}