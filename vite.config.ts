import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite'
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig(()=>{

  const isStandaloneBuild = process.env.BUILD_TARGET === 'standalone';

  const defaultExternalGlobals = {
    // 假设您希望 Vue 在油猴脚本版本中通过 @require 引入
    vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
    // 如果您有其他需要外部化的库，也可以在这里列出
  };

  return {
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: isStandaloneBuild ? undefined : {
        icon: '	https://lain.bgm.tv/pic/user/l/000/60/91/609137.jpg?r=1733589536&hd=1',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://bgm.tv/subject/*', 'https://bangumi.tv/subject/*', 'https://chii.in/subject/*'],
        name: 'hyper-link-for-bangumi',
        version: '2.0',
        author: 'CyanCat000'
      },
      build: {
        externalGlobals: isStandaloneBuild ? {} : defaultExternalGlobals
      },
    }),
    tailwindcss(),
  ],
  build: {
    cssCodeSplit: false
  }
}
});
