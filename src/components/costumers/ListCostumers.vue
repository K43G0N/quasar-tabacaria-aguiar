<template>
    <q-page padding>
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
          
          <q-item-label v-if="costumer.use_nick == true">{{ $filters.upper(costumer.nick) }}</q-item-label>
          <q-item-label v-if="costumer.use_nick == false">{{ $filters.upper(costumer.name) }}</q-item-label>
          
          <q-item-label v-if="costumer.use_nick == true" caption>NOME: {{$filters.upper(costumer.name)}}</q-item-label>
          <q-item-label v-if="costumer.use_nick == false" caption>APELIDO: {{$filters.upper(costumer.nick)}}</q-item-label>
        
        </q-item-section>

        <q-item-section side>
          <div class="q-pa-md q-gutter-sm">
            <q-btn color="primary" 
                   icon="edit" 
                   label="Alterar"
                   @click="() => editCostumer(costumer)" 
            />
            <q-btn
              @click="() => checkDialog(costumer)"
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

      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="report_gmailerrorred" color="primary" text-color="white" />
            <span class="q-ml-sm">Você está prestes a excluir esse cliente</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn @click="() => deleteCostumer()" flat label="Excluir Permanentemente" color="negative" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-page>

</template>

<script>
import db from "src/boot/firebase"

export default {
  name: "ListCostumers",
  
  data() {
    return {
      costumersList: [],
      confirm: false,
      selectedCostumer:{}
    };
  },

  mounted() {
    db.firestore()
      .collection("costumers")
      .onSnapshot((doc) => {
        this.costumersList = [];
        doc.forEach((doc) => {
          const { name, photo_id,nick,use_nick } = doc.data();
          this.costumersList.push({
            id: doc.id,
            nick: nick,
            name: name,
            use_nick: use_nick,
            photo_id: photo_id,
          });
        });
      });
  },

  methods: {

    checkDialog(costumer){
      this.confirm = true
      this.selectedCostumer = costumer
    },

    deleteCostumer() {
      db.firestore().collection("costumers").doc(this.selectedCostumer.id).delete()
      .then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    },

    addCostumer() {
      this.$emit('addCostumer');
    },

    editCostumer(costumer){
      this.$emit('editCostumer',costumer);
    }
  },
  
};
</script>
