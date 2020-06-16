import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { fb } from './firebase'

import DateFilter from '@/components/Filters/Date'
import DateShortFilter from '@/components/Filters/DateShort'
import TimeFilter from '@/components/Filters/Time'

Vue.filter('date', DateFilter)
Vue.filter('dateShort', DateShortFilter)
Vue.filter('time', TimeFilter)

Vue.config.productionTip = false
Vue.use(VueRouter)

let app = ''

fb.auth().onAuthStateChanged(function(user) {
  if(!app){
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
      created () {
        if (user) {
          this.$store.dispatch('getUser', user)
          if(this.$store.state.user.name !== null) {
            this.$store.dispatch('cart/getCart', user.uid)
          }
          this.$store.dispatch('request/getRequests')
          this.$store.dispatch('customer/getCustomers')
          this.$store.dispatch('tool/getTools')
        }
      } 
    }).$mount('#app')
  }
})

