<template>
  <div class="row align-self-center justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Sign in with your credentials</small>
          </div>
          <form role="form">
            <base-input class="input-group-alternative mb-3"
                        placeholder="Email"
                        addon-left-icon="ni ni-email-83"
                        v-model="user.email">
            </base-input>
            
            <base-input class="input-group-alternative"
                        placeholder="Password"
                        type="password"
                        addon-left-icon="ni ni-lock-circle-open"
                        v-model="user.password">
            </base-input>
            
            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </base-checkbox>
            <div class="text-center">
              <base-button @click="handleLogin" type="primary" class="my-4" :disabled="this.isLoading"><i
                v-show="this.isLoading"
                class="fa fa-spinner fa-spin"></i>&nbsp;Sign
                in
              </base-button>
            </div>
          </form>
        </div>
      </div>
      <!--<div class="row mt-3 text-center">
        <div class="col-12">
          <a href="#" class="text-light">
            <small>Forgot password?</small>
          </a>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
    import {db} from "../main";
    import {firebaseApp} from "../main";

    export default {
        name: 'login',
        data() {
            return {
                isLoading: false,
                user: {
                    email: '',
                    password: ''
                }
            }
        },

        mounted() {
        },

        methods: {
            handleLogin() {
                if (this.user.email && this.user.password) {
                    this.isLoading = true;
                    firebaseApp.auth().setPersistence(firebaseApp.auth.Auth.Persistence.LOCAL)
                        .then(() => {
                            firebaseApp.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
                                .then(() => {
                                    firebaseApp.auth().onAuthStateChanged(res => {

                                        db.collection('Admins').doc(res.uid).get().then((res) => {
                                            const user = res.data();

                                            this.$cookies.set('uid', user.uid);
                                            this.$cookies.set('user', JSON.stringify(user));

                                            this.$router.push('/dashboard');
                                        });
                                    
                                    })
                                })
                                .catch(error => {
                                    this.$notify({
                                        title: "Error",
                                        text: error.message,
                                        type: "error"
                                    });
                                })
                                .finally(() => {
                                    this.isLoading = false
                                })
                        })
                } else {
                    this.$notify({
                        title: "Error",
                        text: "All fields are required",
                        type: "error"
                    });
                }
            }

        }
    }
</script>
<style scoped>
</style>
