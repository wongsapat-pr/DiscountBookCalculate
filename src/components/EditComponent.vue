<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <!-- Update goes here -->
      <h1>Edit Data</h1>
      <form @submit.prevent="handleUpdateForm">
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

        <button class="btn btn-primary btn-block">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      book: {},
    };
  },
  created() {
    let apiURL = `http://localhost:4000/api/edit-book/${this.$route.params.id}`;
    axios.get(apiURL).then((res) => {
      this.book = res.data;
    });
  },
  methods: {
    handleUpdateForm() {
      let apiURL = `http://localhost:4000/api/update-book/${this.$route.params.id}`;
      axios
        .put(apiURL, this.book)
        .then((res) => {
          console.log(res);
          this.$router.push("/view");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
