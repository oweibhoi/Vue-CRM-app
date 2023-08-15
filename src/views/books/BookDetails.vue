<template>
  <h1>Book Details</h1>
  <table class="table" v-if="book">
    <tr>
      <td>Title</td>
      <td>{{ book.title }}</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>{{ book.description }}</td>
    </tr>
    <tr>
      <td>Author/s</td>
      <td>{{ book.author }}</td>
    </tr>
    <tr>
      <td>Qty</td>
      <td>{{ book.qty }}</td>
    </tr>
    <tr>
      <td>Category</td>
      <td>{{ book.category }}</td>
    </tr>
    <tr>
      <td>Availability</td>
      <td>{{ book.availability ? "Yes" : "No" }}</td>
    </tr>
  </table>
  <button class="btn mt-2" @click="back">Back</button>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      book: null,
    };
  },
  methods: {
    getBookDetails(id) {
      fetch("http://localhost:3000/books/"+ id)
        .then((res) => res.json())
        .then((data) => (this.book = data))
        .catch((err) => console.log(err.message));
    },
    back() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.getBookDetails(this.id);
  },
};
</script>

<style></style>
