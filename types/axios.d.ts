declare type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

declare interface RequestOptions {
  urlPrefix?: string;
  retryRequest?: RetryRequest;
  errorMessageMode?: ErrorMessageMode;
  ignoreCancelToken?: boolean;
  authorizationToken?: string;
  authorizationSchema?: string,
  isTransformResponse?: boolean;
  isReturnNativeResponse?: boolean;
}

declare interface Result<T = any> {
  code: number;
  message: string;
  data?: T;
}

declare interface UploadFileParams {
  data?: Recordable;
  name?: string;
  file: File | Blob;
  filename?: string;
  [key: string]: any;
}
