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
                  <h3 class="mb-0">Available Users</h3>
                </div>
                <div class="col text-right">
                  <el-input v-model="search" size="mini" placeholder="Type to filter search table" />
                </div>
              </div>
            </div>
            <div class="table-responsive pb-5">
                <template v-if="users.length < 1">
                  <half-circle-spinner :animation-duration="1000" :size="40" color="#ff1d5e" />
                </template>
                <template v-else>
                  <el-table
                    class="table-responsive table-flush"
                    header-row-class-name="thead-light"
                    :data="paginatedData.filter(data => !search || data.Name && data.Name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                    <el-table-column label="Name" class="text-center" prop="name" sortable>
                      <template v-slot="{row}">
                        <div class="align-items-center">
                          <span
                            class="font-weight-600 name mb-0 text-sm"
                          >{{row.Name ? row.Name : 'Not Set'}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="Email" prop="email" sortable>
                      <template v-slot="{row}">
                        <div class="align-items-center">
                          <span
                            class="font-weight-600 name mb-0 text-sm"
                          >{{row.Email ? row.Email : 'Not Set'}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="Phone" prop="phone" sortable>
                      <template v-slot="{row}">
                        <div class="align-items-center">
                          <span class="font-weight-600 name mb-0 text-sm">{{row.Phone}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <!--                    var newDate = new Date();-->
                    <!--                    newDate.setTime(unixtime*1000);-->
                    <!--                    dateString = newDate.toUTCString();-->
                    <el-table-column label="Joined Date" prop="joinDate" sortable>
                      <template v-slot="{row}">
                        <div class="align-items-center">
                          <span
                            class="font-weight-600 name mb-0 text-sm"
                          >{{row.joindatetime | convertDate}}</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="card-footer py-4 d-flex justify-content-end">
                    <base-pagination v-model="currentPage" :perPage="perPage" :total="users.length"></base-pagination>
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
import { db } from "../main";
import { HalfCircleSpinner } from "epic-spinners";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    HalfCircleSpinner,
    FadeTransition
  },
  data() {
    return {
      users: [],
      search: "",
      currentPage: 1,
      perPage: 15
    };
  },

  methods:  {
    paginate(users) {
      let page = this.currentPage;
      let perPage = this.perPage;
      let start = (page * perPage) - perPage;
      let end = page * perPage;
      return users.slice(start, end);
    }
  },

  computed: {
    // usersData: function() {
    //   return this.users.filter(data => {
    //     if (!this.search) {
    //       return data;
    //     } else {
    //       if (
    //         data.Name &&
    //         data.Name.toLowerCase().includes(this.search.toLowerCase())
    //       ) {
    //         return data;
    //       }
    //     }
    //     // !this.search || data.Name.toLowerCase().includes(this.search.toLowerCase())
    //   });
    // },

    paginatedData() {
      return this.paginate(this.users);
    }
  },

  filters: {
    convertDate: function(value) {
      let newDate = new Date();
      newDate.setTime(value);
      return newDate.toUTCString().slice(0, 26);
    }
  },

  firestore() {
    return {
      users: db.collection("Users")
    };
  }
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

