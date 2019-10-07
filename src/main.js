import Vue from 'vue'
import App from './App.vue'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import format from 'date-fns/format';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faTrash, faCheck, faTooth } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPlus, faMinus, faTrash, faCheck, faTooth)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

const eventHub = new Vue() // Single event hub

// Distribute to components using global mixin
Vue.mixin({
    data: function () {
        return {
            eventHub: eventHub
        }
    }
})

Vue.filter('formatDate', function(date) {
  if (date) {
    return format(new Date(date), "MM/dd/yy p");
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
