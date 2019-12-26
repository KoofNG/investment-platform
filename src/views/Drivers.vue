<template>
  <div>
    <base-header type="success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Cards Stats -->
      <div class="row">
        <div class="col-md-12">
          <div class="card" id="set__top_margin">
            <div class="card-header border-0 side__pads">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-2">Drivers Available</h3>
                </div>
                <div class="col text-right">
                  <el-input v-model="search" size="mini" placeholder="Type to filter search table" />
                </div>
              </div>
              <!-- Insert the content here -->
              <div class="table-responsive pb-5">
                <!-- <fade-transition :duration="700" origin="center top" mode="out-in"> -->
                  <template v-if="drivers.length < 1">
                    <half-circle-spinner :animation-duration="1000" :size="40" color="#ff1d5e" />
                  </template>

                  <template v-else>
                    <el-table
                      class="table-responsive table-flush"
                      header-row-class-name="thead-light"
                      :data="paginatedData.filter(data => !search  || data.driverName.toLowerCase().includes(search.toLowerCase()))"
                      style="width: 100%"
                    >
                      <el-table-column
                        label="Driver Name"
                        class="text-center"
                        prop="driverName"
                        sortable
                      >
                        <template v-slot="{row}">
                          <div class="align-items-center">
                            <span class="font-weight-600 name mb-0 text-sm">{{row.driverName}}</span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="Driver Email" prop="driverEmail" sortable>
                        <template v-slot="{row}">
                          <div class="align-items-center">
                            <span class="font-weight-600 name mb-0 text-sm">{{row.driverEmail}}</span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="Driver Number" prop="driverNum" sortable>
                        <template v-slot="{row}">
                          <div class="align-items-center">
                            <span class="font-weight-600 name mb-0 text-sm">{{row.driverNumber}}</span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="Driver Status" prop="driverStatus" sortable>
                        <template v-slot="{row}">
                          <div class="align-items-center">
                            <span
                              class="font-weight-600 name mb-0 text-sm badge badge-pill badge-danger"
                              v-if="row.driverStatus === 'busy'"
                            >{{row.driverStatus}}</span>
                            <span
                              class="font-weight-600 name mb-0 text-sm badge badge-pill badge-success"
                              v-if="row.driverStatus === 'less_busy'"
                            >{{row.driverStatus}}</span>
                            <span
                              class="font-weight-600 name mb-0 text-sm badge badge-pill badge-dark"
                              v-if="row.driverStatus === 'idle'"
                            >{{row.driverStatus}}</span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="Actions" class="text-center">
                        <template v-slot="{row}">
                          <el-dropdown trigger="click" class="dropdown">
                            <span class="btn btn-sm btn-icon-only text-default">
                              <i class="fas fa-ellipsis-v mt-2"></i>
                            </span>
                            <el-dropdown-menu
                              class="dropdown-menu dropdown-menu-arrow show"
                              slot="dropdown"
                            >
                              <a class="dropdown-item" @click="showDriverModal(row)">View More</a>
                              <a
                                class="dropdown-item"
                                @click="toggleFlagDriver(row)"
                              >{{ row.isFlagged ? 'Unflag' : 'Flag' }}</a>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </template>
                      </el-table-column>
                    </el-table>

                    <div class="card-footer py-4 d-flex justify-content-end">
                      <base-pagination v-model="currentPage" :perPage="perPage" :total="drivers.length"></base-pagination>
                    </div>
                  </template>
                <!-- </fade-transition> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </base-header>

    <!--Modals-->
    <modal :show.sync="driverModal.show" modal-classes="modal-white modal-dialog-centered">
      <div>
        <div class="profile">
          <div class="row">
            <div class="col-md-12">
              <div class="profile__header">
                <img src="../assets/img/avatar.png" alt />
                <h2>{{ driverModal.content.driverName }}</h2>
                <div class="rating">
                  <i
                    v-for="i in 5"
                    v-bind:key="i"
                    class="fas fa-star"
                    :class="i <= driverModal.content.driverRating ? 'text-yellow': 'text-gray'"
                  ></i>
                </div>
              </div>

              <div class="profile__body">
                <div class="body__row">
                  <span class="label">Email</span>
                  <span class="value">{{ driverModal.content.driverEmail }}</span>
                  <div class="divider"></div>
                </div>
                <div class="body__row">
                  <span class="label">Phone Number</span>
                  <span class="value">{{ driverModal.content.driverNumber }}</span>
                  <div class="divider"></div>
                </div>
                <div class="body__row">
                  <span class="label">Driver Status</span>
                  <span class="value">
                    <span
                      class="font-weight-600 name mb-0 text-sm badge badge-pill badge-danger"
                      v-if="driverModal.content.driverStatus === 'busy'"
                    >{{driverModal.content.driverStatus}}</span>
                    <span
                      class="font-weight-600 name mb-0 text-sm badge badge-pill badge-success"
                      v-if="driverModal.content.driverStatus === 'less_busy'"
                    >{{driverModal.content.driverStatus}}</span>
                    <span
                      class="font-weight-600 name mb-0 text-sm badge badge-pill badge-dark"
                      v-if="driverModal.content.driverStatus === 'idle'"
                    >{{driverModal.content.driverStatus}}</span>
                  </span>
                  <div class="divider"></div>
                </div>
                <div class="body__row">
                  <span class="label">Flagged</span>
                  <span
                    class="value"
                    :class="driverModal.content.isFlagged ? 'text-danger' : 'text-success'"
                  >{{ driverModal.content.isFlagged }}</span>
                  <div class="divider"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer">
        <!--        <base-button type="danger">Flag Driver</base-button>-->
        <base-button type="secondary" @click="driverModal.show = false">Close</base-button>
      </template>
    </modal>
  </div>
</template>

<script>
// import { db } from "@/main";
import { HalfCircleSpinner } from "epic-spinners";
// import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    HalfCircleSpinner,
    // FadeTransition
  },

  data() {
    return {
      drivers: [],
      search: "",
      currentPage: 1,
      perPage: 15,
      driverModal: {
        show: false,
        content: {}
      }
    };
  },
  methods: {
    paginate(drivers) {
      let page = this.currentPage;
      let perPage = this.perPage;
      let start = (page * perPage) - perPage;
      let end = page * perPage;
      return drivers.slice(start, end);
    },
    showDriverModal(driver) {
      this.driverModal.show = true;
      this.driverModal.content = driver;
    },
    toggleFlagDriver(driver) {
      driver.isFlagged = !driver.isFlagged;
      // let text = driver.isFlagged ? "Flagged" : "Unflagged";

      // db.collection("Drivers")
      //   .doc(driver.id)
      //   .set(driver)
      //   .then(() => {
      //     this.$notify({
      //       title: "Success",
      //       text: "Driver has been " + text,
      //       type: "info"
      //     });
      //   })
      //   .catch(err => {
      //     this.$notify({
      //       title: "Error",
      //       text: err.message,
      //       type: "error"
      //     });
      //   });
    }
  },
  computed: {
    paginatedData() {
      return this.paginate(this.drivers);
    }
  },

  // firestore() {
  //   return {
  //     drivers: db.collection("Drivers")
  //   };
  // }
};
</script>

<style lang="scss" scoped>
#set__top_margin {
  padding: 30px 40px 40px 40px;
}

.side__pads {
  padding: 15px 0px;
}

.profile {
  margin-top: 20px;
  text-align: center;

  .profile__header {
    img {
      max-width: 70px;
      max-height: 70px;
      border-radius: 15px;
      background-color: #e6e6e6;
      margin-bottom: 10px;
    }
  }

  .profile__body {
    margin-top: 25px;

    .body__row {
      margin-top: 20px;

      .label {
        font-size: 14px;
        font-weight: bold;
        float: left;
        margin-bottom: 2px;
        color: #5a5d5d;
      }

      .value {
        font-size: 14px;
        float: right;
        margin-bottom: 2px;
        color: #5a5d5d;
      }

      .divider {
        clear: both;
        border-top: 1px solid #d3d2d5;
      }
    }
  }
}
</style>

