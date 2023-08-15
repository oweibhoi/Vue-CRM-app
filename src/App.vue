<script scoped>
import Navbar from "./components/Navbar.vue";
import { isAuthenticated } from "./services/authService";
export default {
  components: {
    Navbar,
  },
  computed: {
    isAuthenticated() {
      return isAuthenticated();
    },
  },
};
</script>

<template>
  <Navbar v-if="isAuthenticated" />
  <router-view></router-view>
</template>

<style scoped></style>
