/*
 * @Author: anqiao 1102877041@qq.com
 * @Date: 2023-03-21 14:29:07
 * @LastEditors: anqiao 1102877041@qq.com
 * @LastEditTime: 2023-03-21 14:39:36
 * @description:
 * @FilePath: /vue3-oms/src/services/sellPlan.ts
 */
import { stringify } from 'qs';
import request from '../utils/request';

//销售计划列表
export async function getSellPlane(params: any) {
  return request('/slip-oms-ms-order/order/replaceOrderRest/salePlanePageQuery', {
    method: "POST",
    data: params
  }
  )
}

//订单类型枚举
export async function getOrderTypeEnum() {
  return request(`/slip-oms-ms-order/enumRest/getOrderTypeEnum`
  )
}

// 卖家端--列表搜索分页
export async function pageQuerySeller(params: any) {
  return request(`/slip-oms-ms-archive/archive/productSellerRest/pageQuery`, {
    method: 'POST',
    data: params,
  });
}
