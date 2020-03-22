<template>
  <v-dialog v-model="$store.state.systemInfo.openDetailModal" persistent width="700px">
    <v-card v-if="product">
      <v-toolbar fixed flat>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeModal(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container fluid>
        <v-row align="center" justify="space-around">
          <v-col width="40%">
            <v-img :src="product.picture" aspect-ratio="1" width="100%"></v-img>
          </v-col>
          <v-col width="60%">
            <v-card-title class="headline">{{product.name}}</v-card-title>
            <v-card-subtitle>${{product.price}}</v-card-subtitle>
            <v-card-text class="pb-0 pink--text">
              Description
              <v-divider></v-divider>
            </v-card-text>
            <v-card-text>{{product.description}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="pink" class="button is-rounded white--text" @click="closeModal(false)">
                Add To Cart
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
  <!-- <div :class="[ openModal ? 'is-active' : '', 'modal' ]">
    <div class="modal-background"></div>
    <div v-if="product" class="modal-card">
      <header class="modal-card-head detail-header">
        <button class="delete is-pulled-right" aria-label="close" @click="closeModal(false)"></button>
      </header>
      <section class="modal-card-body card">
        <div class="card-pic-wrap">
          <img v-bind:src="product.picture" />
        </div>
        <div class="card-content">
          <p class="title is-3">{{product.name}}</p>
          <p class="title is-5">${{product.price}}</p>
          <div class="title is-6 desc">Description</div>
          <p class="title is-6">{{product.description}}</p>
          <button class="button is-danger is-rounded cart_btn">
            <span class="cart-text">ADD TO CART</span>
            <i class="fa fa-shopping-cart icon"></i>
          </button>
        </div>
      </section>
    </div>
  </div>-->
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      modalTitle: "Product Detail",
      removeLabel: "Remove from cart",
      cartEmptyLabel: "Your cart is empty",
      closeLabel: "Close",
      isCheckoutSection: false
      // temp: this.$store.systemInfo.product
    };
  },

  computed: {
    product() {
      return this.$store.getters.selectedProduct;
    },
    products() {
      return this.$store.getters.productsAdded;
    },
    openModal() {
      if (this.$store.getters.isDetailModalOpen) {
        return true;
      } else {
        return false;
      }
    },
    buyLabel() {
      let totalProducts = this.products.length,
        productsAdded = this.$store.getters.productsAdded,
        pricesArray = [],
        productLabel = "",
        finalPrice = "",
        quantity = 1;

      productsAdded.forEach(product => {
        if (product.quantity >= 1) {
          quantity = product.quantity;
        }

        pricesArray.push(product.price * quantity); // get the price of every product added and multiply quantity
      });

      finalPrice = pricesArray.reduce((a, b) => a + b, 0); // sum the prices

      if (totalProducts > 1) {
        // set plural or singular
        productLabel = "products";
      } else {
        productLabel = "product";
      }
      return `Buy ${totalProducts} ${productLabel} at ${finalPrice}€`;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    }
  },

  methods: {
    closeModal(reloadPage) {
      this.$store.commit("showDetailModal", false);

      if (reloadPage) {
        window.location.reload();
      }
    },
    removeFromCart(id) {
      let data = {
        id: id,
        status: false
      };
      this.$store.commit("removeFromCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    onNextBtn() {
      if (this.isUserLoggedIn) {
        this.isCheckoutSection = true;
      } else {
        this.$store.commit("showDetailModal", false);
        this.$store.commit("showLoginModal", true);
      }
    },
    onPrevBtn() {
      this.isCheckoutSection = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-card {
  width: 700px;
}
.detail-header {
  display: unset !important;
}
.card {
  display: flex;
  background: #fff;
  max-width: 700px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.card-pic-wrap {
  width: 300px;
  flex: 0 0 auto;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
}
.card-content {
  padding: 3em 4em 2em;
  .desc {
    color: #ff3860;
  }
}
.icon {
  margin-left: 5px;
  display: inline-flex;
}

.cart-text {
  font-size: 0.8rem;
  font-weight: bold;
}

.v-dialog > .v-card > .v-toolbar {
  position: sticky;
  top: 0;
  z-index: 999;
}

@media screen and (max-width: 600px) {
  .modal-card {
    width: 100%;
  }
  .modal-card-body {
    padding: unset;
  }
  .card {
    display: unset;
  }
  .card-pic-wrap {
    width: unset;
  }
  .card-content {
    padding: 2rem;
  }
}
</style>