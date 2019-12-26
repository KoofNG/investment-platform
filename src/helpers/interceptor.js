import Vue from 'vue'
import VueResource from 'vue-resource'
import SessionStorage from './sessionStorage'

Vue.use(VueResource);

Vue.http.options.root = "https://honiland.herokuapp.com/api/v1/";

export default Vue.http.interceptors.push(function (request, next) {

    const user = JSON.parse(new SessionStorage().getAuth('AUTH_DATA'));

    if (user) {
        request.headers.set('Authorization', `JWT ${user.token}`);
    }

    next();
});