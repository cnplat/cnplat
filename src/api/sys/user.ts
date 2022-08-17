import {defHttp} from '/@/utils/http/axios';
import {GetUserInfoModel, LoginParams, LoginResultModel} from './model/userModel';

import {ErrorMessageMode} from '/#/axios';

enum Api {
  Login = '/user-svc/v1/login',
  Logout = '/user-svc/v1/logout',
  GetUserInfo = '/user-svc/v1/user/info',
  GetAuthCode = '/user-svc/v1/auth/code',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({url: Api.GetUserInfo}, {
    errorMessageMode: 'message',
  });
}

export function getAuthCode() {
  return defHttp.get<string[]>({url: Api.GetAuthCode});
}

export function doLogout() {
  return defHttp.get({url: Api.Logout});
}

