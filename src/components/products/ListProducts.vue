<template>
  <div>
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
            <img :src="product.img" />
            <!-- <q-badge floating color="teal">new</q-badge> -->
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ product.nome }}</q-item-label>
          <q-item-label caption>preço: {{product.price}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            @click="() => checkDialog(product)"
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

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="report_gmailerrorred" color="primary" text-color="white" />
          <span class="q-ml-sm">Você está prestes a excluir esse produto</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn @click="() => deleteProduct()" flat label="Excluir Permanentemente" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import { ref } from 'vue'
import db from "src/boot/firebase";
import AddProduct from "src/components/products/AddProduct";

export default {
  name: "ListProducts",
  components: { AddProduct },

  setup () {
    //return {
    //  confirm: ref(false)
    //}
  },

  data() {
    return {
      productsList: [],
      addProductShow: false,
      confirm: false,
      selectedProduct:{}
    };
  },

  mounted() {
    var t = this
    db.firestore()
      .collection("products")
      .onSnapshot((doc) => {
        this.productsList = [];
        doc.forEach((doc) => {
          const { name,img,price } = doc.data();
          let ref = db.storage().ref().child(img)
          ref.getDownloadURL().then((url) => {
            t.productsList.push({
              id: doc.id,
              nome: name,
              img: url,
              price: price
            });
          })
        });
    });
  },

  methods: {

    checkDialog(product){
      this.confirm = true
      this.selectedProduct = product
    },

    deleteProduct() {
      let product = this.selectedProduct
      db.firestore()
        .collection("products")
        .doc(product.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    addProduct() {
      this.$emit("addProduct");
    },
  },
};
</script>
