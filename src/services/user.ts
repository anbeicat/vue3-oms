/*
 * @Author: anqiao 1102877041@qq.com
 * @Date: 2023-03-06 14:05:51
 * @LastEditors: anqiao 1102877041@qq.com
 * @LastEditTime: 2023-03-08 09:50:02
 * @description:
 * @FilePath: /vue3-oms/src/services/user.ts
 */
import { stringify } from 'qs';
import request from '../utils/request';

export const token = (params: any) => {
  const values = params;
  values.scope = 'all';
  return request({
    url: `/slip-oms-ms-user/auth/token`,
    method: 'POST',
    data: values,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export async function dynamicRoutes() {
  return request('/slip-oms-ms-user/user/menuRest/routes');
}
export async function dynamicButtons() {
  return request('/slip-oms-ms-user/user/menuRest/buttons');
}
