<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Recent Transactions</h3>
        </div>
        <div class="col text-right">
          <router-link to="/wallet" class="btn btn-sm btn-primary">See all</router-link>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light" :data="data">
        <template slot="columns">
          <th>Transaction Id</th>
          <th>Amount</th>
          <th>Reference Code</th>
          <th>Transaction Type</th>
          <th>Status</th>
        </template>

        <template slot-scope="{ row }">
          <th scope="row">{{ row.id }}</th>
          <td>{{ row.amount }}</td>
          <td>{{ row.reference_code }}</td>
          <td
            class="text-capitalize"
            :class="{
              'text-danger': row.transaction_type === 'withdrawal',
              'text-success': row.transaction_type === 'deposit'
            }"
          >
            {{ row.transaction_type }}
          </td>
          <td class="text-capitalize" :class="{ 'text-danger': row.status === 'pending'}">{{ row.status }}</td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "RecentOrders",
  props: ["data"]
};
</script>
<style></style>
