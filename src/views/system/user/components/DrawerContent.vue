<template>
  <div class="flex flex-col">
    <n-form>
      <n-form-item label="用户名">
        <n-input v-model:value="model.username" placeholder='[空]' />
      </n-form-item>
      <n-form-item label="邮箱">
        <n-input v-model:value="model.email" placeholder='[空]' />
      </n-form-item>
      <n-form-item label="电话">
        <n-input v-model:value="model.phone" placeholder='[空]' />
      </n-form-item>
      <n-form-item label="状态">
        <n-radio-group v-model:value="model.deleted" name="radiogroup">
          <n-radio v-for="s in userState" :key="s.key" :value="s.key">
            {{ s.label }}
          </n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="角色">
        <n-select 
          v-model:value="model.roleIds" 
          multiple 
          :options="roleOptions" 
          label-field="roleName" 
          value-field="businessId"
        />
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
  NSelect,
  useMessage
} from 'naive-ui';
import { useDark } from '@vueuse/core';


const message = useMessage()


const props = defineProps<{
  model: Api.UserInfo
}>()


const emits = defineEmits<{
  (e: 'update:close'): void; 
}>()


const { model } = toRefs(props)
const isDark = useDark();

const roleOptions = ref([
  { roleName: '管理员', businessId: '4' },
  { roleName: '领导', businessId: '3' },
  { roleName: '员工', businessId: '2' }
])

const userState = ref([
  { label: '启用', key: 0 },
  { label: '禁用', key: 1 }
])

function save() {
  message.success('保存成功')
}


</script>