<template>
  <q-page padding>
    <ListProducts v-if="!addProductShow && !editProductShow" 
                  @add-product="addProduct" 
                  @edit-product="editProduct"
    />
    <AddProduct v-if="addProductShow && !editProductShow"/>
    <EditProduct v-if="editProductShow && !addProductShow" :editProductInfo="editProductInfo"/>
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import AddProduct from "src/components/products/AddProduct"
import EditProduct from "src/components/products/EditProduct"
import ListProducts from "src/components/products/ListProducts"
import { defineComponent } from "vue"

export default defineComponent({
  name: "Products",
  components: { ListProducts, AddProduct, EditProduct },

  data() {
    return {
      productsList: [],
      addProductShow: false,
      editProductShow: false,
      editProductInfo: {}
    };
  },

  mounted() {

  },

  methods: {

    addProduct() {
      this.addProductShow = true
    },

    editProduct(product) {
      this.editProductInfo = product
      this.editProductShow = true
      this.addProductShow = false
    },

  },

})
</script>
