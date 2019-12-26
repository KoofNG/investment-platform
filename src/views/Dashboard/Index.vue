<template>
  <div>
    <base-header type="success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="NET RETURNS"
            type="gradient-red"
            :sub-title="analytics.net_returns.toString() || 'loading...'"
            icon="ni ni-chart-bar-32" 
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2"> <i class="fa fa-arrow-up"></i> 3.48% </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Invested"
            type="gradient-green"
            :sub-title="analytics.total_investment.toString() || 'loading...'"
            icon="ni ni-chart-pie-35"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-danger mr-2"> <i class="fa fa-arrow-down"></i> 5.72% </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Withdrawal"
            type="gradient-orange"
            :sub-title="analytics.total_withdrawn.toString() || 'loading...'"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2"> <i class="fa fa-arrow-up"></i> 12.18% </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Performance"
            type="gradient-info"
            :sub-title="analytics.performance.toString() || 'loading...'"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2"> <i class="fa fa-arrow-up"></i> 54.8% </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--7">
      <!--Tables-->
      <div class="row mt-5">
        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 mb-5 mb-xl-0">
          <latest-news></latest-news>
        </div>
        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 mb-5 mb-xl-0">
          <recent-orders :data="userTransactions.slice(0, 5)"></recent-orders>
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

// import { HalfCircleSpinner } from "epic-spinners/src/lib";
// import { FadeTransition } from "vue2-transitions";

// Tables
// import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
import RecentOrders from "./RecentOrders";
import LatestNews from "./LatestNews"

// import SessionStorage from "../../helpers/sessionStorage"

export default {
  components: {
    RecentOrders,
    LatestNews
  },
  data: function() {
    return {
      userTransactions: [],
      analytics: {},
      orders: [],
      users: [],
      drivers: [],
      cars: []
    };
  },
  methods: {},

  created() {

    this.$http.get("admin/transaction/").then((res, err) => {
      if (err) {
        // console.log(err);
      } else {
        // console.log(res);
      }
    });

    this.$http.get("transaction/").then((res) => {
      this.userTransactions = res.body;
      // console.log(res);
    });

    this.$http.get("transaction/all_returns/").then((res) => {
      this.analytics = res.body;
      // console.log(res.body);
    });

    // const userId = new SessionStorage().getUserId();
    // this.$http.get("users/" + userId + "/").then((res) => {
    //   // console.log(res);
    // })
  },

  mounted() {}
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
