<template class="container">
     <div class="container relative">
      <!-- 评分卡片 -->
      <rating-card v-for="source in sourceList" :source="source" :name="subjectName" :config="config"/>
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

const sourceListByType = reactive({
  game: ['VNDB'],
  anime: ['MAL', 'AniList'],
  // manga: ['AniListManga'],
});

const sourceList: string[] = reactive([])

const subjectName = ref(document.querySelector('.nameSingle>a')?.textContent?? '')

switch(document.querySelector('#navMenuNeue a.focus')?.textContent?? ''){
  case '游戏': 
    sourceList.push(...sourceListByType.game)
    break;
  case '动画': 
    sourceList.push(...sourceListByType.anime)
    break;
  case '书籍':
    if(document.querySelector('.nameSingle>.grey')?.textContent?.includes('漫画')) {
      // console.log('是漫画!!')
      // sourceList.push(...sourceListByType.manga)
    }
    break;
}


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

</script>

<style>


</style>
