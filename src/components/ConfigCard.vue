<template>
  <div class="setting-card w-auto absolute bg-white rounded-sm translate-full bottom-25 left-0 shadow-base px-2! py-1!">
    <custom-switch label="显示Favicon" v-model="config.showFavicon" @change="handleChange"></custom-switch>
  </div>
</template>

<script setup>
import CustomSwitch from './CustomSwitch.vue';
import { watch } from 'vue';

const props = defineProps({
  config: Object,
});

const emit = defineEmits(['change'])

const handleChange = () => {
  emit('change', props.config)
}
</script>

<style lang="scss" scoped>

</style>