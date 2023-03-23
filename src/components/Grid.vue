<!--
 * @Author: anqiao 1102877041@qq.com
 * @Date: 2023-03-18 15:01:46
 * @LastEditors: anqiao 1102877041@qq.com
 * @LastEditTime: 2023-03-23 16:52:28
 * @description:
 * @FilePath: /vue3-oms/src/components/Grid.vue
-->
<script setup lang="ts">
import { ref, reactive, onMounted, defineEmits, onBeforeMount } from 'vue'
interface Employee {
  type?: 'select' | 'input' | 'cascader' | 'rangePicker'| string,
  label: string,
  field: string,
  params?: any,
}
let props = defineProps<{
  searchData: Employee[],
  onSearch?: Function,
  tblProps: {
    tableColumns: any[],
    tableData: any,
  }
}>()
let form: any = reactive({

})
const pageSize = ref(20)
const current = ref(1)
const formRef = ref()
const total = ref(0)

const emit = defineEmits(['onSearch'])
const onSearch = (data: any) => {
  emit('onSearch', { ...data.values, current: current.value, size: pageSize.value })
  current.value = props.tblProps.tableData.current
  pageSize.value = props.tblProps.tableData.size
  total.value = props.tblProps.tableData.total
}
const getResetFields = () => {
  formRef.value.resetFields()
  current.value = 1
  pageSize.value = 20
  emit('onSearch', { ...form, current: current.value, size: pageSize.value })
  // onSearch(form)
}
const pageChange = (current: number) => {
  emit('onSearch', { ...form, current, size: pageSize.value })
}
const pageSizeChange = (size: number
) => {
  emit('onSearch', { ...form, current: current.value, size })
}

onBeforeMount(() => {
  props.searchData.map((item: any) => {
    Object.assign(form, { [item.field]: '' })
    return item
  })
  onSearch(form)
})
onMounted(() => {
})
</script>

<template>
  <!-- 搜索框 -->
  <a-form ref="formRef" :model="form" auto-label-width @submit="onSearch">
    <a-row :gutter="[24, 12]">
      <a-col :span="8" v-for="(item, index) in props.searchData">
        <a-form-item :field="item.field" :label="item.label" :key="index">
          <!-- select -->
          <a-select v-model:model-value="form[item.field]" v-if="item?.type === 'select'" :options=item.params.options
            placeholder="请选择" allow-clear allow-search />
          <!-- cascader -->
          <a-cascader v-else-if="item?.type === 'cascader'" :options=item.params.options
            v-model:model-value="form[item.field]" placeholder="请选择" allow-clear :field-names="item.params.fieldNames" />
          <!-- rangePicker -->
          <a-range-picker v-else-if="item?.type === 'rangePicker'" v-model:model-value="form[item.field]"
            value-format="timestamp" />
          <!-- input -->
          <a-input v-model:model-value="form[item.field]" v-else placeholder="请输入" allow-clear />
        </a-form-item>
      </a-col>
      <a-col :span="8" :offset="props.searchData.length % 3 === 0 ? 16 : props.searchData.length % 3 === 1 ? 8 : 0">
        <a-form-item row-class="btnclass">
          <a-space>
            <a-button type="primary" html-type="submit">搜索</a-button>
            <a-button type="outline" @click="getResetFields">重置</a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>

  <!-- 表格 -->
  <a-table stripe :scroll="{
    x: '120%',
    // y: '100%',
    maxHeight: '420px'
  }" :columns="props.tblProps.tableColumns.map((item: any) => {
  if (!item.width) {
    item.width = 160
  }
  item.ellipsis = true
  item.tooltip = true
  return item
})" :data="props.tblProps.tableData.records" column-resizable :bordered="{ cell: true }" page-position="bottom"
    :pagination="{
      showTotal: true,
      showJumper: true,
      showPageSize: true,
      total: props.tblProps.tableData.total,
      defaultPageSize: 20,
      current: props.tblProps.tableData.current,
      pageSize: props.tblProps.tableData.size,
    }" @page-change="pageChange" @page-size-change="pageSizeChange">
    </a-table>
  <!-- <a-pagination class="paginationClass" :total="50" v-model:current="current" v-model:page-size="pageSize" show-total
                                              show-jumper show-page-size @change="pageChange" @page-size-change="pageSizeChange" /> -->
</template>

<style scoped>
.btnclass :deep(.arco-form-item-content-flex) {
  /* display: flex; */
  justify-content: end;
}

.paginationClass {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
</style>
