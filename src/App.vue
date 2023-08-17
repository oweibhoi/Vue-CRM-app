<script scoped>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import { isAuthenticated } from "./services/authService";
export default {
  components: {
    Navbar,
    Sidebar,
  },
  computed: {
    isAuthenticated() {
      return isAuthenticated();
    },
  },
};
</script>

<template>
  <Navbar v-if="isAuthenticated"/>
  <div class="flex h-screen">
    <div class="flex-none bg-slate-100">
      <Sidebar v-if="isAuthenticated" />
    </div>
    <div class="flex-initial w-11/12 p-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
