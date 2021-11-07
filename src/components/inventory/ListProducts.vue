<template>
  <q-page padding v-if="addUserShow"></q-page>
  <q-page padding v-if="!addUserShow">
    <q-item
      v-for="(costumer, index) in costumersList"
      :key="index"
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

      <q-item-section side>
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="primary" icon="edit" label="Alterar" />
          <q-btn
            @click="() => deleteCostumer(costumer)"
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
        </div>
      </q-item-section>
    </q-item>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="() => addCostumer()" fab icon="add" color="blue" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
import AddUser from "src/components/costumers/AddUser";

export default {
  name: "ListCostumers",
  components: { AddUser },

  data() {
    return {
      costumersList: [],
      addUserShow: false,
    };
  },

  mounted() {
    
  },

  methods: {
    deleteCostumer(costumer) {
      db.firestore()
        .collection("costumers")
        .doc(costumer.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    addCostumer() {
      this.$emit("addCostumer");
    },
  },
};
</script>



