import { CacheType } from "@/enums/cache";
import { useAppStore } from '@/store/modules/appStore';
import { BasicKeys, Persistent, TOKEN_KEY } from "./cache/persistent";

let isLocal: boolean | null = null;

function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

function getToken(): string {
  return getAuthCache(TOKEN_KEY);
}

function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}

export default function () {
  const appStore = useAppStore();
  appStore.AppContext!.cacheType === CacheType.LOCAL;
  return {
    getAuthCache,
    getToken,
    setAuthCache,
    clearAuthCache
  }
}