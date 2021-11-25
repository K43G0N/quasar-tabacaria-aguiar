<template>
  <div>
    <q-item
      v-if="Object.keys(costumer).length > 0"
      :color="blue"
      clickable
      v-ripple
    >
      <q-item-section side>
        <q-avatar rounded size="48px">
          <img :src="costumer.photo_id" />
          <!-- <q-badge floating color="teal">new</q-badge> -->
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ costumer.nome }}</q-item-label>
        <q-item-label caption>2 new messages</q-item-label>
      </q-item-section>
    </q-item>

    <div v-if="products.length > 0">
      <q-item
        v-for="(product, index) in products"
        :key="index"
        :color="blue"
        clickable
        v-ripple
      >
        <q-item-section side>
          <q-avatar rounded size="48px">
            <img :src="product.photo_id" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ product.name }}</q-item-label>
          <q-item-label caption>2 new messages</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "ShoppingCart",
  components: {},
  props: [],

  data() {
    return {};
  },

  setup() {},

  computed: {
    ...mapGetters("carts", ["costumer","products"]),
  },

  methods: {},
};
</script>



