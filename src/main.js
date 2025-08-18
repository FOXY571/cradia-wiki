import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import entryComponents from './components/entry-components'

const app = createApp(App)

app.use(router)

for (const [name, component] of Object.entries(entryComponents)) {
  app.component(name, component)
}

app.mount('#app')
