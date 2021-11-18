<template>
  <div class="q-gutter-y-md column">
    <q-item
      v-for="(checkout, index) in checkouts"
      :key="index"
      clickable
      v-ripple
      filled
      style="background-color: #f2f2f2; max-width: 90%"
    >
      <q-item-section side>
        <q-icon
          v-if="checkout.is_closed"
          size="48px"
          name="img:https://cdn0.iconfinder.com/data/icons/finance-47/100/_-6-512.png"
        />

        <q-icon
          v-if="checkout.is_open"
          size="48px"
          name="img:https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo3-25-256.png"
        />
        <!-- <q-avatar rounded size="48px"> -->
        <!-- <img :src="costumer.photo_id" /> -->
        <!-- <q-badge floating color="teal">new</q-badge> -->
        <!-- </q-avatar> -->
      </q-item-section>

      <q-item-section side>
        <q-item-label>{{ checkout.uuid }}</q-item-label>
        <q-item-label caption>total: R$500.00</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-btn color="red" icon="paid" label="Saida" />
      </q-item-section>

      <q-item-section side>
        <q-btn color="green" icon="paid" label="Entrada" />
      </q-item-section>
      <q-item-section side>
        <q-btn color="green" icon="visibility" label="Visualizar" />
      </q-item-section>

      <!--
          <q-btn
            @click="() => deleteCostumer(costumer)"
            :dense="$q.screen.xs"
            no-caps
            label="Exluir"
            icon-right="close"
            color="red"
          >
          </q-btn>
          !-->
    </q-item>
  </div>
</template>

<script>
export default {
  name: "ListCheckouts",
  components: {},
  props: ["checkouts"],

  data() {
    return {
      //checkoutsList: [],
    };
  },

  methods: {
    //deleteCostumer(costumer) {
    //  db.firestore()
    //    .collection("costumers")
    //    .doc(costumer.id)
    //    .delete()
    //    .then(() => {
    //      console.log("Document successfully deleted!");
    //    })
    //    .catch((error) => {
    //      console.error("Error removing document: ", error);
    //    });
    //},
    //addCostumer() {
    //  this.$emit("addCostumer");
    //},
  },
};
</script>



