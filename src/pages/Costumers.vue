<template>
  
  <q-page padding v-if="addUserShow && !editCostumerShow">
    <AddUser/>
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-page>
    
  <q-page padding v-if="editCostumerShow && !addUserShow">
    <EditCostumer/>
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-page>

  <q-page padding v-if="!addUserShow && !editCostumerShow">
    <ListCostumers @add-costumer="addCostumer" @edit-costumer="editCostumer"/>
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-page>

</template>

<script>
import AddUser from "src/components/costumers/AddUser"
import EditCostumer from "src/components/costumers/EditCostumer"
import ListCostumers from "src/components/costumers/ListCostumers"

export default {
  name: "Costumers",
  components: {ListCostumers,AddUser,EditCostumer},

  data() {
    return {
      costumersList: [],
      addUserShow: false,
      editCostumerShow: false,
    };
  },

  mounted() {
  },

  methods: {

    addCostumer() {
      this.addUserShow = true
      this.editCostumerShow = false
    },

    editCostumer() {
      this.editCostumerShow = true
      this.addUserShow = false
    },

  },

}
</script>
