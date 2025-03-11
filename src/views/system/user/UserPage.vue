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
import type { DataTableColumns } from 'naive-ui'
import { NCard, NSwitch, NDataTable, NButton, NTag, NDrawer, NDrawerContent, useMessage } from 'naive-ui'
import { useDark } from '@vueuse/core'
import VueJsonPretty from 'vue-json-pretty'
import { fetchUserList } from '@/api'
import { usePage } from '@/common/usePage'
import DrawerContent from './components/DrawerContent.vue'


const message = useMessage()
const isDark = useDark()


// data table
const data = ref<Api.User[]>([]);
const checkedRowKeysRef = ref<Array<string | number>>([]);
const pagination = ref(usePage())
const loading = ref(false)


const columns: DataTableColumns<Api.User> = [
  {
    type: 'selection',
    fixed: 'left'
  },
  {
    title: 'ID',
    key: 'id',
    fixed: 'left',
    width: 200
  },
  {
    title: '用户名',
    key: 'username',
    fixed: 'left',
    width: 200
  },
  {
    title: '昵称',
    key: 'nickname',
    fixed: 'left',
    width: 200
  },
  {
    title: '角色',
    key: 'roles',
    // render(row) {
    //   const roles = [];
    //   for (const role of row.roles || []) {
    //     roles.push(h(NTag, { type: 'info' }, { default: () => role }))
    //   }
    //   if (roles.length === 0) {
    //     return ""
    //   }
    //   return h('div', { class: 'flex flex-row gap-2'} , roles)
    // }
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
const model = ref<Api.User | null>(null)
const showDrawer = ref(false)
const showRawData = ref(false)


function showItem(rowData: Api.User) {
  model.value = rowData;
  showDrawer.value = true;
}


const task = async () => {
  try {
    const rsp = await fetchUserList(pagination.value.page!, pagination.value.pageSize!);
    if (!rsp) {
      message.error('获取用户列表失败')
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
