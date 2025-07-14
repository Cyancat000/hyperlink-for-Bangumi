<script setup>
import { computed } from 'vue';

// 定义组件的 props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    // 为确保唯一性，提供一个默认生成唯一ID的函数
    default: () => `custom-switch-${Math.random().toString(36).substr(2, 9)}`,
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

// 定义组件的 emits 事件
const emit = defineEmits(['update:modelValue', 'change']);

// 计算属性，用于内部控制开关状态
const internalChecked = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    if (!props.disabled) {
      emit('update:modelValue', newValue); // 支持 v-model
      emit('change', newValue); // 触发自定义的 change 事件
    }
  },
});

// 处理点击事件，切换状态
const toggleSwitch = () => {
  if (!props.disabled) {
    internalChecked.value = !internalChecked.value;
  }
};
</script>

<template>
  <div class="flex items-center">
    <button
      role="switch"
      :id="id"
      :aria-checked="internalChecked.toString()"
      :aria-labelledby="label ? `${id}-label` : undefined"
      :disabled="disabled"
      @click="toggleSwitch"
      :class="{
        'relative inline-flex flex-shrink-0 h-4 w-8 border-0 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500': true,
        'bg-blue-600': internalChecked, // 开启时的背景色
        'bg-gray-200': !internalChecked, // 关闭时的背景色
        'opacity-50 cursor-not-allowed': disabled, // 禁用时的样式
      }"
    >
      <span class="sr-only">{{ label || 'Toggle' }}</span>
      <span
        :class="{
          'pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition ease-in-out duration-200': true,
          'translate-x-3': internalChecked, // 开启时滑块移动 (原-translate-x-1, 现-translate-x-4，配合新的宽度计算)
          '-translate-x-1': !internalChecked, // 关闭时滑块位置 (原-translate-x-1)
          'translate-y-[1px]': true, // 滑块垂直居中
        }"
        aria-hidden="true"
      />
    </button>
    <label v-if="label" :for="id" :id="`${id}-label`" class="ml-2 text-gray-700 cursor-pointer select-none">
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
/* 辅助类：隐藏在屏幕上，但对屏幕阅读器可见 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>