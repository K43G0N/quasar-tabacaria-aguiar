<template>
  <div class="row">
    <div class="col-6">
      <ListCostumers
        v-show="showCostumers"
        @change-show-costumers="changeShowCostumers"
        @change-show-products="changeShowProducts"
      />
      <ListProducts 
        v-show="showProducts"
        @add-to-cart="addProductToCart"        
      />
    </div>
    <q-separator class="vl" />
    <div class="col-4">
      <ShoppingCart />
    </div>
  </div>
</template>

<script>
import ListCostumers from "src/components/sales/ListCostumers";
import ShoppingCart from "src/components/sales/ShoppingCart";
import ListProducts from "src/components/sales/ListProducts";

import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: "NewSale",
  components: { ListCostumers, ShoppingCart, ListProducts },
  props: [],

  data() {
    return {
      showCostumers: true,
      showProducts: false,
    };
  },

  computed:{
    ...mapGetters('carts', ['products'])
  },

  methods: {
    ...mapActions('carts',['addProduct']),

    addProductToCart(product){
      this.addProduct(product)
    },

    changeShowCostumers(value) {
      this.showCostumers = value;
    },

    changeShowProducts(value) {
      this.showProducts = value;
    },

  },
};
</script>

<style>
.vl {
  margin-top: -50px;
  margin-right: 60px;
  margin-left: 0px;
  border-left: 6px solid blue;
  height: 1500px;
}
</style>
