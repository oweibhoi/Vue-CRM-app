<template>
  <div>
    <h1>Detail Page</h1>
    <p>Item ID: {{ id }}</p>
  </div>
</template>

<script>
export default {
  data() {
    const id = null;
    return {id};
  },
  mounted() {
    this.id = this.$route.params.id;
    document.getElementById('sbProspects').querySelector('a').classList.add('router-link-active');
    document.getElementById('sbProspects').querySelector('a').classList.add('router-link-exact-active');
  }
};
</script>
