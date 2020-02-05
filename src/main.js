import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import BuyModalComponent from '@/components/Shared/BuyModal'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import user from './store/user';

Vue.use(Vuetify)
Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created (){
    fb.initializeApp({
      apiKey: "AIzaSyCAMZw_ufO7LGcc2kOpZGVmtRqFkT7QfrE",
      authDomain: "itc-ads-8a354.firebaseapp.com",
      databaseURL: "https://itc-ads-8a354.firebaseio.com",
      projectId: "itc-ads-8a354",
      storageBucket: "itc-ads-8a354.appspot.com",
      messagingSenderId: "25420113099"
    })

    fb.auth().onAuthStateChanged(user => {
      if(user){
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
