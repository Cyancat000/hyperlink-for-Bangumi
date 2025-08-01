import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

createApp(App)
  .mount(
    (() => {
      const app = document.createElement('div');
      document.getElementById('panelInterestWrapper')?.append(app);
      return app;
    })(),
  );

