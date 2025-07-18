<template>
  <div
    class="box-border border border-gray-200 w-60 absolute z-4 bg-white rounded-sm duration-5 flex flex-col gap-2 -translate-full -top-2 left-60 shadow-base px-2! py-2! text-sm font-medium">
    <div class="flex w-full gap-1">
      <span class="flex-3">展示图标</span>
      <custom-switch class="flex-7" v-model="config.showFavicon" @change="handleChange"></custom-switch>
    </div>
    <div class="flex w-full gap-1">
      <span class="flex-3">封面位置</span>
      <custom-select class="flex-7" :options="coverLocationOptions" v-model="config.coverLocation"
        @change="handleChange"></custom-select>
    </div>
    <div class="flex w-full gap-1 font-bold before:content-[''] before:w-1 before:h-4 before:bg-gray-500 before:rounded-xs before:relative before:top-0.5">
      <span class="flex-3">游戏</span>
    </div>
    <div class="flex w-full gap-1" v-for="item in config.sourceDisplay.game">
      <span class="flex-3">{{ item.label }}</span>
      <custom-switch class="flex-7" v-model="item.value" @change="handleChange"></custom-switch>
    </div>
    <div class="flex w-full gap-1 font-bold  before:content-[''] before:w-1 before:h-4 before:bg-gray-500 before:rounded-xs before:relative before:top-0.5">
      <span class="flex-3">动画</span>
    </div>
    <div class="flex w-full gap-1" v-for="item in config.sourceDisplay.anime">
      <span class="flex-3">{{ item.label }}</span>
      <custom-switch class="flex-7" v-model="item.value" @change="handleChange"></custom-switch>
    </div>
    <div class="flex w-full gap-1 font-bold  before:content-[''] before:w-1 before:h-4 before:bg-gray-500 before:rounded-xs before:relative before:top-0.5">
      <span class="flex-3">漫画</span>
    </div>
    <div class="flex w-full gap-1" v-for="item in config.sourceDisplay.manga">
      <span class="flex-3">{{ item.label }}</span>
      <custom-switch class="flex-7" v-model="item.value" @change="handleChange"></custom-switch>
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
    coverLocation: string,
    sourceDisplay: {
      game: {value: Boolean, label: string}[],
      anime: {value: Boolean, label: string}[],
      manga: {value: Boolean, label: string}[],
    }
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