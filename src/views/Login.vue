<template>
  <form @submit.prevent="loginSubmit">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { login } from "../services/authService";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async loginSubmit() {
      // Perform login validation here
      const result = await login(this.email, this.password);
      if (result) {
        const urlQuery = this.$route.query;
        location.href = urlQuery.redirect ? urlQuery.redirect : '/';
      } else {
        // Failed login
        alert("Failed Login!!!");
      }
    },
  },
};
</script>
