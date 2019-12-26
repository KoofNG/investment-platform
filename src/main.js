import Vue from 'vue'
import ElementUI from 'element-ui'
import VueDataTables from 'vue-data-tables'
import Notifications from 'vue-notification'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import router from './router'
import store from './store'
import cookies from './util/cookies'
import ArgonDashboard from './plugins/argon-dashboard'
import Interceptors from './helpers/interceptor';

Vue.config.productionTip = true

Vue.use(ElementUI, { locale });
Vue.use(VueDataTables);
Vue.use(ArgonDashboard);
Vue.use(Notifications);
Vue.use(library);
Vue.use(FontAwesomeIcon);
Vue.use(require('vue-moment'));

library.add(faUserSecret);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Interceptors);
// this.$cookies.set('user',user);



new Vue({
    router,
    cookies,
    store,
    render: h => h(App)
}).$mount('#app')
