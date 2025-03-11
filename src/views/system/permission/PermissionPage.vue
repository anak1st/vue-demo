<template>
  <div class="grid grid-cols-1 gap-2">
    <n-card content-class="!p-4" header-class="!pb-0" >
      <template #header>
        菜单
      </template>

      <template #header-extra>
        <div>显示原始数据</div>
        <n-switch v-model:value="showRawData" class="ml-2" />
      </template>

      <n-data-table 
        v-if="!showRawData"
        :data="permissionStore.menuTree"
        :columns="columns"
        size="small"
        :single-line="false"
        :row-key="(r) => r.key"
        remote
        v-model:checked-row-keys="checkedRowKeysRef"
      >
      </n-data-table>
      <JsonPretty  v-if="showRawData" :data="permissionStore.menuTree" />
      <n-drawer v-model:show="showDrawer" :width="502" placement="right">
        <n-drawer-content closable>
          <template #header>
            <div class="flex felx-row justify-between items-center">
              <div class=" font-bold">目录信息</div>
              <div class="flex felx-row justify-between items-center">
                <div class="text-base">显示原始数据</div>
                <n-switch v-model:value="showDrawerRawData" class="ml-2 mr-5" />
              </div>
            </div>
          </template>
          <div v-if="!showDrawerRawData">
            <DrawerContent :model="model!" @update:close="showDrawer = false"  />
          </div>
          <div v-if="showDrawerRawData">
            <JsonPretty :data="model" />
          </div>
        </n-drawer-content>
      </n-drawer>
    </n-card>

    <n-card>
      <template #header>
        菜单选项
      </template>
      <JsonPretty :data="permissionStore.menuOptions" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { useDark } from '@vueuse/core'
import { NButton, NCard, NSwitch, NDataTable, NDrawer, NDrawerContent, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import JsonPretty from '@/components/JsonPretty.vue'
import { usePermissionStore } from '@/stores'
import { renderIcon, IconMap } from '@/components/icons'
import DrawerContent from './components/DrawerContent.vue'


const isDark = useDark()
const permissionStore = usePermissionStore()
const showRawData = ref(false);
const checkedRowKeysRef = ref<Array<string | number>>([]);


const columns: DataTableColumns<Api.Menu> = [
  {
    type: 'selection',
    fixed: 'left'
  },
  {
    title: '代码',
    key: 'key',
  },
  {
    title: '名字',
    key: 'name',
    width: 200
  },
  {
    title: '图标',
    key: 'icon',
    render: (row) => {
      if (!row.iconName || IconMap[row.iconName] === undefined) {
        return h('div', { class: 'ml-1'} , "没有图标")
      }
      const res = [];
      res.push(renderIcon(row.iconName, { size: 20 } )())
      res.push(row.iconName)
      return h('div', { class: 'flex gap-2'} , res)
    },
    width: 200
  },
  {
    title: '显示',
    key: 'show',
    render: (row) => {
      return h(NTag, { type: row.show !== false ? 'success' : 'error' }, { default: () => row.show !== false ? '显示' : '隐藏' })
    },
    align: 'center',
    width: 80
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
const model = ref<Api.Menu | null>(null)
const showDrawer = ref(false)
const showDrawerRawData = ref(false)

function showItem(rowData: Api.Menu) {
  model.value = rowData;
  showDrawer.value = true;
}

</script>
