import { AxiosError, AxiosInstance } from 'axios';

export class axiosRetry {
  retry(AxiosInstance: AxiosInstance, error: AxiosError) {
    // @ts-ignore
    const { config } = error.response;

    // @ts-ignore
    const { waitTime, count } = config?.requestOptions?.retryRequest;
    
    // @ts-ignore
    config.__retryCount = config.__retryCount || 0;

    // @ts-ignore
    if (config.__retryCount >= count) {
      return Promise.reject(error);
    }
    // @ts-ignore
    config.__retryCount += 1;
    return this.delay(waitTime).then(() => AxiosInstance(config));
  }

  private delay(waitTime: number) {
    return new Promise((resolve) => setTimeout(resolve, waitTime));
  }
}
