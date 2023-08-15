<script>
export default {
  data() {
    return {
      id: "",
      title: "",
      author: "",
      authors: [],
      description: "",
      qty: "",
      category: "",
      availability: false,
      titleError: "",
      authorsError: "",
      qtyError: "",
      categoryError: "",
      categoryList: [
        { id: 1, category: "Technology" },
        { id: 2, category: "Lifestyle" },
        { id: 3, category: "Science" },
        { id: 4, category: "Other" },
      ],
    };
  },
  methods: {
    addAuthor(e, t = null) {
      if (t === "focusout") {
        if (this.author) {
          if (!this.authors.includes(this.author)) {
            this.authors.push(this.author);
          }
          this.author = "";
        }
      } else {
        if (e.key === "," && this.author) {
          if (!this.authors.includes(this.author)) {
            this.authors.push(this.author);
          }
          this.author = "";
        }
      }
    },
    removeAuthor(author) {
      this.authors = this.authors.filter((e) => e !== author);
    },
    saveBook() {
      this.titleError = this.title == "" ? "Please enter title" : "";
      this.authorsError = this.authors.length == 0 ? "Please add authors" : "";
      this.qtyError = this.qty == "" ? "Please enter qty" : "";
      this.categoryError = this.category == "" ? "Please select category" : "";
    },
  },
};
</script>
<template>
  <div
    class="modal fade"
    id="bookModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Book Details</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form id="book-form" @submit.prevent="saveBook">
          <div class="modal-body">
            <input type="hidden" class="book" v-model="id" />
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control book"
                id="title"
                v-model="title"
                placeholder="Enter Title"
              />
              <small class="text-danger" v-if="titleError">{{
                titleError
              }}</small>
            </div>
            <div class="form-group">
              <label for="author">Author/s</label>
              <input
                type="text"
                class="form-control book"
                id="author"
                v-model="author"
                placeholder="Enter Author/s"
                @keypress.alt="addAuthor($event)"
                @focusout="addAuthor($event, 'focusout')"
              />
              <small class="text-danger" v-if="authorsError">{{
                authorsError
              }}</small>
            </div>
            <div
              class="badge badge-primary mr-1"
              v-for="author in authors"
              :key="author"
              @click="removeAuthor(author)"
            >
              {{ author }}
              <a href="javascript:;" class="text-white ml-4"
                ><span><small>x</small></span></a
              >
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                class="form-control book"
                id="description"
                v-model="description"
                placeholder="Enter Description"
                rows="5"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="qty">Quantity</label>
              <input
                type="number"
                class="form-control book"
                id="qty"
                v-model="qty"
                placeholder="Enter Qty"
              />
              <small class="text-danger" v-if="qtyError">{{ qtyError }}</small>
            </div>
            <div class="form-group">
              <label for="category">Category</label>
              <select
                v-model="category"
                id="category"
                class="form-control book"
              >
                <option value="" selected disabled>Select Category</option>
                <option
                  v-for="cat in categoryList"
                  :key="cat.id"
                  value="{{ cat.category }}"
                >
                  {{ cat.category }}
                </option>
              </select>
              <small class="text-danger" v-if="categoryError">{{
                categoryError
              }}</small>
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input book"
                v-model="availability"
                id="availability"
              />
              <label class="form-check-label" for="availability"
                >Available</label
              >
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
