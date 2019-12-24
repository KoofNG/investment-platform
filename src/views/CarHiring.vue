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
                  <h3 class="mb-0"></h3>
                </div>
                <div class="col text-right">
                  <el-input v-model="search" size="mini" placeholder="Type to filter search table" />
                </div>
              </div>
              <!-- Insert the content here -->
              <div class="table-responsive">

              </div>
            </div>
          </div>
        </div>
      </div>
    </base-header>
  </div>
</template>


<script>
export default {};
</script>

<style scoped>
#set__top_margin {
  padding: 30px 40px 40px 40px;
}

.side__pads {
  padding: 15px 0px;
}
</style>

