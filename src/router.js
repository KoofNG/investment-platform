import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'

Vue.use(VueRouter)

const router = new VueRouter({
        linkExactActiveClass: 'active',
        mode: 'history',
        routes: [
                {
                        path: '/',
                        redirect: 'dashboard',
                        component: DashboardLayout,
                        children: [
                                // Importing the various views
                                {
                                        path: '/admin',
                                        name: 'admin',
                                        component: () => import('./views/Admins.vue'),
                                        meta: {
                                                middleware: "auth"
                                        }
                                },
                                {
                                        path: '/car-hiring',
                                        name: 'carHiring',
                                        component: () => import('./views/CarHiring.vue'),
                                        meta: {
                                                middleware: "auth"
                                        }
                                },
                                {
                                        path: '/dashboard',
                                        name: 'dashboard',
                                        component: () => import('./views/Dashboard/Index.vue'),
                                        meta: {
                                                middleware: "auth"
                                        }
                                },
                                {
                                        path: '/drivers',
                                        name: 'driver',
                                        component: () => import('./views/Drivers.vue'),
                                        meta: {
                                                middleware: "auth"
                                        }
                                },
                                {
                                        path: '/errands',
                                        name: 'errands',
                                        component: () => import('./views/Errands.vue'),
                                        meta: {
                                                middleware: "auth"
                                        }
                                },
                                {
                                        path: '/orders',
                                        name: 'order',
                                        component: () => import('./views/Orders.vue'),
                                        meta: {
                                                middleware: "auth"
                                        }
                                },
                                {
                                        path: '/payments',
                                        name: 'payments',
                                        component: () => import('./views/Payment.vue'),
                                        meta: {
                                                middleware: "auth"
                                        }
                                },
                                {
                                        path: '/users',
                                        name: 'user',
                                        component: () => import('./views/Users.vue'),
                                        meta: {
                                                middleware: "auth"
                                        }
                                }
                        ]
                },
                {
                        path: '/',
                        redirect: 'login',
                        component: AuthLayout,
                        children: [
                                {
                                        path: '/login',
                                        name: 'login',
                                        component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue'),
                                        meta: {
                                                middleware: "guest"
                                        }
                                }
                        ]
                }
        ],
});

//Middleware
router.beforeEach((to, from, next) => {
        // sets the page's title
        
        const middleware = to.meta.middleware;
        if (middleware === "auth") {
                if (Vue.prototype.$cookies.get('user') !== null) {
                        next()

                        //Refresh Token
                } else {
                        next({
                                path: '/login',
                        })
                }
        }

        
        if (middleware === 'guest') {
                if (Vue.prototype.$cookies.get('user') === null) {
                        next()
                } else {
                        next({
                                path: '/dashboard',
                        })
                }
        }
        
        // console.log(Vue.prototype.$cookies.get('user'));
        next();
        
});

export default router
