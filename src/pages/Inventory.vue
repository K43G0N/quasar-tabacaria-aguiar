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
    <InventoryBucket
      v-if="bucket.length > 0"
      :bucket="bucket"
      @reset-bucket-to-product="resetBucketToProduct"
    />
    <ListProducts
      :productsList="productsList"
      @add-to-bucket="addToBucket"
    ></ListProducts>
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
      productsList: [],
      productsListFull: [],
      search: "",
      tempBucket: new Set(),
      bucket: [],
    };
  },

  mounted() {
    db.firestore()
      .collection("products")
      .onSnapshot((doc) => {
        this.productsList = [];
        doc.forEach((doc) => {
          const { name, img, price } = doc.data();
          this.productsList.push({
            id: doc.id,
            name: name,
            img: img,
            price: price,
          });
          this.productsListFull = this.productsList;
        });
      });
  },

  methods: {
    searchProduct() {
      db.firestore()
        .collection("products")
        //.where('name', 'array-contains', 'fffffff')
        //.where("name", "==", this.search)
        .get()
        .then((querySnapshot) => {
          this.productsList = [];
          querySnapshot.forEach((doc) => {
            const { name, price, img } = doc.data();
            if (name.includes(this.search)) {
              this.productsList.push({
                id: doc.id,
                name: name,
                price: price,
                img: img,
              });
            }
          });
          if (this.productsList.length == 0) {
            this.productsList = this.productsListFull;
          }
        })
        .catch((error) => {
          this.productsList = this.productsListFull;
        });
    },

    addToBucket(product) {
      if (this.tempBucket.has(product) == false) {
        product["units"] = 1;
      } else {
        product["units"] += 1;
      }
      this.tempBucket.add(product);
      this.bucket = Array.from(this.tempBucket);
    },

    resetBucketToProduct(product) {
      if (this.tempBucket.has(product) == true) {
        this.tempBucket.delete(product);
        this.bucket = Array.from(this.tempBucket);
      }
    },
  },
});
</script>
