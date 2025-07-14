import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite'
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: '	https://lain.bgm.tv/pic/user/l/000/60/91/609137.jpg?r=1733589536&hd=1',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://bgm.tv/subject/*', 'https://bangumi.tv/subject/*', 'https://chii.in/subject/*'],
        name: 'hyper-link-for-bangumi',
        version: '2.0',
        author: 'CyanCat000'
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
    tailwindcss(),
  ],
  build: {
    cssCodeSplit: false
  }
});
