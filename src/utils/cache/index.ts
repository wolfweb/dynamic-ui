import { isDev, getEnv } from '@/utils/env';
import pkg from '../../../package.json';
import { createStorage as create, CreateStorageParams } from './storageCache';

export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

const enableStorageEncryption = !isDev();

type Options = Partial<CreateStorageParams>;

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  };
};

function getStorageShortName () {
  return `magicube__${getEnv()}${`__${pkg.version}`}__`.toUpperCase();
}

export const WebStorage = create(createOptions(sessionStorage));

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options));
};

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

export default WebStorage;