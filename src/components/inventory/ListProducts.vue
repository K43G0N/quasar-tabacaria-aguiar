<template>
  <q-page padding>
    <q-item
      v-for="(product, index) in productsList"
      :key="index"
      clickable
      v-ripple
    >
      <q-item-section side>
        <q-avatar rounded size="48px">
          <img :src="product['img']" />
          <!-- <q-badge floating color="teal">new</q-badge> -->
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ product['nome'] }}</q-item-label>
        <q-item-label caption>0 Unidades</q-item-label>
      </q-item-section>

      <q-item-section side>
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            @click="addToBucket(product)"
            color="blue"
            icon="add_circle_outline"
            label="Adicionar"
          />
          <q-btn
            @click="removeFromBucket(product)"
            color="orange"
            icon="remove_circle_outline"
            label="Remover"
          />
        </div>
      </q-item-section>
    </q-item>

    <!--
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="() => addCostumer()" fab icon="add" color="blue" />
    </q-page-sticky>
    -->
  </q-page>
</template>

<script>
import { ref } from 'vue'
import db from "src/boot/firebase";

export default {
  name: "ListCostumers",
  components: {},
  props: ["productsList"],

  data() {
    return {
      product:[]
    };
  },

  mounted() {
  },

  methods: {

    addToBucket(product) {
      this.$emit("addToBucket",product);
    },

    removeFromBucket(product){
      this.$emit("removeFromBucket",product);
    }

    // deleteCostumer(costumer) {
    //   db.firestore()
    //     .collection("costumers")
    //     .doc(costumer.id)
    //     .delete()
    //     .then(() => {
    //       console.log("Document successfully deleted!");
    //     })
    //     .catch((error) => {
    //       console.error("Error removing document: ", error);
    //     });
    // },
  },
};
</script>



