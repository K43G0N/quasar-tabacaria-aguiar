<template>
  <div>
    <q-item v-for="(product, index) in bucket" :key="index" clickable v-ripple>
      <q-item-section side>
        <q-avatar rounded size="48px">
          <img :src="product.img" />
          <!-- <q-badge floating color="teal">new</q-badge> -->
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ product.name }}</q-item-label>
        <q-item-label caption>{{ product.units }} Unidades</q-item-label>
      </q-item-section>

      <q-item-section side>
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            @click="registerInInventory(product)"
            color="green"
            icon="fact_check"
            label="Registrar Entrada"
          />
        </div>
      </q-item-section>
    </q-item>
    <q-separator color="blue" inset />
  </div>
</template>

<script>
import db from "src/boot/firebase";

export default {
  name: "InventoryBucket",
  components: {},
  props: ["bucket"],

  data() {
    return {};
  },

  mounted() {},

  methods: {
    registerInInventory(product) {
      db.firestore()
        .collection("inventory")
        .doc()
        .set({
          product_id: product.id,
          units: product.units,
        })
        .then(() => {
            this.$emit("resetBucketToProduct", product)
        })
        .catch((error) => {});
    },
  },
};
</script>



