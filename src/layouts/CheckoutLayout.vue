<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> TABACARIA AGUIAR </q-toolbar-title>

        <q-separator dark vertical spaced />

        <q-btn color="blue" @click="pressCheckout">
          ABRIR O CAIXA DE HOJE
          <q-badge color="green" rounded floating />
        </q-btn>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <!--
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
  
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
//import EssentialLink from 'components/EssentialLink.vue'
import db from "src/boot/firebase";
import { defineComponent, ref } from "vue";
import moment from "moment";
import _ from "lodash";

export default defineComponent({
  name: "CheckoutLayout",

  components: {
    //EssentialLink
  },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      //essentialLinks: linksList,
      //leftDrawerOpen,
      //toggleLeftDrawer () {
      //  leftDrawerOpen.value = !leftDrawerOpen.value
      //}
    };
  },

  data() {
    return {
      checkoutsList: [],
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
        });
      });
  },

  computed: {
    getToday() {
      const today = new Date();
      return moment(String(today)).format("DD/MM/YYYY");
    },
  },

  methods: {
    async closeOpenCheckouts() {
      const CHECKOUTS_ITEMS = db.firestore().collection("checkouts");
      await CHECKOUTS_ITEMS.where("uuid", "!=", "01/01/2021")
        .get()
        .then((snapshots) => {
          if (snapshots.size > 0) {
            snapshots.forEach((checkoutItem) => {
              CHECKOUTS_ITEMS.doc(checkoutItem.id).update({
                is_open: false,
                is_closed: true,
              });
            });
          }
        });
    },

    checkoutExists(id) {
      const found = _.find(this.checkoutsList, ["uuid", id]);
      if (found) return true;
      else return false;
    },

    createCheckout(id, is_open, is_closed) {
      db.firestore()
        .collection("checkouts")
        .doc()
        .set({
          uuid: id,
          is_open: is_open,
          is_closed: is_closed,
        })
        .then(() => {})
        .catch((error) => {});
    },

    checkCheckoutState(id) {
      const found_is_open = _.find(this.checkoutsList, ["is_open", true]);
      if (found_is_open) {
        if (found_is_open.uuid == id) {
          return 1;
        } else {
          return 0;
        }
      }
    },

    closeCheckout(id) {
      const doc = _.find(this.checkoutsList, ["uuid", id]);
      db.firestore()
        .collection("checkouts")
        .doc(doc.id)
        .update({ is_open: false, is_closed: true });
    },

    openCheckout(id) {
      const doc = _.find(this.checkoutsList, ["uuid", id]);
      db.firestore()
        .collection("checkouts")
        .doc(doc.id)
        .update({ is_open: true, is_closed: false });
    },

    async pressCheckout() {
      const checkoutId = this.getToday;
      if (this.checkoutExists(checkoutId)) {
        if (this.checkCheckoutState(checkoutId) == 1) {
          this.closeCheckout(checkoutId);
        } else {
          this.openCheckout(checkoutId);
        }
      } else {
        await this.closeOpenCheckouts();
        this.createCheckout(checkoutId, true, false);
      }
    },
  },
});
</script>