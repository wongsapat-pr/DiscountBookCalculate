<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <!-- Display goes here -->
      <h1>Show books</h1>
      <div class="row">
        <div class="col-md-12">
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book._id">
                <td>{{ book.name }}</td>
                <td>{{ book.price }}</td>
                <td>
                  <router-link
                    :to="{ name: 'edit', params: { id: book._id } }"
                    class="btn btn-success"
                  >
                    Edit
                  </router-link>
                  <button
                    @click.prevent="deletebook(book._id)"
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      books: [],
    };
  },
  created() {
    let apiURL = "http://localhost:4000/api";
    axios
      .get(apiURL)
      .then((res) => {
        this.books = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deletebook(id) {
      let apiURL = `http://localhost:4000/api/delete-book/${id}`;
      let indexOfArrayItem = this.books.findIndex((i) => i._id === id);
      if (window.confirm("Do you really want to delete?")) {
        axios
          .delete(apiURL)
          .then(() => {
            this.books.splice(indexOfArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
