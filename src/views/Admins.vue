<template>
  <div>
    <base-header type="success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-md-12">
          <div class="card" id="set__top_margin">
            <div class="card-header border-0 side__pads">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Administrators</h3>
                </div>
                <div class="col text-right">
                  <el-input v-model="search" size="mini" placeholder="Search an admin"/>
                </div>
              </div>
            </div>
            <div class="table-responsive pb-5">
              <fade-transition :duration="700" origin="center top" mode="out-in">
                <template v-if="admins.length < 1">
                  <half-circle-spinner
                    :animation-duration="1000"
                    :size="40"
                    color="#ff1d5e"
                  />
                </template>
                <template v-else>
                  <el-table
                    class="table-responsive table-flush"
                    header-row-class-name="thead-light"
                    :data="admins.filter(data => !search  || data.displayName.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                    <el-table-column label="Username" class="text-center" prop='' sortable>
                      <template v-slot="{row}">
                        <div class="align-items-center">
                          <span class="font-weight-600 name mb-0 text-sm">{{row.displayName}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="Email" prop='' sortable>
                      <template v-slot="{row}">
                        <div class="align-items-center">
                          <span class="font-weight-600 name mb-0 text-sm">{{row.email}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="Telephone" prop='' sortable>
                      <template v-slot="{row}">
                        <div class="align-items-center">
                          <span class="font-weight-600 name mb-0 text-sm">{{row.phone}}</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="card-footer py-4 d-flex justify-content-end">
                    <base-pagination v-model="currentPage" :total="50"></base-pagination>
                  </div>
                </template>
              </fade-transition>
            </div>
          </div>
          
          
          <base-button @click="adminModal = true" class="my-4 float-right bg-custom-pink"><i class="fa fa-plus"></i>&nbsp;Create
            Admin
          </base-button>
          
          <modal :show.sync="adminModal"
                 body-classes="p-0"
                 modal-classes="modal-dialog-centered modal-sm">
            <h2 slot="header" class="modal-title" id="modal-title-default">Create a new admin</h2>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-3"
                  class="border-0">
              <template>
                <form role="form">
                  <base-input alternative
                              class="mb-3"
                              placeholder="Email"
                              addon-left-icon="ni ni-email-83"
                              v-model="newAdmin.email">
                  </base-input>
                  <base-input alternative
                              type="password"
                              placeholder="Password"
                              addon-left-icon="ni ni-lock-circle-open"
                              v-model="newAdmin.password">
                  </base-input>
                  <base-input alternative
                              type="text"
                              placeholder="Username"
                              addon-left-icon="ni ni-circle-08"
                              v-model="newAdmin.username">
                  </base-input>
                  <base-input alternative
                              type="text"
                              placeholder="Phone Number"
                              addon-left-icon="ni ni-mobile-button"
                              v-model="newAdmin.phone">
                  </base-input>
                  
                  <div class="text-center">
                    <base-button @click="createNewAdmin" type="primary" class="my-4" :disabled="this.isLoading"><i
                      v-show="this.isLoading"
                      class="fa fa-spinner fa-spin"></i> Submit
                    </base-button>
                  </div>
                </form>
              </template>
            </card>
          </modal>
        </div>
      </div>
    </base-header>
  </div>
</template>

<script>
    // import {db} from "@/main";
    // import firebase from 'firebase/app';
    // import {firebaseApp} from "../main";
    import {HalfCircleSpinner} from 'epic-spinners';
    import {FadeTransition} from 'vue2-transitions';

    export default {
        components: {
            HalfCircleSpinner,
            FadeTransition,
        },

        data() {
            return {
                newAdmin: {},
                adminModal: false,
                admins: [],
                search: "",
                currentPage: 1,
                isLoading: false,
                secondaryApp: () => {},
            };
        },
        
        mounted() {
            // const config = {
            //     apiKey: "AIzaSyBIceaUJCCOxZo3PPWxnQQ2ZoPk0vLPIy4",
            //     authDomain: "milan-29557.firebaseapp.com",
            //     databaseURL: "https://milan-29557.firebaseio.com",
            //     projectId: "milan-29557",
            // };

            // this.secondaryApp = firebase.initializeApp(config, "Secondary");
        },
        
        methods: {
            createNewAdmin() {
                if (this.newAdmin.email && this.newAdmin.password && this.newAdmin.username && this.newAdmin.phone) {
                    this.isLoading = true;
                    
                    // this.secondaryApp.auth().createUserWithEmailAndPassword(this.newAdmin.email, this.newAdmin.password)
                    //     .then((res) => {
                    //         let admin = {
                    //             uid: res.user.uid,
                    //             email: res.user.email,
                    //             phone: this.newAdmin.phone,
                    //             displayName: this.newAdmin.username,
                    //         };

                    //         db.collection('Admins')
                    //             .doc(res.user.uid)
                    //             .set(admin)
                    //             .then(() => {
                    //                 this.adminModal = false;
                    //                 this.$notify({
                    //                     title: "Success",
                    //                     text: "Admin added successfully...",
                    //                     type: "info"
                    //                 });
                    //             })
                    //             .catch(err => {
                    //                 this.$notify({
                    //                     title: "Error",
                    //                     text: err.message,
                    //                     type: "error"
                    //                 });
                    //             })
                    //             .finally(() => {
                    //                 this.isLoading = false;
                    //             });

                    //         this.secondaryApp.auth().signOut();
                    //     })
                    //     .catch(err => {
                    //         this.$notify({
                    //             title: "Error",
                    //             text: err.message,
                    //             type: "error"
                    //         });
                    //     })
                    //     .finally(() => {
                    //         this.isLoading = false;
                    //     })

                } else {
                    this.isLoading = false;
                    this.$notify({
                        title: "Error",
                        text: "All fields are required",
                        type: "error"
                    });
                }
            }

        },

        // firestore() {
        //     return {
        //         admins: db.collection('Admins'),
        //     }
        // }
    };
</script>

<style scoped>
  #set__top_margin {
    padding: 30px 40px 40px 40px;
  }
  
  .side__pads {
    padding: 15px 0px;
  }
</style>

