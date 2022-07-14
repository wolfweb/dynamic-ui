import type { AxiosResponse } from "axios";

import auth from "../auth";
import router  from '@/routes';

import { VAxios } from "./Axios";
import { axiosRetry } from "./axiosRetry";
import { useI18n } from "@/hooks/web/useI18n";
import { useMessage } from "@/hooks/web/useMessage";
import { merge, cloneDeep } from "lodash-es";
import { useAppStore } from '@/store/modules/appStore';
import { useErrorLogStoreWithOut } from "@/store/modules/errorLog";
import { AxiosTransform, CreateAxiosOptions } from "./axiosTransform";
import { ContentTypeEnum, RequestEnum, ResultEnum } from "@/enums/http";

let app : AppContext | null = null;
const { message: createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;

function checkStatus(status: number, msg: string){
  const { t } = useI18n();

  switch (status){
    case 400:
      error(`${msg}`);
      break;
    case 401:
      router.push(app!.loginPath);
      break;
    case 404:
      error(t("网络请求错误,未找到该资源"))
      break;
    case 500:
      error(t("服务器错误,请联系管理员"));
      break;
  }
}

const transform: AxiosTransform = {
  transformResponseHook: (
    res: AxiosResponse<Result>,
    options: RequestOptions
  ) => {
    const { isReturnNativeResponse, isTransformResponse } = options;

    if (isReturnNativeResponse) {
      return res;
    }

    if (!isTransformResponse) {
      return res.data;
    }

    if (!res.data) {
      throw new Error("接口请求失败");
    }

    const { code, message } = res.data;

    const success = code === ResultEnum.Success;

    if (!success) {
      if (options.errorMessageMode === "modal") {
        createErrorModal({ title: "错误", content: () => <>message</> });
      } else if (options.errorMessageMode === "message") {
        createMessage({
          message: message,
          type: "error",
        });
      } else {
        throw new Error(message);
      }
    }

    return res.data.data;
  },
  beforeRequestHook: (config, options) => {
    const { urlPrefix, authorizationToken, authorizationSchema } = options;

    if(urlPrefix){
      config.url = `${urlPrefix}${config.url}`;
    }
    
    if(authorizationToken){
      config.headers!.Authorization = `${authorizationSchema} ${authorizationToken}`;
    }
    
    return config;
  },

  requestInterceptors: (config) => {
    const { getToken } = auth();
    const token = getToken();
    if (token) {
      config.headers!.Authorization = token;
    }
    return config;
  },

  responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {
    const { t } = useI18n();
    const errorLogStore = useErrorLogStoreWithOut();
    errorLogStore.addAjaxErrorInfo(error);
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg: string = response?.data?.error?.message ?? '';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';
    try {
      if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
        errMessage = t("接口请求超时");
      }
      if (err?.includes("Network Error")) {
        errMessage = t("网络异常，请检查您的网络连接是否正常");
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          createErrorModal({ title: t('网络异常'), content: () => <span> {errMessage} </span> });
        } else if (errorMessageMode === 'message') {
          createMessage.error(errMessage);
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw error;
    }
    checkStatus(error?.response?.status, msg);

    const retryRequest = new axiosRetry();

    const { isOpenRetry } = config?.requestOptions?.retryRequest || false;
    config?.method?.toUpperCase() === RequestEnum.Get &&
      isOpenRetry && 
      // @ts-ignore
      retryRequest.retry(axiosInstance, error);

    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  app = useAppStore().AppContext!;

  return new VAxios(
    merge(
      {
        timeout: 10 * 1000,
        withCredentials: true,
        authenticationScheme: '',
        transform: cloneDeep(transform),
        headers: { 'Content-Type': ContentTypeEnum.Json },
        requestOptions: {
          joinPrefix: true,
          isTransformResponse: true,
          isReturnNativeResponse: false,
          joinParamsToUrl: false,
          formatDate: true,
          errorMessageMode: "message",
          apiUrl: app.apiUrl,
          joinTime: true,
          ignoreCancelToken: true,
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100,
          }
        },
      },
      opt || {}
    )
  );
}

export default () => createAxios();
