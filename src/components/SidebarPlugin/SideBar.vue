<template>
  <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
    <div class="container-fluid">
      <!--Toggler-->
      <navbar-toggle-button @click.native="showSidebar">
        <span class="navbar-toggler-icon"></span>
      </navbar-toggle-button>
      <router-link class="navbar-brand" id="logo__name" to="/">
        Honiland
        <!-- <img :src="logo" class="navbar-brand-img" alt="..."> -->
      </router-link>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <base-dropdown class="nav-item" position="right">
            <a slot="title" class="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="ni ni-bell-55"></i>
            </a>

            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </base-dropdown>
          <base-dropdown class="nav-item" position="right">
            <a slot="title" class="nav-link" href="#" role="button">
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" src="img/theme/user.png" />
                </span>
              </div>
            </a>

            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-settings-gear-65"></i>
              <span>Settings</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-calendar-grid-58"></i>
              <span>Activity</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-support-16"></i>
              <span>Support</span>
            </router-link>
            <div class="dropdown-divider"></div>
            <a href="#!" @click="logout" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </base-dropdown>
        </ul>
      </slot>
      <slot></slot>
      <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <!-- <img :src="logo"> -->
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links"></slot>
        </ul>
        <!--Divider-->
        <hr class="my-3" />
        <!--Heading-->
        <h6 class="navbar-heading text-muted">More Links</h6>
        <!--Navigation-->
        <ul class="navbar-nav mb-md-3">
          <!--Todo: Car Hire-->
          <!--<li class="nav-item">
                      <router-link to='/car-hiring' class="nav-link"><i class="fas fa-taxi"></i> Cars for hire</router-link>
          </li>-->
          <li class="nav-item" v-if="isStaff">
            <router-link to="/admin" class="nav-link"> <i class="fas fa-lock"></i> Admins </router-link>
          </li>
          <li class="nav-item">
            <a @click="logout" class="nav-link" style="cursor: pointer"> <i class="fas fa-sign-out-alt"></i> Logout </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";
import UserService from "../../helpers/userService";
import SessionStorage from "../../helpers/sessionStorage";

export default {
  name: "sidebar",
  data() {
    return {
      isStaff: false
    }
  },
  components: {
    NavbarToggleButton
  },
  props: {
    // logo: {
    //   type: String,
    //   default: 'img/brand/green.png',
    //   description: 'Sidebar app logo'
    // },
    autoClose: {
      type: Boolean,
      default: true,
      description: "Whether sidebar should autoclose on mobile when clicking an item"
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  methods: {
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true);
    },
    logout() {
      new UserService.logOut().then((res, err) => {
        if (err) {
          // console.log(err);
        } else {
          this.$cookies.remove("user");
          new SessionStorage().destroySession();
          this.$router.push("/login");
        }
      });
    }
  },

  created() {
    const userId = new SessionStorage().getUserId();
    this.$http.get("users/user_detail/").then((res) => {
      console.log(res.body);
      if (res.body.isStaff) {
        this.isStaff = true;
      }
      // console.log(res.body);
    })
  },

  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  }
};
</script>

<style lang="scss">
#logo__name {
  color: #ffffff;
  font-size: 1.2em;
  font-weight: 500;
  padding: 10px 20px;
  background-image: linear-gradient(87deg, #2dce89 0, #2dcecc 100%);
  border-radius: 4px;
}
</style>
