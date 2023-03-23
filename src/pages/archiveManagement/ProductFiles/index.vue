<script setup lang="ts">
import { templateElement } from '@babel/types';
import { ref, reactive, onBeforeMount, onMounted, h } from 'vue'
import Grid from '../../../components/Grid.vue';
import { pageQuerySeller } from '../../../services/sellPlan';
import { Link } from '@arco-design/web-vue';
// 限购设置
const isAstrictList = [
  {
    value: 1,
    label: '是'
  }, {
    value: 0,
    label: '否'
  }]
// 状态select
const statusList = [
  {
    value: 1,
    label: '启用'
  }, {
    value: 0,
    label: '禁用'
  }]
const searchData = [
  {
    label: '产品名称（中文）',
    field: 'productName',
  },
  {
    label: '产品编码',
    field: 'sku',
  },
  {
    label: '状态',
    field: 'status',
    type: 'select',
    params: {
      options: statusList
    },
  },
  {
    label: '限购设置',
    field: 'isAstrict',
    type: 'select',
    params: {
      options: isAstrictList
    },
  },

]

const tableColumns = [
  {
    title: '产品名称（中文）',
    dataIndex: 'productName',
    // href: (row: any) => `/archiveManagement/ProductFiles/detail/${row.productId}`,
    render: ({ record }) => {
      return h(
        Link,
        {
          href: '/orderManagement/sellPlanAgent',
          onclick: () => {
            console.log('record.productName', record.productName);

          }
        },
        record.productName
      )
    }
  },
  {
    title: '规格型号',
    dataIndex: 'productSpecification',
  },
  {
    title: '生产厂家',
    dataIndex: 'factoryName',
  },
  {
    title: '产品编码',
    dataIndex: 'sku',
  },
  {
    title: '注册证号/备案凭证号',
    dataIndex: 'registCode',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 70,
    render: ({ record }) => {
      return record.status === 0 ? '禁用' : record.status === 1 && record.statusTenant === 0 ? '禁用' : '启用'
    }
  },
  {
    title: '限购设置',
    dataIndex: 'isAstrict',
    width: 100,
    render: ({ record }) => {
      return record.isAstrict === 1 ? '是' : record.isAstrict === 0 ? '否' : '-'
    }
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    // editable: true,
    // onEdit: (row: any) => {
    //   form.setFieldsValue({ remarkValue: row.remarks })
    //   $.handleRemarkModal(true, row.productId, row.id)
    // }
  },
]

const tableData = ref({

})

const onSearch = (e: any) => {
  pageQuerySeller({
    ...e,
    // tenantId: getCurrentUser().tenantId
  }).then((res: any) => {
    tableData.value = res
  })
}

onMounted(() => {
  // onSearch()
})
</script>

<template>
  <Grid :searchData="searchData" @onSearch="onSearch" :tblProps="{ tableColumns, tableData }"></Grid>
</template>

<style scoped></style>
