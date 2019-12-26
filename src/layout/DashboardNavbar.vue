<template>
  <base-nav class="navbar-top navbar-dark" id="navbar-main" :show-toggle-button="false" expand>
    <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
    </form>
    <ul class="navbar-nav align-items-center d-none d-md-flex">
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0">
          <div class="media align-items-center" slot="title">
            <span class="avatar avatar-sm rounded-circle">
              <img alt="Image placeholder" src="img/theme/user.png"/>
            </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm font-weight-bold">Hello, {{this.user.first_name || "Loading.."}} {{this.user.last_name || "Loading.."}}</span>
            </div>
          </div>

          <template>
            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <div class="dropdown-divider"></div>
          </template>
        </base-dropdown>
      </li>
    </ul>
  </base-nav>
</template>
<script>
export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      user: {},
    };
  },
  
  created(){
      // this.user = this.$cookies.get('user');
      this.$http.get("rest-auth/user/").then((res) => {
        // if (err) {
        // }
        this.user = res.body;
      });

  },
  
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>

<style>
#navbar-main{
  background-color: #2dce89;
  /*background-image: linear-gradient(87deg, #2dce89 0, #2dcecc 100%) !important*/
}
</style>

