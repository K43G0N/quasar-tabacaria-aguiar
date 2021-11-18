<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-6">
          <q-input
            filled
            style="max-width: 50%; font-size: 25px"
            bottom-slots
            v-model="dateToSearch"
            type="date"
            :dense="dense"
            @change="parseData"
          >
            <template v-slot:before> </template>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <ListCheckouts :checkouts="checkoutsList" />
        </div>
        <div class="col-6">
          <ListCheckouts />
        </div>
      </div>
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import ListCheckouts from "src/components/checkout/ListCheckouts";
import moment from "moment";
import _ from "lodash";
import db from "src/boot/firebase";

export default {
  name: "Checkout",
  components: { ListCheckouts },

  data() {
    return {
      checkoutsList: [],
      checkoutsListFull: [],
      dateToSearch: null,
    };
  },

  mounted() {
    db.firestore()
      .collection("checkouts")
      .onSnapshot((doc) => {
        this.checkoutsList = [];
        doc.forEach((doc) => {
          const { uuid, is_open, is_closed } = doc.data();
          this.checkoutsList.push({
            id: doc.id,
            uuid: uuid,
            is_open: is_open,
            is_closed: is_closed,
          });
          this.checkoutsListFull = this.checkoutsList;
        });
        this.checkoutsList.sort(function (a, b) {
          var aa = a.uuid.split("/").reverse().join(),
            bb = b.uuid.split("/").reverse().join();
          return aa > bb ? -1 : aa < bb ? 1 : 0;
        });
      });
  },

  methods: {
    parseData() {
      var date = moment(this.dateToSearch).format("DD/MM/YYYY");
      if (moment(date, "DD/MM/YYYY", true).isValid()) {
        db.firestore()
          .collection("checkouts")
          .where("uuid", "==", date)
          .get()
          .then((querySnapshot) => {
            this.checkoutsList = [];
            querySnapshot.forEach((doc) => {
              const { uuid, is_open, is_closed } = doc.data();
              this.checkoutsList.push({
                id: doc.id,
                uuid: uuid,
                is_open: is_open,
                is_closed: is_closed,
              });
            });
            if (this.checkoutsList.length == 0){
              this.checkoutsList = this.checkoutsListFull 
            };
          })
          .catch((error) => {
            this.checkoutsList = this.checkoutsListFull;
          });
      } else {
        this.checkoutsList = this.checkoutsListFull;
      }
    },
  },
};
</script>