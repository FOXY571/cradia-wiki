import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import LinkBox from './components/entry-components/LinkBox.vue'

const app = createApp(App)

app.use(router)

app.component('LinkBox', LinkBox)

app.mount('#app')
