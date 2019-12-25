import Vue from 'vue'
import VueResource from 'vue-resource'
import SessionStorage from './sessionStorage'

Vue.use(VueResource);

Vue.http.options.root = "https://honiland.herokuapp.com/api/v1/";

export default Vue.http.interceptors.push(function (request, next) {

    const user = JSON.parse(new SessionStorage().getAuth('AUTH_DATA'));

    // alert("You are passing the interceptor");
    // const token = new StorageService().getAuth("AUTH_DATA")
    request.headers.set('Authorization', `JWT ${user.token}`);

    next();


    // private addToken(request: HttpRequest<any>, token: any) {
    //     return request.clone({
    //       setHeaders: {
    //         // Authorization: `Bearer ${token}`
    //         Authorization: `JWT ${token}`
    //       }
    //     });
    //   }
});