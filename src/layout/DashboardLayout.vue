<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar :background-color="sidebarBackground" short-title="Honiland" title="Honiland">
      <template slot="links">
        <sidebar-item
          :link="{ name: 'Dashboard', icon: 'ni ni-tv-2 text-primary', path: '/dashboard'}"
        />
        <sidebar-item
          :link="{name: 'Wallet', icon: 'ni ni-money-coins text-orange', path: '/wallet'}"
        />
        <sidebar-item
          :link="{name: 'News & Update', icon: 'ni ni-archive-2 text-green', path: '/errands'}"
        />
        <!-- <sidebar-item :link="{name: 'Drivers', icon: 'fas fa-user-check text-red', path: '/drivers'}"/>
        <sidebar-item :link="{name: 'Users', icon: 'fas fa-user text-info', path: '/users'}"/>
        <sidebar-item :link="{name: 'Payments', icon: 'fas fa-donate text-pink', path: '/payments'}"/>-->
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
// import ContentFooter from './ContentFooter.vue';
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    // ContentFooter,
    FadeTransition
  },
  data() {
    return {
      user: {},
      sidebarBackground: "vue" //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },

    getUser() {
      this.$http.get("user/user_detail/").then(res => {
        console.log(res.body);
        this.user = res.body;
      });
    }
  }
};
</script>
<style lang="scss">
</style>
