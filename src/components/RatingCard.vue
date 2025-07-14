<template>
  <div class="rating-card mt-2! p-2! h-18! flex flex-col justify-between relative rounded-lg bg-white shadow-base">
    <!-- 信息卡片 -->
     <template v-if="info.title">
       <a :href="info.link" target="_blank">
       <span class="title flex! gap-1">
         <img v-show="config.showFavicon" class="w-4 h-4 rounded-xs" :src="info.icon"/>
         <span class="truncate">{{ info.title }}</span>
       </span>
       <img class="w-60 mt-4! z-1 absolute hidden" :src="info.url"/>
       </a>
       <p>{{ info.date }}  <b class="num">{{ info.score}}</b>  <small class="grey">{{ info.vote }} votes</small></p>
       <p>
         <small class="grey">{{ info.text[0] }} </small>
         <small> {{ info.text[1] }} </small>
         <small class="grey"> {{ info.text[2] }}</small>
       </p>
     </template>
     <template  v-else>
     </template>
    <!-- 设置图标 -->
    <img :src="settingIcon" alt="设置图标" class="setting absolute duration-500 top-1 left-60" @click="showSettingCard = !showSettingCard">
    <!-- 设置卡片 -->
     <config-card v-show="showSettingCard" :config="config" @change="handleConfigChange"></config-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { reqVNDBData, reqMALData } from '../api/index.js';
import ConfigCard from './ConfigCard.vue';



import settingIcon from '../assets/setting.svg';

const props = defineProps<{ subjectData: {type: string, name: string} }>();

const info = reactive({
  link: '',
  icon: '',
  title: '',
  url: '',
  date: '',
  score: '',
  vote: '',
  text: [] as string[],
});

let config = reactive({
  showFavicon: true
})

const showSettingCard = ref(false);

// ===VNDB模块===

/**
 * @description
 * 请求数据
 */
const renderVNDB = () => {
  const title = props.subjectData.name;
  reqVNDBData(title).then(res => {
    console.log(res);
    info.link = 'https://vndb.org/' + res.results[0].id;
    info.icon = 'https://vndb.org/favicon.ico';
    info.title = res.results[0].alttitle || res.results[0].title;
    info.url = res.results[0].image.url;
    info.date = res.results[0].released;
    info.score = (res.results[0].rating / 10).toFixed(2);
    info.vote = res.results[0].votecount;
    info.text = ['平均游玩时长: ', getLengthHour(res.results[0].length_minutes) + '(' + getLengthWord(res.results[0].length) + ')', res.results[0].length_votes + 'votes'];
  });
}

/**
 * @description 
 * 格式化游玩时长数据
 */
const getLengthWord = (length: number) => {
  switch (length) {
    case 1:
      return "非常短";
    case 2:
      return "短";
    case 3:
      return "中等";
    case 4:
      return "长";
    case 5:
      return "非常长";
    default:
      return '-';
  }
}

/**
 * @description
 * 格式化时长
 */
const getLengthHour = (min: number | null) => {
  if (min == null) {
    return '-'
  } else {
    return (min / 60).toFixed(2) + 'Hours'
  }
}

// ===MAL模块===

const renderMAL = () => {
  const title = props.subjectData.name;
  reqMALData(title).then(res => {
    info.link = res.data[0].url;
    info.icon = 'https://myanimelist.net/favicon.ico';
    info.title = res.data[0].title_japanese;
    info.url = res.data[0].images.jpg.large_image_url;
    info.date = res.data[0].aired.from.slice(0, 10);
    info.score = res.data[0].score;
    info.vote = res.data[0].scored_by;
    info.text = ['MyAnimeList Anime Ranked: ', '#' + res.data[0].rank, ''];
  });
}

// ===缓存配置===
const handleConfigChange = (newConfig: any) => {
  localStorage.setItem('hyper-link-for-bangumi-config', JSON.stringify(newConfig));
}

const getConfig = () => {
  const configStr = localStorage.getItem('hyper-link-for-bangumi-config');
  if (configStr) {
    const newConfig = JSON.parse(configStr);
    Object.assign(config, newConfig);
  }
};

// ===主函数===
getConfig()
if(props.subjectData.type === '游戏') {
  renderVNDB();
} else if(props.subjectData.type === '动画') {
  renderMAL();
}
</script>

<style lang="scss" scoped>
.rating-card>a:hover>img{
  display: block;
}

.rating-card .num{
  color: #E800A4;
}



.rating-card .setting:hover{
  transform: rotate(90deg);
}



</style>
