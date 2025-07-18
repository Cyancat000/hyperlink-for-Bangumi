/**
 * @fileoverview global.d.ts
 * @description 存放项目中常用的通用类型定义。
 */


type Optional<T> = T | null | undefined;

interface Info {
  link: string;
  icon: string;
  title: string;
  url: string;
  date: string;
  score: number | string;
  votes: number | string; 
  favourites: number | string;
  text: string[];
  countsType: 'votes' | 'favourites'; 
}