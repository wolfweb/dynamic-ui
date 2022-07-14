export enum ResultEnum {
  Success = 200,
  Error = 500,
  Unauthorized = 401,
}

export enum RequestEnum {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

export enum ContentTypeEnum {
  Json = 'application/json;charset=UTF-8',
  Text = 'text/plain;charset=UTF-8',
  FormUrlEncoded = 'application/x-www-form-urlencoded;charset=UTF-8',
  FormData = 'multipart/form-data;charset=UTF-8',
}
