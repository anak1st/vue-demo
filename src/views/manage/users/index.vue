<template>
  <n-card content-class="!p-3" >
    <n-data-table 
      :bordered="false" 
      :single-line="false" 
      :columns="columns" 
      :data="data" 
      :pagination="pagination"
      :row-key="(r) => r.id"
    />
  </n-card>
</template>

<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NCard, NDataTable, NButton, NTag, useMessage } from 'naive-ui'
import { fetchUserList, type UserInfo } from '@/api/modules/user'


const message = useMessage()


const deleteUser = (rowData: UserInfo) => {
  message.warning(`Delete ${rowData.username}`)
}


const columns: DataTableColumns<UserInfo> = [
  {
    title: '用户名',
    key: 'username'
  },
  {
    title: '角色',
    key: 'roles',
    render(row) {
      const roles = []
      for (const role in row.roles) {
        roles.push(h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: 'info',
            bordered: false
          },
          {
            default: () => role
          }
        ));
      }
      if (roles.length === 0) {
        return "None"
      }
      return roles
    }
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return h(
        NButton,
        {
          size: 'small',
          onClick: () => deleteUser(row)
        },
        { default: () => '删除' }
      )
    }
  }
]


const data = ref<UserInfo[]>([])


const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});


const task = async () => {
  const offset = (pagination.value.page - 1) * pagination.value.pageSize;
  const count = pagination.value.pageSize;
  const rsp = await fetchUserList(offset, count);
  if (!rsp) {
    message.error('获取用户列表失败')
    return;
  }
  console.log(rsp);
  data.value = rsp.users;
  pagination.value.total = rsp.total;
}


onMounted(() => {
  task()
})


</script>
