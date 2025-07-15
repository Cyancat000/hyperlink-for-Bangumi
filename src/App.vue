<template class="container">
     <div class="container relative">
      <!-- 评分卡片 -->
      <rating-card :subjectData="subjectData" :config="config"/>
      <rating-card :subjectData="subjectData" :config="config"/>
      <rating-card :subjectData="subjectData" :config="config"/>
      <!-- 设置图标 -->
      <img :src="settingIcon" alt="设置图标" class="setting absolute duration-500 top-1 left-60 hover:rotate-90" @click="showSettingCard = !showSettingCard">
      <!-- 设置卡片 -->
      <config-card v-show="showSettingCard" :config="config" @change="handleConfigChange"></config-card>
     </div>
</template>

<script setup lang="ts">
import RatingCard from './components/RatingCard.vue';
import { ref, reactive } from 'vue';
import ConfigCard from './components/ConfigCard.vue';
import settingIcon from './assets/setting.svg';

let showSettingCard = ref(false);

let config = reactive({
  showFavicon: true,
  coverLocation: 'left',
})

// ===缓存配置===
const handleConfigChange = (newConfig: any) => {
  console.log(config, "当前config")
  localStorage.setItem('hyper-link-for-bangumi-config', JSON.stringify(newConfig));
}

const getConfig = () => {
  const configStr = localStorage.getItem('hyper-link-for-bangumi-config');
  if (configStr) {
    const newConfig = JSON.parse(configStr);
    Object.assign(config, newConfig);
  }
};


getConfig()

/**
 * @description
 * 条目数据  
 * type: e.g. 游戏  
 * name: e.g. SWAN SONG  
 */
const subjectData = reactive({
  type: document.querySelector('#navMenuNeue a.focus')?.textContent?? '',
  name: document.querySelector('.nameSingle>a')?.textContent?? '',
});

</script>

<style>


</style>
