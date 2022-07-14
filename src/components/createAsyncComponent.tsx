import { defineAsyncComponent } from 'vue';
import { ElLoading } from 'element-plus';

interface Options {
  text?: '';
  spinner?: '';
  lock?: boolean;
  body?: boolean;
  background?: string;
  fullscreen?: boolean;

  delay?: number;
  timeout?: number;
  loading?: boolean;
  retry?: boolean;
}

const noop = () => {};

export function createAsyncComponent(loader: Fn, options: Options = {}) {
  const { delay = 100, timeout = 30000, loading = false, retry = true } = options;
  return defineAsyncComponent({
    loader,
    loadingComponent: loading ? ElLoading.service({
      text: options.text || '',
      spinner: options.spinner || 'el-icon-loading',
      lock: options.lock || false,
      body: options.body || false,
      background: options.background || 'rgba(0, 0, 0, 0.8)',
      fullscreen: options.fullscreen || false,
    }) : undefined,
    timeout,
    delay,
    onError: !retry
      ? noop
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            retry();
          } else {
            fail();
          }
        },
  });
}