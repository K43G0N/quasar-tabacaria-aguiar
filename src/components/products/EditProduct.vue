<template>
  <div>
    <p class="text-h6 text-center">ALTERAR PRODUTO</p>
    <div class="q-pa-md" style="max-width: 400px; margin: 0 auto">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <div class="row">
          <div class="col-12 text-center q-gutter-sm">
            <q-btn
              @Click="
                uploadShow = true;
                cameraShow = false;
              "
              color="primary"
              text-color="white"
              glossy
              unelevated
              icon="upload"
              label="ENVIAR FOTO"
            />
            <q-btn
              @Click="
                cameraShow = true;
                uploadShow = false;
              "
              color="primary"
              text-color="white"
              glossy
              unelevated
              icon="camera_enhance"
              label="TIRAR FOTO"
            />
            <Camera v-if="cameraShow" />
            <FileUpload v-if="uploadShow" @set-file="setFile" />
          </div>
        </div>
        <q-input
          filled
          v-model="name"
          label="Nome do produto *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'digite o nome do produto',
          ]"
        />

        <q-input
          v-model.number="price"
          mask="#.##"
          fill-mask="0"
          reverse-fill-mask
          filled
          style="max-width: 200px"
          label="Preço"
          :rules="[(val) => val > 0 || 'digite o preço']"
        />

        <div>
          <q-btn label="ATUALIZAR" type="submit" color="primary" />
          <q-btn
            @click="sair"
            label="Sair"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import db from "src/boot/firebase";
import Camera from "src/components/products/Camera.vue";
import FileUpload from "src/components/products/FileUpload.vue";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: "AddProduct",
  components: { Camera, FileUpload },
  props: {editProductInfo:Object},

    data(props) {
        return {
            name: props.editProductInfo['nome'],
            price: props.editProductInfo['price'],
            file: "",
            cameraShow: false,
            uploadShow: false,
            enableCamera: false,
            cameraStart: false,
            cameraFinish: false,
            imageCapture: null,
            track: null,
            photoID: null,
        };
    },

    mounted() {},

    methods: {
        onSubmit() {
            let a = db;
            let b = db;
            var imgName = uuidv4();
            const storageRef = a.storage().ref(imgName).put(this.file);
            storageRef.on(`state_changed`, (snapshot) => {
                b.firestore().collection("products").doc().set({
                    name: this.name,
                    price: this.price,
                    img: imgName,
                }).then(() => {
                    this.$router.go("/products");
                }).catch((error) => {
                    console.error("onsubmit_error");
                });
            });
        },

        setFile(file) {
            this.file = file;
        },

        useCamera() {},

        takePhoto() {},

        sair() {
            this.$router.go("/clientes");
        },
    },
});
</script>

<style scoped>
#avatar-img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 160px;
}

#camera-avatar {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 160px;
  height: 160px;
}
</style>