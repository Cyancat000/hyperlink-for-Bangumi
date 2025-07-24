<template>
  <div class="relative inline-block text-left">
    <select
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      @change="handleChange"
      :class="{
        'block w-20 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md': true,
        'bg-gray-50 dark:bg-neutral-600 cursor-not-allowed opacity-75': disabled,
        'bg-white dark:bg-neutral-800 border': !disabled,
      }"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  /**
   * 通过 v-model 绑定的当前选中值。
   * @type {string | number | boolean | null}
   */
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: null,
  },
  /**
   * select 元素的唯一标识符。
   * @type {string}
   */
  id: {
    type: String,
    required: true,
  },
  /**
   * 下拉选项数组。
   * 每个选项应包含 `label` 和 `value` 属性。
   * 可选地，可以添加 `disabled` 属性以禁用单个选项。
   * @type {Array<{ label: string, value: string | number | boolean, disabled?: boolean }>}
   */
  options: {
    type: Array,
    required: true,
    validator: (value) => value.every(option => 'label' in option && 'value' in option),
  },
  /**
   * select 输入框是否禁用。
   * @type {boolean}
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 当未选中任何选项时显示的占位符文本。
   * @type {string}
   */
  placeholder: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue', 'change']);

/**
 * 处理原生 select 元素的 change 事件。
 * 发出 `update:modelValue` 用于 v-model 绑定，以及一个自定义的 `change` 事件。
 * @param {Event} event 原生 change 事件。
 */
const handleChange = (event) => {
  const selectedValue = event.target.value;
  emit('update:modelValue', selectedValue);
  emit('change', selectedValue);
};
</script>