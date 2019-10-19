import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueCurrencyFilter from 'vue-currency-filter';
const moment = require('moment')
require('moment/locale/pt-br')

Vue.config.productionTip = false

Vue.use(require('vue-moment'), {
    moment
})

Vue.use(VueCurrencyFilter,
{
  symbol : 'R$',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
