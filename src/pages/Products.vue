<template>
  <q-page padding>
    <ListProducts v-if="!addProductShow" @add-product="addProduct" />
    <AddProduct v-if="addProductShow" />
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import AddProduct from "src/components/products/AddProduct"
import ListProducts from "src/components/products/ListProducts"
import { defineComponent } from "vue"

export default defineComponent({
  name: "Products",
  components: { ListProducts, AddProduct },

  data() {
    return {
      productsList: [],
      addProductShow: false,
    };
  },

  mounted() {

  },

  methods: {

    addProduct() {
      this.addProductShow = true
    },

  },

})
</script>
