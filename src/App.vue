<template class="container">
     <div class="container">
       <rating-card :subjectData="subjectData" msg="Vite + Vue" />
     </div>
</template>

<script setup lang="ts">
import RatingCard from './components/RatingCard.vue';
import { reactive } from 'vue';




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
