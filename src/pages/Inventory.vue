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

    <ListProducts></ListProducts>
  </q-page>
</template>

<script>
import ListProducts from "src/components/inventory/ListProducts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Inventory",
  components: { ListProducts },

  data() {
    return {
      dense: false,
      text: "",
      search: "",
    };
  },

  mounted() {
    db.firestore()
      .collection("products")
      .onSnapshot((doc) => {
        this.productsList = [];
        doc.forEach((doc) => {
          const { nome, photo_id } = doc.data();
          this.productsList.push({
            id: doc.id,
            nome: nome,
            photo_id: photo_id,
          });
        });
      });
  },

  methods: {
    onSelectFile() {
      alert("ffffff");
    },
  },
});
</script>
