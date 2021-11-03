<template>
  <q-page padding>
    <ListCostumers v-if="!addUserShow" @add-costumer="addCostumer"/>
    <AddUser v-if="addUserShow"/>
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import AddUser from "src/components/costumers/AddUser"
import ListCostumers from "src/components/costumers/ListCostumers"


export default {
  name: "Costumers",
  components: {ListCostumers,AddUser},

  data() {
    return {
      costumersList: [],
      addUserShow: false,
    };
  },

  mounted() {
    //Events.$on('x', state => {
    //  alert('event x')
    //})
  },

  methods: {

    addCostumer() {
      this.addUserShow = true
    },

  },

}
</script>
