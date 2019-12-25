<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Sign in with your credentials</small>
          </div>
          <form role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="user.email"
            ></base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="user.password"
            ></base-input>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </base-checkbox>
            <div class="text-center">
              <base-button
                @click="handleLogin"
                type="primary"
                class="my-4"
                :disabled="this.isLoading"
              >
                <i v-show="this.isLoading" class="fa fa-spinner fa-spin"></i>&nbsp;Sign
                in
              </base-button>
            </div>
          </form>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light">
            <small>Forgot Password?</small>
          </a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light">
            <small>Register an Account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../../helpers/userService";
import SessionService from "../../helpers/sessionStorage";

export default {
  name: "login",
  data() {
    return {
      isLoading: false,
      user: {
        email: "",
        password: ""
      }
    };
  },

  mounted() {
    

  },

  methods: {
    async handleLogin() {
      if (this.user.email && this.user.password) {
        this.isLoading = true;



        const user = await new UserService.loginUser(this.user).then((res, err) => {
          if (err) {
            this.$notify({
              title: "Error",
              text: err.message,
              type: "error"
            });
          } else {
            console.log(res);
            new SessionService().setAuth("AUTH_DATA", res.data);
            this.isLoading = false;
            this.$router.push("/dashboard");
            return res;
          }
        });
      } else {
        this.$notify({
          title: "Error",
          text: "All fields are required",
          type: "error"
        });
      }
    }
  }
};
</script>
<style scoped>
</style>
