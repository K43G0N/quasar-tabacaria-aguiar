<template>
  <q-page padding>
    <q-field>
      <template v-slot:prepend> </template>
      <template v-slot:control>
        <q-input
          v-model="search"
          debounce="500"
          filled
          :loading="false"
          placeholder="Digite o nome do produto"
          hint=""
          style="min-width: 100%; font-size: 25px"
          @update:model-value="searchProduct"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-field>
    <InventoryBucket v-if="bucket.size > 0" :bucket="Array.from(bucket)" @reset-bucket-to-product="resetBucketToProduct"/>
    <ListProducts :productsList="products" @add-to-bucket="addToBucket" @remove-from-bucket="removeFromBucket"/>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
import ListProducts from "src/components/inventory/ListProducts";
import InventoryBucket from "src/components/inventory/InventoryBucket";
import { defineComponent } from "vue";
import _ from "lodash";

export default defineComponent({
  name: "Inventory",
  components: { ListProducts, InventoryBucket },

  data() {
    return {
      products: [],
      search: "",
      bucket: new Set()
    };
  },

  mounted() {
    db.firestore()
      .collection("products")
      .onSnapshot((doc) => {
        this.products = [];
        doc.forEach((doc) => {
          const { name, img, price } = doc.data();
          let ref = db.storage().ref().child(img)
          ref.getDownloadURL().then((url) => {
            this.products.push({
              id: doc.id,
              nome: name,
              img: url,
              price: price
            });
          })
        });
      });
  },

  computed: {
  },

  methods: {
    
    searchProduct() {
      let ref = null
      let t = this
      t.products = [];
      db.firestore().collection("products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { name, price, img } = doc.data();
          if (name.includes(t.search)) {
            ref = db.storage().ref().child(img)
            ref.getDownloadURL().then((url) => {
              t.products.push({
                id: doc.id,
                nome: name,
                img: url,
                price: price
              });
            })
          }
        });
      }).catch((error) => {
        console.log(error)
      });
    },

    addToBucket(product) {
      let trigger = false
      for (let bucket of this.bucket) {
        if (product.id == bucket.id){
          trigger = true
          bucket.units += 1
          break
        }
      }
      if (trigger == false){
        this.bucket.add(product);
        product['units'] = 1;
      }
    },

    removeFromBucket(product){
      for (let bucket of this.bucket) {
        if (product.id == bucket.id){
          bucket.units -= 1;
          if (bucket.units == 0){
            this.bucket.delete(bucket);
          }
        }
      }
    },

    resetBucketToProduct(product) {
      if (this.bucket.has(product) == true) {
        this.bucket.delete(product);
      }
    },
    
  },
});
</script>
