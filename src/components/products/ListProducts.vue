<template>
  <q-page padding v-if="addProductShow"> </q-page>
  <q-page padding v-if="!addProductShow">
    <q-item
      v-for="(product, index) in productsList"
      :key="index"
      clickable
      v-ripple
    >
      <q-item-section side>
        <q-avatar rounded size="48px">
          <!-- <img :src="costumer.photo_id" /> -->
          <!-- <q-badge floating color="teal">new</q-badge> -->
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ product.nome }}</q-item-label>
        <q-item-label caption>2 new messages</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn
          @click="() => deleteProduct(product)"
          :dense="$q.screen.xs"
          no-caps
          label="Exluir"
          icon-right="close"
          color="red"
        >
          <!--
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-color v-model="colorFace" />
        </q-popup-proxy>
        -->
        </q-btn>
      </q-item-section>
    </q-item>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="addProduct" fab icon="add" color="blue" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
import AddProduct from "src/components/products/AddProduct";

export default {
  name: "ListProducts",
  components: { AddProduct },

  data() {
    return {
      productsList: [],
      addProductShow: false,
    };
  },

  mounted() {
    db.firestore()
      .collection("products")
      .onSnapshot((doc) => {
        this.productsList = []
        doc.forEach((doc) => {
          const { nome } = doc.data()
          this.productsList.push({
            id: doc.id,
            nome: nome,
          })
        })
      })
  },

  methods: {
    
    deleteProduct(product) {
    //   db.firestore()
    //     .collection("costumers")
    //     .doc(costumer.id)
    //     .delete()
    //     .then(() => {
    //       console.log("Document successfully deleted!");
    //     })
    //     .catch((error) => {
    //       console.error("Error removing document: ", error);
    //     })
    },

    addProduct() {
      this.$emit('addProduct')
    },

  },

}
</script>



