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
                  <h3 class="mb-0">Transactions</h3>
                </div>
                <div class="col text-right">
                  <el-input v-model="search" size="mini" placeholder="Type to filter search table" />
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <template v-if="payments.length < 1">
                <half-circle-spinner :animation-duration="1000" :size="40" color="#ff1d5e" />
              </template>
              <template v-else>
                <el-table
                  class="table-responsive table-flush"
                  header-row-class-name="thead-light"
                  :data="paginatedData"
                  style="width: 100%"
                >
                  <el-table-column
                    label="Amount To Be Paid"
                    class="text-center"
                    prop="amountToBePaid"
                    sortable
                  >
                    <template v-slot="{row}">
                      <div class="align-items-center">
                        <span class="font-weight-600 name mb-0 text-sm">{{row.amountToBePaid}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="Cancelled Drives" prop="cancelledDrives" sortable>
                    <template v-slot="{row}">
                      <div class="align-items-center">
                        <span class="font-weight-600 name mb-0 text-sm">{{row.cancelledDrives}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="Number Of Drives" prop="numberOfDrives" sortable>
                    <template v-slot="{row}">
                      <div class="align-items-center">
                        <span class="font-weight-600 name mb-0 text-sm">{{row.numberOfDrives}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="Paid Status" prop="paidStatus" sortable>
                    <template v-slot="{row}">
                      <div class="align-items-center">
                        <span class="font-weight-600 name mb-0 text-sm">{{row.paidStatus}}</span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="card-footer py-4 d-flex justify-content-end">
                  <base-pagination v-model="currentPage" :perPage="perPage" :total="payments.length"></base-pagination>
                </div>
              </template>
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
// import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    HalfCircleSpinner,
    // FadeTransition
  },
  data() {
    return {
      search: "",
      currentPage: 1,
      perPage: 10,
      months: ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"],
      payments: []
    };
  },

  methods: {
    paginate(payments) {
      let page = this.currentPage;
      let perPage = this.perPage;
      let start = (page * perPage) - perPage;
      let end = page * perPage;
      return payments.slice(start, end);
    }
  },

  computed: {
    paginatedData() {
      const e = this.paginate(this.payments);
      return e;
    }
  },

  // firestore() {
  //   this.months.forEach(month => {
  //     const monthlyTransaction = db
  //       .collection("Payments")
  //       .doc("2019")
  //       .collection(`${month}`)
  //       .get()
  //       .then(querySnapshot => {
  //         const documents = querySnapshot.docs.map(doc => doc.data());
  //         documents.forEach(element => {
  //           this.payments.push(element);
  //         });
  //         return this.payments;
  //       });
  //   });
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
