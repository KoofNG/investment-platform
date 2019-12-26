<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Lastest News</h3>
        </div>
        <div class="col text-right">
          <router-link to="/orders" class="btn btn-sm btn-primary">See all</router-link>
        </div>
      </div>
    </div>

    <div class="card-body p-0">
      <!-- List group -->
      <div class="list-group list-group-flush">
        <a
          href="../pages/news-updates.html"
          class="list-group-item list-group-item-action flex-column align-items-start py-4 px-4"
        >
          <div class="d-flex w-100 justify-content-between">
            <div>
              <div class="d-flex w-100 align-items-center">
                <img
                  src=""
                  alt="Image placeholder"
                  class="avatar avatar-xs mr-2"
                />
                <h5 class="mb-1">Thisday</h5>
              </div>
            </div>
            <small>2 hrs ago</small>
          </div>
          <h4 class="mt-3 mb-1">
            <span class="text-info">●</span>$1bn Support for Nigeria’s Agribusiness
          </h4>
          <p
            class="text-sm mb-0"
          >Brazil said it has set aside $100 million for the promotion of agribusiness finance in Nigeri...</p>
        </a>
        <a
          href="../pages/news-updates.html"
          class="list-group-item list-group-item-action flex-column align-items-start py-4 px-4"
        >
          <div class="d-flex w-100 justify-content-between">
            <div>
              <div class="d-flex w-100 align-items-center">
                <img
                  src=""
                  alt="Image placeholder"
                  class="avatar avatar-xs mr-2"
                />
                <h5 class="mb-1">Punch</h5>
              </div>
            </div>
            <small>1 day ago</small>
          </div>
          <h4 class="mt-3 mb-1">
            <span class="text-info">●</span>NIRSAL facilitates N2bn for cocoa exports
          </h4>
          <p
            class="text-sm mb-0"
          >The Nigeria Incentive-Based Risk Sharing System for Agricultural Lending on...</p>
        </a>
        <a
          href="../pages/news-updates.html"
          class="list-group-item list-group-item-action flex-column align-items-start py-4 px-4"
        >
          <div class="d-flex w-100 justify-content-between">
            <div>
              <div class="d-flex w-100 align-items-center">
                <img
                  src=""
                  alt="Image placeholder"
                  class="avatar avatar-xs mr-2"
                />
                <h5 class="mb-1">Forbes</h5>
              </div>
            </div>
            <small>3 days ago</small>
          </div>
          <h4 class="mt-3 mb-1">
            <span class="text-info">●</span>$1 Billion Oil Company built by a young Ghanian
          </h4>
          <p class="text-sm mb-0">Meet Kevin Okyere currently making waves...</p>
        </a>
        <a
          href="../pages/news-updates.html"
          class="list-group-item list-group-item-action flex-column align-items-start py-4 px-4"
        >
          <div class="d-flex w-100 justify-content-between">
            <div>
              <div class="d-flex w-100 align-items-center">
                <img
                  src=""
                  alt="Image placeholder"
                  class="avatar avatar-xs mr-2"
                />
                <h5 class="mb-1">Honiland</h5>
              </div>
            </div>
            <small>5 days ago</small>
          </div>
          <h4 class="mt-3 mb-1">
            <span class="text-info">●</span>HONILAND PROMO IS HERE!
          </h4>
          <p
            class="text-sm mb-0"
          >Get free discount monthly, and stand a chance to be gifted in every June and December</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LatestNews"
};
</script>

<style scoped>
</style>