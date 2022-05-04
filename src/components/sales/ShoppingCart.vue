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

    <q-separator color="blue" />

    <div v-if="Array.from(products).length > 0">
      <q-item
        v-for="(product, index) in Array.from(products)"
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
          <q-item-label caption>{{ product.units }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <div class="text-h4">
      Total
      <q-badge size="50px" color="green" align="middle">R${{ total }}</q-badge>
    </div>

    <q-separator color="blue" style="margin-bottom: 20px" />

    <div v-if="Array.from(products).length > 0" class="q-gutter-sm">
      <q-radio dense v-model="paymentType" val="line" label="Fiado" />
      <q-radio dense v-model="paymentType" val="rectangle" label="Dinheiro" />
      <q-radio
        dense
        v-model="paymentType"
        val="ellipse"
        label="Cartão de Débito"
      />
      <q-radio
        dense
        v-model="paymentType"
        val="polygon"
        label="Cartão de Crédito"
      />
    </div>

    <q-separator color="blue" style="margin-bottom: 20px; margin-top: 20px" />

    <div v-if="Array.from(products).length > 0" class="q-pa-md q-gutter-sm">
      <q-btn
        @click="triggerSale(costumer, Array.from(products))"
        push
        color="primary"
        label="Finalizar Venda"
      />
      <q-btn push color="white" text-color="primary" label="Cancelar" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ShoppingCart",
  components: {},
  props: [],

  data() {
    return {
      paymentType: null,
    };
  },

  setup() {},

  computed: {
    ...mapGetters("carts", ["costumer", "products", "total"]),
  },

  methods: {
    validateSale() {},
    saveSale() {},
    triggerSale(costumerValue, productsValue) {
      this.validateSale(costumerValue, productsValue);
      this.saveSale(costumerValue, productsValue);
    },
  },
};
</script>



