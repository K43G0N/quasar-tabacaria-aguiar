<template>
  <q-page padding>
    <!-- <ListProducts v-if="!addProductShow" @add-product="addProduct" /> -->
    <!-- <AddProduct v-if="addProductShow" /> -->
    <!-- <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md"> -->

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-field>
        <template v-slot:prepend> </template>

        <template v-slot:control>
          <!-- <div class="self-center full-width no-outline" tabindex="0">{{text}}</div> -->
          <q-input
            v-model="search"
            debounce="500"
            filled
            :loading="true"
            placeholder="Digite o nome do produto"
            hint=""
            style="min-width: 100%; font-size: 25px"
            @input="onSelectFile"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-field>
    </q-form>
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
      dense: false,
      text: "",
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
        });
      });
  },

  methods: {

    //onSelectFile() {},

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
