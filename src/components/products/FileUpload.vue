<template>
  <div class="q-gutter-md" style="max-width: 380px; margin: 0 auto">
    <q-file
      outlined
      @input="setFile"
      filled
      v-model="file"
      :rules="[(val) => val.size > 0 || 'insira a foto']"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import db from "src/boot/firebase"
import { v4 as uuidv4 } from 'uuid';
//import db from "src/boot/firebase"
//import { v4 as uuidv4 } from "uuid"

export default defineComponent({
  name: "FileUpload",
  props: {},

  data() {
    return {
      file: "",
      //name: "",
      //price: 0,
      // enableCamera: false,
      // cameraStart: false,
      // cameraFinish: false,
      // imageCapture: null,
      // track: null,
      // name: "",
      // nick: "",
      // useNick: false,
      // photoID: null,
    };
  },

  mounted() {
    // if (navigator.mediaDevices.getUserMedia) {
    //   this.enableCamera = true
    // }
  },

  methods: {
    setFile(file) {
      if (file !== void 0) {
        this.$emit("setFile",file.target.files[0]);
      }
    },

    useCamera() {
      //   navigator.mediaDevices
      //     .getUserMedia({ video: true })
      //     .then((mediaStream) => {
      //       this.cameraStart = true;
      //       this.$refs.videoplay.srcObject = mediaStream;
      //       this.track = mediaStream.getVideoTracks()[0];
      //       this.imageCapture = new ImageCapture(this.track)
      //     })
    },

    takePhoto() {
      //   this.imageCapture
      //     .takePhoto()
      //     .then((blob) => {
      // 				this.photoID = uuidv4()
      //       createImageBitmap(blob)
      //       const reader = new FileReader()
      //       reader.readAsDataURL(blob)
      //       reader.onloadend = () => {
      //         this.$refs.imgTakePhoto.src = reader.result
      //         this.cameraFinish = true
      //         this.upload(reader.result)
      //       }
      //     })
      //     .catch((error) => console.log('takePhoto_error'))
    },

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

