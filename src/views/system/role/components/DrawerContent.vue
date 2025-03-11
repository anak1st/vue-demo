<template>
  <div class="flex flex-col">
    <n-form>
      <n-form-item label="角色代码">
        <n-input v-model:value="model.businessId" placeholder='[空]' />
      </n-form-item>
      <n-form-item label="角色名">
        <n-input v-model:value="model.roleName" placeholder='[空]' />
      </n-form-item>
      <n-form-item label="权限">
        <n-tree-select
          multiple
          cascade
          checkable
          check-strategy="all"
          :options="permissionStore.menuPermissionTree"
          :default-value="['home']"
          @update:value="handleUpdatePermission"
        />
      </n-form-item>
      <n-form-item label="状态">
        <n-radio-group v-model:value="model.deleted" name='[空]'>
          <n-radio v-for="s in roleState" :key="s.key" :value="s.key">
            {{ s.label }}
          </n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="备注">
        <n-input v-model:value="model.remark" placeholder='[空]' />
      </n-form-item>
    </n-form>
    <div>
      <n-divider />
      <div class="flex justify-end gap-2">     
        <n-button type="primary" @click="save">保存</n-button>
        <n-button @click="() => emits('update:close')">取消</n-button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { 
  NForm, NFormItem, 
  NInput, 
  NRadio, NRadioGroup, 
  NDivider, 
  NButton,
  NSelect, NTreeSelect,
  useMessage
} from 'naive-ui';
import { useDark } from '@vueuse/core';
import { usePermissionStore } from '@/stores';


const message = useMessage()
const permissionStore = usePermissionStore()


const props = defineProps<{
  model: Api.RoleInfo
}>()


const emits = defineEmits<{
  (e: 'update:close'): void; 
}>()


const { model } = toRefs(props)
const isDark = useDark();

const roleState = ref([
  { label: '启用', key: 0 },
  { label: '禁用', key: 1 }
])

function save() {
  message.success('保存成功')
}

function handleUpdatePermission(value: string[]) {
  console.log(value)
}


</script>