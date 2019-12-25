<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Sign up Credentials</small>
          </div>
          <form role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="First Name"
              addon-left-icon="ni ni-hat-3"
              v-model="model.first_name"
            ></base-input>

            <base-input
              class="input-group-alternative mb-3"
              placeholder="Last Name"
              addon-left-icon="ni ni-hat-3"
              v-model="model.last_name"
            ></base-input>

            <base-input
              class="input-group-alternative mb-3"
              placeholder="Username"
              addon-left-icon="ni ni-hat-3"
              v-model="model.username"
            ></base-input>

            <base-input class="input-group-alternative mb-3" placeholder="Email" addon-left-icon="ni ni-email-83" v-model="model.email"></base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password1"
            ></base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Confirm Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password2"
            ></base-input>

            <!-- <div class="row my-4">
              <div class="col-12">
                <base-checkbox class="custom-control-alternative">
                  <span class="text-muted">
                    I agree with the
                    <a href="#!">Privacy Policy</a>
                  </span>
                </base-checkbox>
              </div>
            </div>-->
            <div class="text-center">
              <base-button @click="handleRegister" type="primary" class="my-4">
                <i v-show="this.isLoading" class="fa fa-spinner fa-spin"></i>&nbsp;Create account
              </base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light">
            <small>Forgot password?</small>
          </a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/login" class="text-light">
            <small>Login into your account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../../helpers/userService";
import SessionService from "../../helpers/sessionStorage";

import axios from "axios"

// import AuthService from "../../services/auth/authService";

export default {
  name: "register",
  data() {
    return {
      isLoading: false,
      model: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password1: "",
        password2: ""
      }
    };
  },
  methods: {
    async handleRegister() {
      if (this.model.first_name && this.model.last_name && this.model.username) {
        if (this.model.password1 !== this.model.password2) {
          this.$notify({
            title: "Error",
            text: "Password does not match",
            type: "error"
          });
        } else {
          this.isLoading = true;
          const user = await new UserService.registerUser(this.model);

          if (user.statusText == "Created" && user.status == 201) {
            new SessionService().setAuth("AUTH_DATA", user.data);
            this.isLoading = false;
            this.$router.push("/dashboard");
          }
        }
      }
    }
  }
};
</script>

<style scoped></style>
