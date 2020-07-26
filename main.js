import Vue from 'vue'
import App from './App'



import login from './components/login.vue'
Vue.component('login',login)

import custom from './components/custom.vue'
Vue.component('custom',custom)
import abnor from './components/abnor.vue'
Vue.component('abnor',abnor)
import num from './components/num.vue'
Vue.component('num',num)
import stepper from './components/stepper.vue'
Vue.component('stepper',stepper)
import calendar from './components/calendar.vue'
Vue.component('calendar',calendar)
import home from './pages/home/home.vue'
// import home from './pages/home/home-sort.vue'
Vue.component('home',home)
import find from './pages/find/find.vue'
Vue.component('find',find)
import sort from './pages/sort/sort.vue'
Vue.component('sort',sort)
import earn from './pages/earn/earn.vue'
Vue.component('earn',earn)
import shop from './pages/shop/shop.vue'
Vue.component('shop',shop)
import cart from './pages/cart/cart.vue'
Vue.component('cart',cart)
import my from './pages/my/my.vue'
Vue.component('my',my)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



