import { createApp } from 'vue'
import { createStore } from 'vuex'
import { Quasar, Dialog } from 'quasar'
import quasarIconSet from 'quasar/icon-set/svg-ionicons-v6'

import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import 'quasar/src/css/index.sass'
import './css/app.css' // Used to override Quasar's CSS

import App from './App.vue'

const myApp = createApp(App)

const store = createStore({
  state: {
    statusList: [
      {
        'position': 'Pos1',
        'company': 'Company1',
        'statuses': [
          'Applied'
        ],
        'dates': [
          'Date1',
          'Date2'
        ]
      },
      {
        'position': 'Pos2',
        'company': 'Company2',
        'statuses': [
          'Interviewed'
        ],
        'dates': [
          'Date3',
          'Date4'
        ]
      },
    ]
  },
  
  mutations: {
    // POST
    addStatus(newStatus) {
      state.statusList.push(newStatus)
    },

    // DELETE
    removeStatus(index) {
      state.statusList.splice(index, 1)
    },

    // PUT
    updateStatus(index, updateStatus) {
      state.statusList[index] = updateStatus
      // For now, no history of previous statuses and dates
    }
  }
})

myApp.use(store)
myApp.use(Quasar, {
  plugins: {
    Dialog
  }, // import Quasar plugins and add here
  iconSet: quasarIconSet,
})

myApp.mount('#app')
