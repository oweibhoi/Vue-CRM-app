<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#"><strong>Book Store</strong></a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Dashboard' }"
              >Dashboard</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Books' }"
              >Books</router-link
            >
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0" @submit.prevent="logout">
          <button class="btn btn-outline-danger my-2 my-sm-0" type="submit">
            Logout
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>

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
