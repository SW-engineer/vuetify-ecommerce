<template>
  <v-card flat class="ma-2 text-xs-center card">
    <v-img :src="product.picture" aspect-ratio="0.75" class="ma-1"></v-img>
    <v-card-title primary-title>
      <div>
        <h3 class="headline title is-5">{{ product.name }}</h3>
      </div>
    </v-card-title>
    <v-card-subtitle>{{ product.description }}</v-card-subtitle>
    <v-card-actions>
      <div class="content is-clearfix flex" column>
        <p class="is-pulled-left">
          <span class="title is-5">
            <strong>${{ product.price }}</strong>
          </span>
        </p>
        <p class="is-pulled-right">
          <v-btn
            color="pink"
            class="button is-danger is-rounded detail_btn"
            @click="showDetailModal(product)"
          >Detail</v-btn>
        </p>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "products",
  props: ["product"],

  data() {
    return {
      addToCartLabel: "Add to cart",
      viewDetailsLabel: "Details",
      removeFromCartLabel: "Remove from cart",
      addToFavouriteLabel: "Add to favourite",
      removeFromFavouriteLabel: "Remove from favourite",
      selected: 1,
      quantityArray: []
    };
  },

  mounted() {
    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }

    if (this.$props.product.quantity > 1) {
      this.selected = this.$props.product.quantity;
    }
  },

  computed: {
    isUserLogged() {
      return this.$store.getters.isUserLoggedIn;
    }
  },

  methods: {
    addToCart(id) {
      let data = {
        id: id,
        status: true
      };
      this.$store.commit("addToCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    removeFromCart(id) {
      let data = {
        id: id,
        status: false
      };
      this.$store.commit("removeFromCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    saveToFavorite(id) {
      let isUserLogged = this.$store.state.userInfo.isLoggedIn;

      if (isUserLogged) {
        this.$store.commit("addToFavourite", id);
      } else {
        this.$store.commit("showLoginModal", true);
      }
    },
    removeFromFavourite(id) {
      this.$store.commit("removeFromFavourite", id);
    },
    onSelectQuantity(id) {
      let data = {
        id: id,
        quantity: this.selected
      };
      this.$store.commit("quantity", data);
    },
    showDetailModal(product) {
      let data = {
        show: true,
        product: product
      };
      console.log(this.$store.getters.isDetailModalOpen);
      this.$store.commit("showDetailModal", data);
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  &:hover {
    border: 1px solid #51bafc;
  }
}
.button,
.select {
  z-index: 2;
}
.select {
  position: absolute;
  right: 15px;
  bottom: 35px;
}
.card-content {
  padding: 0;
}
.buttons {
  margin: 0;
}
.is-half {
  text-align: center;
}
.detail_btn {
  font-weight: bold;
  font-size: 12px;
}
.v-application .title {
  font-size: 1em !important;
}
</style>
