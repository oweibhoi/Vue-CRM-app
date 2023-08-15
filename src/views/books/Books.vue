<script>
import BookFormModal from "./BookFormModal.vue";

export default {
  components: {
    BookFormModal,
  },
  data() {
    return {
      title: "My main component",
      books: [],
    };
  },
  methods: {
    // handleView(id) {
    //   const selectedBook = this.books.filter((e) => e.id == id);
    //   selectedBook.forEach((obj) => {
    //     Object.keys(obj).forEach((key) => {
    //       // $("#bookModal .book[name="+key+"]").val(obj[key]);
    //     });
    //   });

    //   $("#bookModal").modal();
    // },
    getBooks() {
      fetch("http://localhost:3000/books")
      .then(res => res.json())
      .then(data => this.books = data)
      .catch(err => console.log(err.message))
    }
  },
  mounted() {
    this.getBooks()
  }
};
</script>

<template>
  <BookFormModal> </BookFormModal>
  <h3>List of Books</h3>
  <div class="card">
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Book Name</th>
              <th scope="col">Author</th>
              <th scope="col">Year</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <th scope="row">{{ book.id }}</th>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.qty }}</td>
              <td>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Action
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                  <router-link class="dropdown-item" :to="{ name: 'BookDetails', params:{id:book.id}}">
                    View
                  </router-link>
                    <a class="dropdown-item" href="#">Edit</a>
                    <a class="dropdown-item text-danger" href="#">Delete</a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
