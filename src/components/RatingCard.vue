<template>
  <div
    v-if="config.sourceDisplay[type][index].value"
    class="z-1! hover:z-2! group rating-card mt-2! p-2! h-18! flex flex-col justify-between relative rounded-lg bg-white dark:bg-neutral-800 shadow-base  hover:scale-105 duration-500 border border-gray-200 dark:border-neutral-700">
    <!-- 信息卡片 -->
     <template v-if="info.title">
       <a :href="info.link" target="_blank">
       <span class="title flex! gap-1">
         <img v-if="config.showFavicon" class="w-4 h-4 rounded-xs" :src="info.icon"/>
         <span class="truncate">{{ info.title }}</span>
       </span>
       <img class="w-60 absolute opacity-0 group-hover:opacity-100 rounded-sm  duration-500 pointer-events-none" :class="locationStyle" :src="info.url"/>
       </a>
       <p>{{ info.date || 'No Date Data' }}  <b class="text-[#E800A4] mr-1">{{ info.score || '- '}}</b> 
        <small class="grey">{{ counts || 'No' }} {{ info.countsType }}</small></p>
       <p>
         <small class="grey">{{ info.text[0] }} </small>
         <small> {{ info.text[1] }} </small>
         <small class="grey">  {{ " " + info.text[2] }}</small>
       </p>
     </template>
     <template  v-else-if="empty">
      <img :src="emptyIcon" alt="暂无数据" class="w-12 mx-auto block relative top-0 fill-green-500!">
      <span class="inline-block text-gray-500 mx-auto fs-12 flex-1">没有搜寻到任何条目喵~</span>
     </template>
     <template  v-else>
      <div class="h-4 w-full bg-gray-200 rounded-full animate-pulse"></div>
      <div class="h-4 w-1/2 bg-gray-200 rounded-full mt-2 animate-pulse"></div>
      <div class="h-4 w-1/3 bg-gray-200 rounded-full mt-2 animate-pulse"></div>
     </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { reqVNDBData, reqMALData, reqAnilistData } from '../api/index.js';
import { AnilistResults } from '../api/index.js';
import emptyIcon from '../assets/cat.svg';



const props = defineProps<{ 
  source: string,
  name: string,
  config: {
    showFavicon: boolean,
    coverLocation: string,
    sourceDisplay: {
      game: {value: Boolean, label: string}[],
      anime: {value: Boolean, label: string}[],
      manga: {value: Boolean, label: string}[],
    }
  },
  index: number,
  type: 'game' | 'anime' | 'manga'
  }>();




const info = reactive<Info>({
  link: '',
  icon: '',
  title: '',
  url: '',
  date: '',
  score: '',
  votes: '',
  favourites: '',
  text: [],
  countsType: 'votes'
});

const counts = computed(() => {
  const key = info.countsType
  return info[key];
})

let empty = ref(false);

// Tailwind原子类：封面位置
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
    if(res.results.length === 0) {
      empty.value = true;
      return;
    }
    info.link = 'https://vndb.org/' + res.results[0].id;
    info.icon = 'https://vndb.org/favicon.ico';
    info.title = res.results[0].alttitle || res.results[0].title;
    info.url = res.results[0].image.url;
    info.date = res.results[0].released;
    info.score = (res.results[0].rating / 10).toFixed(2);
    info.votes = res.results[0].votecount;
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

const renderMAL = (type: string = 'Anime') => {
  const title = props.name;
  reqMALData(title, type).then(res => {
    console.log('MALInfo', res, info);
    info.link = res.data[0].url;
    info.icon = 'https://myanimelist.net/favicon.ico';
    info.title = res.data[0].title_japanese;
    info.url = res.data[0].images.jpg.large_image_url;
    if(type === 'Manga') {
      if(res.data[0].published.from){
        info.date = res.data[0].published.from.slice(0, 10);
      }else{
        info.date = ''
      }
    }else{
      if(res.data[0].aired.from){
        info.date = res.data[0].aired.from.slice(0, 10);
      }else{
        console.log(123)
        info.date = ''
      }
    }
    info.score = res.data[0].score;
    info.votes = res.data[0].scored_by;
    if(res.data[0].rank == null) {
      info.text = [`No MAL ${type} Ranked`, '', ''];
    }else{
      info.text = [`MyAnimeList ${type} Ranked: `, '#' + res.data[0].rank, ''];
    }
  }).catch(() => {
    empty.value = true;
  });
}

// ===获取AniList信息===

const renderAniList = (type: string = 'Anime') => {
  const title = props.name;
  reqAnilistData(title, type).then(res => {
    info.link = 'https://anilist.co/anime/' + res.data.Media.id;
    info.icon = 'https://anilist.co/favicon.ico';
    info.title = res.data.Media.title.native;
    info.url = res.data.Media.coverImage.large;
    if(res.data.Media.startDate.year === null){
      info.date = 'No Date Data'
    }else{
      info.date = res.data.Media.startDate.year + '-' + res.data.Media.startDate.month + '-' + res.data.Media.startDate.day;
    }
    info.score = Number(res.data.Media.averageScore)/10;
    info.favourites = res.data.Media.favourites;
    info.countsType = 'favourites';
    const ranking = getRatedByYear(res.data.Media.rankings);
    if(ranking === null) {
      info.text = [`No AniList ${type} Ranked`, '', ''];
    }else if(ranking.allTime) {
      info.text = [`AniList ${type} Ranked: `, '#' + ranking.rank, ''];
    }else{
      info.text = [`AniList ${type} ${ranking.year} Ranked: `, '#' + ranking.rank, ''];
    }
    console.log(res);
  }).catch(() => {
    empty.value = true;
  })
}

const getRatedByYear = (rankings: AnilistResults['data']['Media']['rankings']) => {
  const yearRated = rankings.filter(ranking => ranking.type === "RATED" && !ranking.allTime) || rankings.filter(ranking => ranking.type === "RATED" && ranking.allTime); // yearRated
  if (yearRated.length === 0) {
    return null;
  }
  return yearRated[0]
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
  case 'AniListManga':
    renderAniList('Manga');
    break;
  case 'MALManga':
    renderMAL('Manga');
    break;
  default:
    break;
}
</script>

<style lang="scss" scoped>
</style>
