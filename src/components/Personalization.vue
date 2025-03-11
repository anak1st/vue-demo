<template>
  <div class="flex flex-col gap-4 pb-1">
    <LayoutSetting />

    <n-divider class="!m-0" />
    
    <n-form label-placement="left" :label-width="100" label-align="left" class="mx-5" >
      <n-grid :cols="2" :x-gap="60">
        <n-form-item-gi label="深色模式" :show-feedback="false" >
          <n-switch v-model:value="isDark" />
        </n-form-item-gi>
        <n-form-item-gi label="全屏模式" :show-feedback="false" >
          <n-switch 
            :value="isFullscreen" 
            @update:value="toggle"
          />
        </n-form-item-gi>
        <n-form-item-gi label="侧边栏反转色" :show-feedback="false" >
          <n-switch v-model:value="themeStore.theme.sider.inverted" />
        </n-form-item-gi>
      </n-grid>
    </n-form>

    <n-divider class="!m-0" />
    
    <n-collapse display-directive="show" >
      <n-collapse-item title="顶栏" name="0">
        <n-form label-placement="left" :label-width="100" label-align="left" class="mx-5" >
          <n-grid :cols="2" :x-gap="60">
            <n-form-item-gi label="紧凑顶栏" :show-feedback="false" >
              <n-switch @update:value="(v) => themeStore.setCompactHeaderTab(v)" />
            </n-form-item-gi>
            <n-form-item-gi label="显示面包屑" :show-feedback="false" >
              <n-switch v-model:value="themeStore.theme.header.showBreadcrumbs" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-collapse-item>

      <n-collapse-item title="侧边栏" name="1">
        <n-form label-placement="left" :label-width="100" label-align="left" class="mx-5" >
          <n-form-item label="侧边栏宽度" :show-feedback="false" >
            <n-slider v-model:value="themeStore.theme.sider.width" :min="100" :max="300" />
          </n-form-item>
        </n-form>
      </n-collapse-item>
    </n-collapse>
    <n-divider class="!m-0" />
    <div class="flex justify-end gap-4">
      <n-button type="info">
        取消
      </n-button>
      <n-button type="primary" @click="themeStore.reset" >
        恢复默认
      </n-button>
    </div>
   
  </div>
</template>


<script setup lang="ts">
import { 
  NCollapse, 
  NCollapseItem,
  NSwitch,
  NSlider,
  NButton,
  NForm, NFormItem, NGrid, NFormItemGi,
  NDivider
} from 'naive-ui';
import { useDark, useFullscreen } from '@vueuse/core';
import { useThemeStore } from '@/stores';
import LayoutSetting from './LayoutSetting.vue';


const themeStore = useThemeStore();
const isDark = useDark();
const { toggle, isFullscreen } = useFullscreen();


</script>