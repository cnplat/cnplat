import {
  AccountListGetResultModel,
  AccountListItem,
  AccountParams,
  RoleItem,
  RolePageListGetResultModel,
  RolePageParams,
} from './model/apiModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  User = '/user-svc/v1/user',
  Role = '/user-svc/v1/role',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.User, params });

export const updateUser = (params: AccountListItem) =>
  defHttp.post<AccountListGetResultModel>({ url: Api.User, params });


export const getRoleList = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.Role, params });

export const updateRole = (record: RoleItem) => defHttp.post({ url: Api.Role, params: record });

export const deleteRole = (id: number) => defHttp.delete({ url: Api.Role, params: { id: id } });
