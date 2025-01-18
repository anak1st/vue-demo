<template>
  <div>
    <n-form-item path="age" label="年龄">
      <n-input v-model:value="model.age" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="password" label="密码">
      <n-input v-model:value="model.password" type="password" @input="handlePasswordInput" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="重复密码">
      <n-input v-model:value="model.reenteredPassword" :disabled="!model.password" type="password"
        @keydown.enter.prevent />
    </n-form-item>
    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <div style="display: flex; justify-content: flex-end">
          <n-button :disabled="model.age === null" round type="primary" @click="handleValidateButtonClick">
            验证
          </n-button>
        </div>
      </n-col>
    </n-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { NForm, NFormItem, NButton, NCol, NRow } from 'naive-ui';

</script>