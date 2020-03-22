<template>
  <div style="max-width:1024px; margin:auto;">
    <h1>Product List</h1>
    <v-container class="my-1">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="product in products" :key="product.id">
          <Products :product="product" />
        </v-flex>
      </v-layout>
    </v-container>
    <v-pagination v-model="pagination.page" :length="pagination.total_pages" @input="pageChange"></v-pagination>
    <VmDetailModal></VmDetailModal>
  </div>
</template>

<script>
import axios from "axios";
import Products from "./Products";
import VmDetailModal from "./ProductDetail";
import Router from "../router";

export default {
  name: "ProductListPage",
  components: { Products, VmDetailModal },
  data() {
    return {
      products: [],
      pagination: {
        page: 1,
        total_pages: 0,
        total: 0,
        per_page: 2
      }
    };
  },
  methods: {
    pageChange(page) {
      this.pagination.page = page;
      this.getProducts();
    },
    getProducts() {
      axios
        .get(`${this.$store.state.apiUrl}/products/paginate`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
            "Access-Control-Allow-Origin": "*"
          },
          params: {
            page: this.pagination.page
          }
        })
        .then(response => {
          let resData = response.data;
          let productsData = resData.data;
          productsData.map(product => {
            product.picture =
              "https://picsum.photos/id/" + product.id + "/200/300";
          });
          this.products = productsData;
          this.pagination.total_pages = resData.last_page;
          this.pagination.per_page = resData.per_page;
          this.pagination.total = resData.total;
          // this.products = "https://picsum.photos/id/1/200/300";
        })
        .catch(e => {
          alert("Error!");
        });
    }
  },
  created() {
    if (!this.$store.getters.getAccessToken) {
      Router.push({ name: "Login" });
    } else this.getProducts();
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>
