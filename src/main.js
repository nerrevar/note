import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'

Vue.use(require('vue-cookie'))

Vue.config.productionTip = false

Vue.prototype.$fetch = async (url, body, callback) => {
  return await fetch(url, {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
