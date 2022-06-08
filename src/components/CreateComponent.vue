<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <!-- Content goes here -->
      <h1>Create Book</h1>
      <form @submit.prevent="handleSubmitForm">
        <div class="mb-3 mt-3">
          <label for="name">Id</label>
          <input
            type="text"
            class="form-control"
            v-model="book.bookId"
            required
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            v-model="book.name"
            required
          />
        </div>
        <div class="mb-3">
          <label for="price">Price</label>
          <input
            type="price"
            class="form-control"
            v-model="book.price"
            required
          />
        </div>

        <button class="btn btn-success btn-block">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      book: {
        bookId: "",
        name: "",
        price: "",
      },
    };
  },
  methods: {
    handleSubmitForm() {
      let apiURL = "http://localhost:4000/api/create-book";
      axios
        .post(apiURL, this.book)
        .then(() => {
          this.$router.push("/view");
          this.book = {
            bookId: "",
            name: "",
            price: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
