<template>
  <div
    class="box-border border border-gray-200 w-60 absolute bg-white rounded-sm duration-5 flex flex-col gap-2 -translate-full -top-2 left-60 shadow-base px-2! py-2!">
    <div class="flex w-full gap-1">
      <span class="flex-1">展示图标</span>
      <custom-switch class="flex-3" v-model="config.showFavicon" @change="handleChange"></custom-switch>
    </div>
    <div class="flex w-full gap-1">
      <span class="flex-1">封面位置</span>
      <custom-select class="flex-3" :options="coverLocationOptions" v-model="config.coverLocation"
        @change="handleChange"></custom-select>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入组件
import CustomSwitch from './forms/CustomSwitch.vue';
import CustomSelect from './forms/CustomSelect.vue';

// 接收父组件传递的数据
const props = defineProps<{
  config: {
    showFavicon: boolean,
    coverLocation: string
  },
}>();

// 定义组件事件
const emit = defineEmits(['change'])

// 静态渲染数据
const coverLocationOptions = [
  { label: '左', value: 'left' }, 
  { label: '右', value: 'right' }, 
  { label: '上', value: 'top' },
  { label: '下', value: 'bottom' },
]

// 表单内容改变触发
const handleChange = () => {
  emit('change', props.config)
}
</script>

<style lang="scss" scoped></style>