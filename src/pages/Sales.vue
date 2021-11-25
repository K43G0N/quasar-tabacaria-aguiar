<template>
  <q-page padding>
    <div class="row" v-if="!newSale">
      <div class="col-6">
        <ListSales
          :sales="salesList"
          :addButton="true"
          @trigger-new-sale="triggerNewSale"
        />
      </div>
      <q-separator class="vl" />
      <div class="col-5">
        <ListSales :sales="salesList" :addButton="false" />
      </div>
    </div>

    <div v-else>
      <NewSale />
    </div>

    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import ListSales from "src/components/sales/ListSales";
import NewSale from "src/components/sales/NewSale";
import moment from "moment";
import _ from "lodash";
import db from "src/boot/firebase";

export default defineComponent({
  name: "Sales",
  components: { ListSales, NewSale },

  data() {
    return {
      salesList: [],
      salesListFull: [],
      newSale: false,
    };
  },

  mounted() {
    db.firestore()
      .collection("sales")
      .onSnapshot((doc) => {
        this.salesList = [];
        doc.forEach((doc) => {
          const {
            costumer_id,
            costumer_img,
            costumer_name,
            data,
            total,
            info,
          } = doc.data();
          this.salesList.push({
            id: doc.id,
            costumer_id: costumer_id,
            costumer_img: costumer_img,
            costumer_name: costumer_name,
            total: total,
            data: moment(new Date(data.seconds * 1000)).format(
              "MM/DD/YYYY - HH:MM"
            ),
            info: info,
          });
          this.salesListFull = this.salesList;
        });
        //this.salesList.sort(function (a, b) {
        //  var aa = a.uuid.split("/").reverse().join(),
        //    bb = b.uuid.split("/").reverse().join();
        //  return aa > bb ? -1 : aa < bb ? 1 : 0;
        //});
      });
  },

  methods: {
    triggerNewSale() {
      this.newSale = true;
    },
  },
});
</script>

<style>
.vl {
  margin-top: -50px;
  margin-right: 60px;
  margin-left: 0px;
  border-left: 6px solid blue;
  height: 1500px;
}
</style>