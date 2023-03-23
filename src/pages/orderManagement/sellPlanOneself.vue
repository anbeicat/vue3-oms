<!--
 * @Author: anqiao 1102877041@qq.com
 * @Date: 2023-03-13 11:33:22
 * @LastEditors: anqiao 1102877041@qq.com
 * @LastEditTime: 2023-03-22 16:51:57
 * @description:
 * @FilePath: /vue3-oms/src/pages/orderManagement/sellPlanOneself.vue
-->
<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import Grid from '../../components/Grid.vue';
import { getSellPlane, getOrderTypeEnum } from '../../services/sellPlan';
// 状态select
const saleOrderTypeList = ref()
const searchData = [
  {
    label: '计划编号',
    field: 'planOrderNo'
  },
  {
    label: '买家',
    field: 'buyerName',
  },
  {
    label: '收货终端',
    field: 'terminalName',
  },
  {
    label: '创建人',
    field: 'createUserName',
  },
  {
    label: '创建时间',
    field: 'createTime',
    type: "rangePicker"
  },
  {
    label: '计划类型',
    field: 'saleOrderType',
    type: "cascader",
    params: {
      options: saleOrderTypeList,
      fieldNames: { label: 'remark', value: 'code', children: 'children' }
    }
  },
]

const tableColumns = [
  {
    title: '计划编号',
    dataIndex: 'planOrderNo',
    fixed: 'left'
  },
  {
    title: '计划类型',
    dataIndex: 'saleOrderRemark',
  },
  {
    title: '买家',
    dataIndex: 'buyerName',
  },
  {
    title: '收货终端',
    dataIndex: 'terminalName',
  },
  {
    title: '计划总数',
    dataIndex: 'planeTotalNumber',
  },
  {
    title: '已销售数',
    dataIndex: 'soldNumber',
  },
  {
    title: '未执行数',
    dataIndex: 'notExecutedNumber',
  },
  {
    title: '订单备注',
    dataIndex: 'orderRemark',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '创建人',
    dataIndex: 'createUserName',
  },
]

const tableData = ref({

})
const getOrderType = () => {
  getOrderTypeEnum().then((res: any) => {
    saleOrderTypeList.value = res
  })
}
const onSearch = (e: any) => {
  const newValue = { ...e, orderCreationType: 1, }
  if (newValue.createTime) {
    newValue.createStartTime = newValue.createTime[0];
    newValue.createEndTime = newValue.createTime[1];
  }
  // setParameter(newValue)
  getSellPlane(newValue).then((res: any) => {
    tableData.value = res
  })
}

onBeforeMount(() => {
  getOrderType()
})
</script>

<template>
  <Grid :searchData="searchData" @onSearch="onSearch" :tblProps="{ tableColumns, tableData }"></Grid>
</template>

<style scoped></style>
