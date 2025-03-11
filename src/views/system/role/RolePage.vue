<template>
  <n-card content-class="!p-4" >
    <n-data-table 
      size="small"
      :single-line="false"
      :columns="columns" 
      :data="data" 
      :pagination="pagination"
      :row-key="(r) => r.id"
      :scroll-x="1500"
      remote
      v-model:checked-row-keys="checkedRowKeysRef"
      @update-page="(p) => pagination.page = p"
      @update-page-size="(s) => pagination.pageSize = s"
      :loading="loading"
    />
    <n-drawer v-model:show="showDrawer" :width="502" placement="right">
      <n-drawer-content closable>
        <template #header>
          <div class="flex felx-row justify-between items-center">
            <div class=" font-bold">用户信息</div>
            <div class="flex felx-row justify-between items-center">
              <div class="text-base">显示原始数据</div>
              <n-switch v-model:value="showRawData" class="ml-2 mr-5" />
            </div>
          </div>
        </template>
        <div v-if="!showRawData">
          <DrawerContent :model="model!" @update:close="showDrawer = false"  />
        </div>
        <div v-else>
          <vue-json-pretty 
            :data="model" 
            :deep="2"
            :show-icon="true"
            :show-length="true"
            :theme="isDark ? 'dark' : 'light'"
          />
        </div>
      </n-drawer-content>
    </n-drawer>
  </n-card>
</template>

<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { NCard, NSwitch, NDataTable, NButton, NTag, NDrawer, NDrawerContent, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { useDark } from '@vueuse/core'
import VueJsonPretty from 'vue-json-pretty'
import { fetchRoleList } from '@/api'
import { usePage } from '@/common/usePage'
import DrawerContent from './components/DrawerContent.vue'


const message = useMessage()
const isDark = useDark()


// data table
const data = ref<Api.Role[]>([]);
const checkedRowKeysRef = ref<Array<string | number>>([]);
const pagination = ref(usePage())
const loading = ref(false)


const columns: DataTableColumns<Api.Role> = [
  {
    type: 'selection',
    fixed: 'left',
  },
  {
    title: '代码',
    key: 'code',
    fixed: 'left',
    width: 200
  },
  {
    title: '名称',
    key: 'name',
    fixed: 'left',
    width: 150
  },
  {
    title: '备注',
    key: 'remark',
  },
  {
    title: '状态',
    key: 'state',
    render(row) {
      const ok = row.disabled !== true;
      return h(NTag, { type: ok ? 'success' : 'error' }, { default: () => ok ? '启用' : '禁用' })
    },
    fixed: 'right',
    align: 'center',
    width: 100
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      const actions = [];
      actions.push(h(
        NButton, {
          size: 'small',
          onClick: () => showItem(row)
        }, { default: () => '修改' }
      ))
      return h(
        'div', { class: 'flex justify-center flex-row gap-2'},
        actions
      )
    },
    fixed: 'right',
    align: 'center',
    width: 100
  }
]


// drawer
const model = ref<Api.Role | null>(null)
const showDrawer = ref(false)
const showRawData = ref(false)

function showItem(rowData: Api.Role) {
  model.value = rowData;
  showDrawer.value = true;
}


const task = async () => {
  try {
    const rsp = await fetchRoleList(pagination.value.page!, pagination.value.pageSize!);
    if (!rsp) {
      message.error('获取角色列表失败')
      return;
    }
    data.value = rsp.records;
    pagination.value.pageCount = rsp.page_count;
    pagination.value.itemCount = rsp.item_count;
  } catch (e) {
    if (e instanceof Error) {
      message.error(e.message)
    }
  }
}


onMounted(() => {
  task()
})


</script>
