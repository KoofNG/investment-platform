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
                  <h3 class="mb-0">Orders Available</h3>
                </div>
                <div class="col text-right">
                  <el-input v-model="search" size="mini" placeholder="Type to filter search table" />
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <!-- <fade-transition :duration="700" origin="center top" mode="out-in"> -->
                <template v-if="orders.length < 1">
                  <half-circle-spinner :animation-duration="1000" :size="40" color="#ff1d5e" />
                </template>
                <template v-else>
                  <el-table
                    class="table-responsive table-flush"
                    header-row-class-name="thead-light"
                    :data="paginatedData.filter(data => !search || data.desName.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                    <el-table-column
                      label="Destination"
                      class="text-center"
                      prop="destinationName"
                      sortable>
                      <template v-slot="{row}">
                        <div class="align-items-center">
                          <span class="font-weight-600 name mb-0 text-sm">{{row.desName}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="Pick Up Name" prop="pickUpName" sortable>
                      <template v-slot="{row}">
                        <div class="align-items-center">
                          <span class="font-weight-600 name mb-0 text-sm">{{row.pickupName}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="Request Contact" prop="requestContact" sortable>
                      <template v-slot="{row}">
                        <div class="align-items-center">
                          <!-- <span class="font-weight-600 name mb-0 text-sm">{{row.title}}</span> -->
                          <span class="font-weight-600 name mb-0 text-sm">{{row.requestContact}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="Request Status" prop="requestStatus" sortable>
                      <template v-slot="{row}">
                        <div class="align-items-center">
                          <span class="font-weight-600 name mb-0 text-sm">{{row.requestStatus}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="Request Cost" prop="requestCost" sortable>
                      <template v-slot="{row}">
                        <div class="align-items-center">
                          <span class="font-weight-600 name mb-0 text-sm">{{row.requestCost}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <!--Todo: View More Action-->
                    <!--<el-table-column label="Actions" class="text-center">
                      <template v-slot="{row}">
                        <el-dropdown trigger="click" class="dropdown">
                          <span class="btn btn-sm btn-icon-only text-light">
                            <i class="fas fa-ellipsis-v mt-2"></i>
                          </span>
                          <el-dropdown-menu
                            class="dropdown-menu dropdown-menu-arrow show"
                            slot="dropdown"
                          >
                            <a class="dropdown-item" href="#">
                              View
                              More
                            </a>
                            <a class="dropdown-item" href="#">Delete</a>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </template>
                    </el-table-column>-->
                  </el-table>
                  <div class="card-footer py-4 d-flex justify-content-end">
                    <base-pagination v-model="currentPage" :perPage="perPage" :total="orders.length"></base-pagination>
                  </div>
                </template>
              <!-- </fade-transition> -->
            </div>
          </div>
        </div>
      </div>
    </base-header>
  </div>
</template>

<script>
// import { db } from "../main";
import { HalfCircleSpinner } from "epic-spinners";
import { FadeTransition } from "vue2-transitions";
import { stat } from "fs";
import { Promise } from "q";

export default {
  components: {
    HalfCircleSpinner,
    FadeTransition
  },

  data() {
    return {
      orders: [],
      search: "",
      currentPage: 1,
      perPage: 15
    };
  },

  methods: {
    paginate(orders) {
      let page = this.currentPage;
      let perPage = this.perPage;
      let start = (page * perPage) - perPage;
      let end = page * perPage;
      return orders.slice(start, end);
    }
  },

  computed: {
    paginatedData() {
      return this.paginate(this.orders);
    }
  },

  mounted() {},

  watch: {},

  // firestore() {
  //   return {
  //     orders: db.collection("Requests")
  //   };
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

