<template>
  <div>
    <base-header type="success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total number of Orders"
            type="gradient-red"
            :sub-title="orders.length ? orders.length.toString() : 'loading...'"
            icon="fas fa-shipping-fast"
            class="mb-4 mb-xl-0"
          >
            <!-- <template slot="footer">
                                                  <span class="text-success mr-2">
                                                    <i class="fa fa-arrow-up"></i> 3.48%
                                                  </span>
                                                  <span class="text-nowrap">Since last month</span>
            </template>-->
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total number of Drivers"
            type="gradient-green"
            :sub-title="drivers.length ? drivers.length.toString()  : 'loading...'"
            icon="fas fa-user-check"
            class="mb-4 mb-xl-0"
          >
            <!-- <template slot="footer">
                                                  <span class="text-danger mr-2">
                                                    <i class="fa fa-arrow-down"></i> 5.72%
                                                  </span>
                                                  <span class="text-nowrap">Since last month</span>
            </template>-->
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total number of Users"
            type="gradient-orange"
            :sub-title="users.length ? users.length.toString()  : 'loading...'"
            icon="fas fa-users"
            class="mb-4 mb-xl-0"
          >
            <!-- <template slot="footer">
                                                  <span class="text-success mr-2">
                                                    <i class="fa fa-arrow-up"></i> 12.18%
                                                  </span>
                                                  <span class="text-nowrap">Since last month</span>
            </template>-->
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total number of Cars"
            type="gradient-info"
            :sub-title="cars.length ? cars.length.toString()  : 'loading...'"
            icon="fas fa-car"
            class="mb-4 mb-xl-0"
          >
            <!-- <template slot="footer">
                                                  <span class="text-success mr-2">
                                                    <i class="fa fa-arrow-up"></i> 54.8%
                                                  </span>
                                                  <span class="text-nowrap">Since last month</span>
            </template>-->
          </stats-card>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--7">
      <!--Tables-->
      <div class="row mt-5">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <recent-orders :data="orders.slice(0,5)"></recent-orders>
        </div>
        <!-- <div class="col-xl-4">
                                  <social-traffic-table></social-traffic-table>
        </div>-->
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
// import { db } from "@/main";
import { HalfCircleSpinner } from "epic-spinners/src/lib";
import { FadeTransition } from "vue2-transitions";

// Tables
// import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
import RecentOrders from "./RecentOrders";

export default {
  components: {
    RecentOrders
  },
  data: function() {
    return {
      orders: [],
      users: [],
      drivers: [],
      cars: []
    };
  },
  methods: {},
  mounted() {  
  },
  // firestore() {
  //   return {
  //     orders: db.collection("Requests"),
  //     users: db.collection("Users"),
  //     drivers: db.collection("Drivers"),
  //     cars: db.collection("Cars")
  //   };
  // }
};
</script>
<style scoped></style>
