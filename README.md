# hyperlink-for-Bangumi
为Bangumi编写的快速跳转到其他网站相同条目插件

## Screenshots
![示例](./docs/images/example.webp)
![示例](./docs/images/example2.webp)

## Tech Stack

- [Vite](https://vitejs.dev/) - Modern development server
- [Vue 3](https://vuejs.org/) - The Progressive JavaScript Framework
- [TypeScript](https://www.typescriptlang.org/) - A superset of JavaScript that compiles to clean JavaScript output
- [Sass](https://sass-lang.com/) - CSS with superpowers
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom user interfaces
- [Vite Plugin Monkey](https://github.com/lisonge/vite-plugin-monkey) - A vite plugin server and build your.user.js for userscript engine like Tampermonkey, Violentmonkey, Greasemonkey, ScriptCat

## Get Start
运行开发服务器
```
npm run serve
```
编译油猴脚本文件
```
npm run build
```
编译独立JS脚本文件(For 超合金组件)
```
npm run build:standalone
```

## Update

`1.0`
- 功能: 可跳转到VNDB，展示封面、日期与分数
  
`1.1`
- 优化: 重构部分代码
- 功能: VNDB的vote数与游玩时长及其vote数

`1.1.1`
- 功能: 油猴脚本版本
- 功能: Readme.md

`1.2`
- 优化: 标题过长省略略显示
- 优化: 取消HR
- 优化: 只在正确的类目下展示内容
- 功能: 显示favicon，允许关闭
- 功能: 显示MAL数据
- 功能: 设置与开关
- 修复: 部分数据为0或空的时候的错误显示

`2.0`
 - 重构: 使用Vite+Vue3+TS重构项目
 - 功能: 设置封面展示位置
 - 功能: 全面优化组件样式，加入一些动画
 - 功能: 加入AniList源
 - 功能: 加入漫画条目适配
 - 功能: 自定义展示多个或不展示卡片
 - 优化: 部分特殊情况下的信息展示