import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueShowdownPlugin } from 'vue-showdown'

const app = createApp(App)

app.use(router)
app.use(VueShowdownPlugin, {
  options: {
    tables: true,
    ghCompatibleHeaderId: true,
  },
})

app.mount('#app')
