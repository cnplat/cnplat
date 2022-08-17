/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  scene: string;
  identify: string;
  certificate: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string;
  token: string;
  // role: string[];
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: string[]; // 权限
  uid: string; // 用户id
  nickname: string; // 用户名
  authName: string;// 真实名字
  avatar: string;// 头像
  address: string;// 地址
  wechat: string;// 微信
  phone: string;// 手机
  gender: number;// 性别
  status: number;// 状态
}
