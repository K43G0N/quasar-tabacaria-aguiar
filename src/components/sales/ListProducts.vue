<template>
  <q-page padding>
    <q-item
      v-for="(product, index) in products"
      :key="index"
      clickable
      v-ripple
    >
      <q-item-section side>
        <q-avatar rounded size="48px"> </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ product.name }}</q-item-label>
        <q-item-label caption>2 new messages</q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            @click="addToCart(product)"
            color="green"
            icon-right="add_circle_outline"
            label="Adicionar"
          />
          <q-btn
            @click="removeFromCart(product)"
            color="orange"
            icon="remove_circle_outline"
            label="Remover"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";

export default {
  name: "ListProducts",
  props: [],
  components: {},

  data() {
    return {
      products: [],
    };
  },

  setup() {},

  mounted() {
    db.firestore()
      .collection("products")
      .onSnapshot((doc) => {
        this.products = [];
        doc.forEach((doc) => {
          const { name,img,price } = doc.data();
          this.products.push({
            id: doc.id,
            name: name,
            img: img,
            price: price
          });
        });
      });
  },

  methods: {
    addToCart(product) {
      this.$emit("addToCart", product);
    },
  },
};
</script>
