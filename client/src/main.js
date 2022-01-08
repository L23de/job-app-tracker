import { createApp } from 'vue'
import { Quasar, Dialog } from 'quasar'
import quasarIconSet from 'quasar/icon-set/svg-ionicons-v6'

import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import 'quasar/src/css/index.sass'
import './css/app.css' // Used to override Quasar's CSS

import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {
    Dialog
  }, // import Quasar plugins and add here
  iconSet: quasarIconSet,
})

myApp.mount('#app')
