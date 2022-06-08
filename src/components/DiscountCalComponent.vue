<template>
  <div class="justify-content-around">
    <div class="col-md-5 float-start">
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
                  <button
                    @click.prevent="addToCart(book)"
                    class="btn btn-danger"
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="col-md-5 float-end">
      <!-- Display goes here -->
      <h1>Cart</h1>
      <div class="row">
        <div class="col-md-10">
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cart in carts" :key="cart._id">
                <td>{{ cart.name }}</td>
                <td>{{ cart.price }}</td>
                <td>{{ cart.quantity }}</td>
                <td>
                  <!-- <router-link
                    :to="{ name: 'edit', params: { id: cart._id } }"
                    class="btn btn-success"
                  >
                    Edit
                  </router-link> -->
                  <button @click.prevent="add(cart)" class="btn btn-primary">
                    +
                  </button>
                  <button @click.prevent="sub(cart)" class="btn btn-primary">
                    -
                  </button>
                  <button
                    @click.prevent="deletebookincart(cart._id)"
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                ยอดรวม :
                {{
                  price
                }}
              </tr>
              <tr>
                ส่วนลด :
                {{
                  discount
                }}
              </tr>
              <tr>
                ยอดรวมสุทธิ :
                {{
                  total
                }}
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
      carts: [],
      price: 0,
      discount: 0,
      total: 0,
    };
  },
  created() {
    this.getBookData();
    this.getCartData();
  },
  methods: {
    getBookData() {
      let apiURL = "http://localhost:4000/api";
      axios
        .get(apiURL)
        .then((res) => {
          this.books = res.data;
          console.log("get book success");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCartData() {
      let apiURL = "http://localhost:4000/cart";
      axios
        .get(apiURL)
        .then((res) => {
          this.carts = res.data;
          console.log("get cart success");
          this.calculate(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletebookincart(id) {
      let apiURL = `http://localhost:4000/cart/deleteincart/${id}`;
      let indexOfArrayItem = this.carts.findIndex((i) => i._id === id);
      if (window.confirm("Do you really want to delete?")) {
        axios
          .delete(apiURL)
          .then(() => {
            this.$router.go(0);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    addToCart(data) {
      console.log(data);
      let apiURL = "http://localhost:4000/cart/addtocart";
      axios
        .post(apiURL, {
          bookId: data.bookId,
          name: data.name,
          price: data.price,
          quantity: 1,
        })
        .then(() => {
          this.$router.go(0);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    add(data) {
      let apiURL = `http://localhost:4000/cart/add/${data._id}`;
      axios
        .put(apiURL, data)
        .then((res) => {
          console.log(res);
          this.$router.go(0);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sub(data) {
      let apiURL = `http://localhost:4000/cart/sub/${data._id}`;
      axios
        .put(apiURL, data)
        .then((res) => {
          console.log(res);
          this.$router.go(0);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    calculate(data) {
      let arrQty = [];
      // cal price
      for (let i = 0; i < Object.keys(data).length; i++) {
        this.price += data[i].quantity * data[i].price;
      }

      // get qty to arr
      for (let i = 0; i < Object.keys(data).length; i++) {
        arrQty.push(data[i].quantity);
      }

      // cal discount
      if (Object.keys(data).length < 2) {
        this.discount = 0;
      } else {
        if (Object.keys(data).length == 2 && data[0].name != data[1].name) {
          // discount 10% per book
          var min = Math.min.apply(null, arrQty);
          this.discount = 100 * 0.1 * 2 * min;
        } else if (
          Object.keys(data).length == 3 &&
          (data[0].name != data[1].name) != data[2].name
        ) {
          // discount 20% per book
          var min = Math.min.apply(null, arrQty);
          this.discount = 100 * 0.2 * 3 * min;
        } else if (
          Object.keys(data).length == 4 &&
          ((data[0].name != data[1].name) != data[2].name) != data[3].name
        ) {
          // discount 30% per book
          var min = Math.min.apply(null, arrQty);
          this.discount = 100 * 0.3 * 4 * min;
        } else if (
          Object.keys(data).length == 5 &&
          (((data[0].name != data[1].name) != data[2].name) != data[3].name) !=
            data[4].name
        ) {
          // discount 40% per book
          var min = Math.min.apply(null, arrQty);
          this.discount = 100 * 0.4 * 5 * min;
        } else if (
          Object.keys(data).length == 6 &&
          ((((data[0].name != data[1].name) != data[2].name) != data[3].name) !=
            data[4].name) !=
            data[5].name
        ) {
          // discount 50% per book
          var min = Math.min.apply(null, arrQty);
          this.discount = 100 * 0.5 * 6 * min;
        } else if (
          Object.keys(data).length == 7 &&
          (((((data[0].name != data[1].name) != data[2].name) !=
            data[3].name) !=
            data[4].name) !=
            data[5].name) !=
            data[6].name
        ) {
          // discount 60% per book
          var min = Math.min.apply(null, arrQty);
          this.discount = 100 * 0.6 * 7 * min;
        }
      }

      // cal total
      this.total = this.price - this.discount;
    },
  },
};
</script>
