<template>
  <div class="q-gutter-y-md column">
    <q-item
      v-for="(sale, index) in sales"
      :key="index"
      clickable
      v-ripple
      filled
      style="background-color: #f2f2f2; max-width: 90%"
    >
      <q-item-section side>
        <q-icon
          size="48px"
          name="img:https://cdn0.iconfinder.com/data/icons/finance-47/100/_-6-512.png"
        />
      </q-item-section>

      <q-item-section side>
        <q-item-label>{{ sale['name'] }}</q-item-label>
        <q-item-label caption>total: R${{ sale['total'] }}</q-item-label>
        <q-item-label caption>data: {{ sale['data'] }}</q-item-label>
      </q-item-section>

      <q-item-section>
        <q-btn color="green" icon="visibility" label="Visualizar" />
      </q-item-section>
    </q-item>

    <q-page-sticky v-if="addButton" position="bottom-left" :offset="[610, 20]">
      <q-btn @click="() => triggerNewSale()" fab icon="add" color="blue" />
    </q-page-sticky>

  </div>
</template>

<script>
export default {
  name: "ListSales",
  components: {},
  props: ["sales","addButton"],

  data() {
    return {};
  },

  methods: {

    triggerNewSale(){
      this.$emit("triggerNewSale")
    }

  },
};
</script>



