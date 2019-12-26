<template>
  <div>
    <base-header type="success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row">
        <div class="col-12 card-wrapper ct-example">
          <div class="card">
            <div class="card-header">
              <h3 class="mb-0">Quick Actions</h3>
            </div>
            <div class="card-body">
              <button @click="showDeposit = true" type="button" class="btn base-button btn-icon btn-fab btn-primary">
                <i class="fas fa-money-bill-wave"></i>
                Make Deposit
              </button>
              <button @click="showWithdrawal = true" type="button" class="btn base-button btn-icon btn-fab btn-primary">
                <i class="fas fa-money-check-alt"></i>
                Make Withdrawal
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-12">
          <div class="card">
            <div class="card">
              <div class="card-header border-0">
                <div class="row align-items-center">
                  <div class="col">
                    <h3 class="mb-0">Transactions History</h3>
                  </div>
                  <!-- <div class="col text-right">
                    <router-link to="/orders" class="btn btn-sm btn-primary">See all</router-link>
                  </div>-->
                </div>
              </div>

              <div class="table-responsive">
                <base-table thead-classes="thead-light" :data="userTransactions">
                  <template slot="columns">
                    <th>Transaction Id</th>
                    <th>Reference Code</th>
                    <th>Transaction Type</th>
                  </template>

                  <template slot-scope="{ row }">
                    <th scope="row">{{ row.id }}</th>
                    <td>{{ row.reference_code }}</td>
                    <td>{{ row.transaction_type }}</td>
                  </template>
                </base-table>
              </div>
            </div>
          </div>
        </div>

        <modal :show.sync="showDeposit" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm">
          <h2 slot="header" class="modal-title" id="modal-title-default">Choose Deposit Method</h2>
          <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-3" class="border-0">
            <template>
              <form role="form">
                <base-radio type="radio" value="payStack" id="payStack" v-model="depositMode" name="payStack">
                  <label for="payStack">PayStack Direct Bank Transfer</label>
                </base-radio>
                <base-radio type="radio" value="bankTransfer" id="pay" v-model="depositMode" name="bankTransfer">
                  <label for="pay">Bank Transfer</label>
                </base-radio>

                <div v-if="depositMode === 'bankTransfer'" class="mt-3">
                  <h4 slot="header" class="modal-title mb-2" id="modal-title-default">Banking Details</h4>
                  <div class="form-group mb-1">
                    <label class="form-control-label">Amount</label>
                    <div class="has-label">
                      <base-input alternative type="text" placeholder="20000" addon-left-icon="ni ni-money-coins" v-model="amount_paid"></base-input>
                    </div>
                  </div>
                  <div class="form-group mb-1">
                    <label class="form-control-label">Transaction Description (Include Ref No.)</label>
                    <div class="has-label">
                      <textarea id resize="none" rows="2" class="form-control" v-model="transaction_detail"></textarea>
                    </div>
                  </div>
                  <base-button @click="submitBankRecord" type="primary" class="my-1" :disabled="this.isLoading"
                    ><i v-show="this.isLoading" class="fa fa-spinner fa-spin"></i> Submit
                  </base-button>
                </div>
              </form>
            </template>
          </card>
        </modal>

        <modal :show.sync="showWithdrawal" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm">
          <h2 slot="header" class="modal-title" id="modal-title-default">Withdrawal</h2>

          <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-3" class="border-0">
            <template>
              <form role="form">
                <div class="form-group mb-1">
                  <label class="form-control-label">Amount</label>
                  <div class="has-label">
                    <base-input
                      type="number"
                      placeholder="20000"
                      addon-left-icon="ni ni-money-coins"
                      v-model="withdrawal_amount"
                    ></base-input>
                  </div>
                </div>

                <div class="form-group mb-1">
                  <label class="form-control-label">Bank Name</label>
                  <select class="form-control"></select>
                </div>
                <div class="form-group mb-1">
                  <label class="form-control-label">Account Number</label>
                  <div class="has-label">
                    <base-input
                      type="number"
                      placeholder="0123456789"
                      addon-left-icon="ni ni-money-coins"
                    ></base-input>
                  </div>
                </div>
                <base-button @click="submitWithdrawalForm" type="primary" class="my-1" :disabled="this.isLoading"
                  ><i v-show="this.isLoading" class="fa fa-spinner fa-spin"></i> Submit
                </base-button>
              </form>
            </template>
          </card>
        </modal>
      </div>
    </base-header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      showDeposit: false,
      showWithdrawal: false,
      depositMode: "",
      userTransactions: [],
      amount_paid: "",
      transaction_detail: "",
      withdrawal_amount: "",
      bank_name: "",
      account_number: ""
    };
  },

  methods: {
    submitBankRecord() {
      
      this.isLoading = true;
      const bankTransfer = {
        "transaction_type": "deposit",
        "amount": this.amount_paid
      }
      this.$http.post("transaction/", bankTransfer).then((res, err) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res);
          this.isLoading = false;
          this.$router.push("/dashboard")
        }
      })
    },

    submitWithdrawalForm() {
      this.isLoading = true;
      const cashWithdrawal = {
        "transaction_type": "withdrawal",
        "amount": this.withdrawal_amount
      }

      this.$http.post("transaction/", cashWithdrawal).then((res, err) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res);
          this.isLoading = false;
          this.$router.push("/dashboard")
        }
      })
    }
  },

  created() {
    this.$http.get("transaction/").then((res) => {
      this.userTransactions = res.body;
      // console.log(res);
    });
  }
};
</script>

<style scoped></style>
