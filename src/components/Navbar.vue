<template>
  <va-navbar color="primary">
    <template #left>
      <va-navbar-item class="logo"> LOGO </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item class="p-3 px-3 rounded-md">Profile</va-navbar-item>
      <va-navbar-item class="bg-cyan-950 p-3 px-3 rounded-md"><a href="javascript:void(0);" @click.prevent="logout">Logout</a></va-navbar-item>
    </template>
  </va-navbar>
</template>

<style scoped>
.logo {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>

<script scoped>
import { logout } from "../services/authService";
export default {
  name: "Navbar",
  methods: {
    async logout() {
      await logout();
      location.reload();
    },
  },
};
</script>

<style scoped>
.navbar-nav a.router-link-exact-active {
  color: rgb(12, 183, 9);
}
</style>
