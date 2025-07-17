<template>
  <div class="z-1! hover:z-2! group rating-card mt-2! p-2! h-18! flex flex-col justify-between relative rounded-lg bg-white shadow-base  hover:scale-105 duration-500 border border-gray-200">
    <!-- 信息卡片 -->
     <template v-if="info.title">
       <a :href="info.link" target="_blank">
       <span class="title flex! gap-1">
         <img v-if="config.showFavicon" class="w-4 h-4 rounded-xs" :src="info.icon"/>
         <span class="truncate">{{ info.title }}</span>
       </span>
       <img class="w-60 absolute opacity-0 group-hover:opacity-100 rounded-sm  duration-500 pointer-events-none" :class="locationStyle" :src="info.url"/>
       </a>
       <p>{{ info.date }}  <b class="text-[#E800A4]">{{ info.score}}</b>  <small class="grey">{{ info.vote || info.favourites }} {{ info.vote ? 'votes' : 'favourites' }}</small></p>
       <p>
         <small class="grey">{{ info.text[0] }} </small>
         <small> {{ info.text[1] }} </small>
         <small class="grey">  {{ " " + info.text[2] }}</small>
       </p>
     </template>
     <template  v-else>
      <div class="h-4 w-full bg-gray-200 rounded-full animate-pulse"></div>
      <div class="h-4 w-1/2 bg-gray-200 rounded-full mt-2 animate-pulse"></div>
      <div class="h-4 w-1/3 bg-gray-200 rounded-full mt-2 animate-pulse"></div>
     </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { reqVNDBData, reqMALData, reqAnilistData } from '../api/index.js';
import { AnilistResults } from '../api/index.js';
import { get } from 'http';


const props = defineProps<{ 
  source: string,
  name: string,
  config: {
    showFavicon: boolean,
    coverLocation: string
  }
  }>();

const info = reactive({
  link: '',
  icon: '',
  title: '',
  url: '',
  date: '',
  score: '' as number | string,
  vote: '',
  favourites: '' as number | string,
  text: [] as string[],
});

// 计算属性
const locationStyle = computed(() => {
  switch (props.config.coverLocation) {
    case 'left':
      return '-left-2 top-0 -translate-x-full';
    case 'right':
      return '-right-2 top-0 translate-x-full';
    case 'top':
      return '-top-2 left-0 -translate-y-full';
    case 'bottom':
      return '-bottom-2 left-0 translate-y-full';
  }
})


// ===获取VNDB信息===

/**
 * @description
 * 请求数据
 */
const renderVNDB = () => {
  const title = props.name;
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
 * 格式化VNDB游玩时长数据
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
 * 格式化VNDB时长
 */
const getLengthHour = (min: number | null) => {
  if (min == null) {
    return '-'
  } else {
    return (min / 60).toFixed(2) + 'Hours'
  }
}

// ===获取MAL信息===

const renderMAL = () => {
  const title = props.name;
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

// ===获取AniList信息===

const renderAniList = () => {
  const title = props.name;
  reqAnilistData(title).then(res => {
    info.link = 'https://anilist.co/anime/' + res.data.Media.id;
    info.icon = 'https://anilist.co/favicon.ico';
    info.title = res.data.Media.title.native;
    info.url = res.data.Media.coverImage.large;
    info.date = res.data.Media.startDate.year + '-' + res.data.Media.startDate.month + '-' + res.data.Media.startDate.day;
    info.score = Number(res.data.Media.averageScore)/10;
    info.favourites = res.data.Media.favourites;
    info.text = [`AniList Anime ${getRatedByYear(res.data.Media.rankings).year} Ranked: `, '#' + getRatedByYear(res.data.Media.rankings).rank, ''];
    console.log(res);
  })
}

const getRatedByYear = (rankings: AnilistResults['data']['Media']['rankings']) => {
  const yearRated = rankings.filter(ranking => ranking.type === "RATED" && ranking.year); // yearRated
  return {
    year: yearRated[0].year?.toString() || '',
    rank: yearRated[0].rank
  }
}


// ===主函数===
switch (props.source) {
  case 'VNDB':
    renderVNDB();
    break;
  case 'MAL':
    renderMAL();
    break;
  case 'AniList':
    renderAniList();
    break;
}
</script>

<style lang="scss" scoped>
</style>
