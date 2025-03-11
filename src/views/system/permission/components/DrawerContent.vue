<template>
  <div class="flex flex-col">
    <n-form>
      <n-form-item label="代码">
        <n-input v-model:value="model.key" placeholder="[空]" />
      </n-form-item>
      <n-form-item label="名字">
        <n-input v-model:value="model.name" placeholder="[空]" />
      </n-form-item>
      <n-form-item label="显示">
        <n-radio-group v-model:value="model.show" placeholder="[空]" >
          <n-radio v-for="s in roleState" :key="s.label" :value="s.key!">
            {{ s.label }}
          </n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="备注">
        <n-input v-model:value="model.remark" placeholder="[空]" />
      </n-form-item>
      <n-form-item label="图标">
        <n-select
          :options="iconOptions"
          v-model:value="model.iconName"
          :render-label="renderLabel"
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
import { h, ref, toRefs } from 'vue'
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
import { IconMap, renderIcon } from '@/components/icons';


const message = useMessage()
const permissionStore = usePermissionStore()


const props = defineProps<{
  model: Api.Menu;
}>()


const emits = defineEmits<{
  (e: 'update:close'): void; 
}>()


const { model } = toRefs(props)
const isDark = useDark();

const roleState = ref([
  { label: '显示', key: true },
  { label: '隐藏', key: false },
  { label: '默认', key: null }
])

const iconOptions = ref([
  { label: '无', value: "null" },
  ...Object.keys(IconMap).map(key => ({ value: key, label: key }))
])


const renderLabel = (value: { label: string; value: UI.IconName }) => {
  const children = []
  if (!value.value || String(value.value) === 'null') {
    return h('div', { class: "ml-1" }, '无')
  }
  children.push(renderIcon(value.value, { size:20 })())
  children.push(h('div', { }, value.value))
  return h('div', { class: "flex gap-2" }, children)
}


function save() {
  message.success('保存成功')
}

function handleUpdatePermission(value: string[]) {
  console.log(value)
}


</script>