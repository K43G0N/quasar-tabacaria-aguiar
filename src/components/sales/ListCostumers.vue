<template>
  <div>
    <q-field>
      <template v-slot:control>
        <q-input
          v-model="searchCostumer"
          debounce="500"
          filled
          :loading="false"
          placeholder="Digite o nome do cliente"
          hint=""
          style="min-width: 100%; font-size: 25px"
          @update:model-value="searchCostumer"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-field>
    <q-item
      v-for="(costumer, index) in costumersList"
      :key="index"
      clickable
      v-ripple
      @click="updateCostumer(costumer);
              changeShowCostumers(false)
              changeShowProducts(true)"
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
  </div>
</template>

<script>
import db from "src/boot/firebase";
import { mapActions } from 'vuex';

export default {
  name: "ListCostumers",
  props: [],
  components: {},

  data() {
    return {
      costumersList: [],
      searchCostumer: "",
    };
  },

  setup() {
  },

  mounted() {
    db.firestore()
      .collection("costumers")
      .onSnapshot((doc) => {
        this.costumersList = [];
        doc.forEach((doc) => {
          const { nome, photo_id } = doc.data();
          this.costumersList.push({
            id: doc.id,
            nome: nome,
            photo_id: photo_id,
          });
        });
      });
  },

  //computed:{
  //  costumers(){
  //    return this.$store.getters['costumers/costumers']
  //  }
  //},

  methods: {
    ...mapActions('carts',['updateCostumer']),

    changeShowCostumers(value){
      this.$emit('changeShowCostumers',value)
    },
    
    changeShowProducts(value){
      this.$emit('changeShowProducts',value)
    }
  },
};
</script>



