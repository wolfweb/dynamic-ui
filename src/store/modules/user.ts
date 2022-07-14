import auth from '@/utils/auth';
import { TOKEN_KEY } from '@/utils/cache/persistent';
import { defineStore } from 'pinia';
import { store } from '../';

interface UserState {
  token: undefined | string;
  sessionTimeout?: boolean;
}

const userStore = () => {
  const {getAuthCache, setAuthCache} = auth();
  defineStore({
    id:"userStore",
    state: (): UserState => (
      {
        token:""
      }
    ),
    getters:{
      getToken(): string {
        return this.token || getAuthCache<string>(TOKEN_KEY);
      },
    },
    actions:{
      setToken(info: undefined | string) {
        this.token = info;
        setAuthCache(TOKEN_KEY, info);
      },
    }
  })(store);
}

export function useUserStore(){
  return userStore();
}