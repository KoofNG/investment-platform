<template>
        <div class="card">
                <div class="card-header border-0">
                        <div class="row align-items-center">
                                <div class="col">
                                        <h3 class="mb-0">Recent Orders</h3>
                                </div>
                                <div class="col text-right">
                                        <router-link to="/orders" class="btn btn-sm btn-primary">See all</router-link>
                                </div>
                        </div>
                </div>
                
                <div class="table-responsive">
                        <base-table thead-classes="thead-light"
                                    :data="data">
                                <template slot="columns">
                                        <th>Destination</th>
                                        <th>Pickup Name</th>
                                        <th>Request Contact</th>
                                        <th>Request Status</th>
                                        <th>Request Cost</th>
                                </template>
                                
                                <template slot-scope="{row}">
                                        <th scope="row">
                                                {{row.desName}}
                                        </th>
                                        <td>
                                                {{row.pickupName}}
                                        </td>
                                        <td>
                                                {{row.requestContact}}
                                        </td>
                                        <td>
                                                {{row.requestStatus}}
                                        </td>
                                        <td>
                                                {{row.requestCost}}
                                        </td>
                                </template>
                        
                        </base-table>
                </div>
        
        </div>
</template>
<script>
        export default {
                name: 'RecentOrders',
                props: ['data'],
        }
</script>
<style>
</style>
