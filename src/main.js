import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import cookies from './util/cookies'
import ArgonDashboard from './plugins/argon-dashboard'
import Notifications from 'vue-notification'
import {firestorePlugin} from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import VueDataTables from 'vue-data-tables'

Vue.use(firestorePlugin);
Vue.use(ElementUI, {locale});
Vue.use(VueDataTables);
Vue.use(ArgonDashboard);
Vue.use(Notifications);


firebase.initializeApp({
    apiKey: "AIzaSyBIceaUJCCOxZo3PPWxnQQ2ZoPk0vLPIy4",
    authDomain: "milan-29557.firebaseapp.com",
    databaseURL: "https://milan-29557.firebaseio.com",
    projectId: "milan-29557",
    storageBucket: "milan-29557.appspot.com",
    messagingSenderId: "221829449028",
    appId: "1:221829449028:web:6228873bcaab56d2",
});

export const db = firebase.firestore();
export const firebaseApp = firebase;

new Vue({
    router,
    cookies,
    store,
    render: h => h(App)
}).$mount('#app')
