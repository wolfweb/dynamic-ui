import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/routes/';
import { setupStore } from '@/store';
import { setupRouterGuard } from '@/routes/guard';
import { setupErrorHandle } from '@/hooks/error-handle';
import { initElementPlus } from '@/plugins/element-plus';

import 'normalize.css'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import 'animate.css'

async function bootstrap(){
  const app = createApp(App);

  setupStore(app);
  
  initElementPlus(app);
    
  app.use(router);
  
  setupRouterGuard(router);

  setupErrorHandle(app);
  
  await router.isReady();

  app.config.unwrapInjectedRef = true;

  app.config.globalProperties.$$app = app;
  
  app.mount('#app', true);
}

bootstrap()