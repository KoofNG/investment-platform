<template>
  <div class="bg-default">
    <div class="container" id="set__form_position">
      <slide-y-up-transition mode="out-in" origin="center top">
        <router-view></router-view>
      </slide-y-up-transition>
    </div>
  </div>
</template>



<script>
import { SlideYUpTransition } from "vue2-transitions";

export default {
  name: "auth-layout",
  components: {
    SlideYUpTransition
  },
  data() {
    return {
      year: new Date().getFullYear(),
      showMenu: false
    };
  }
};
</script>
<style>
.bg-default {
  min-height: 100vh;
}

div#set__form_position {
  transform: translateY(50px);
  top: 10%;
}
</style>
