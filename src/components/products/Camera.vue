<template>
  <div class="col-12 text-center">
    <img
      v-show="!cameraStart && !cameraFinish"
      id="avatar-img"
      src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
    />
    <img v-show="cameraStart" src="" ref="imgTakePhoto" width="250" />
    <video
      v-show="cameraStart && !cameraFinish"
      id="camera-avatar"
      autoplay
      width="250"
      ref="videoplay"
    ></video>
  </div>
  <div class="col-12 text-center">
    <q-btn
      v-if="!cameraStart"
      label="Acessar Camera"
      color="primary"
      icon="camera"
      :disable="!enableCamera"
      @click="useCamera"
    />
    <q-btn
      v-else
      label="Tirar Foto"
      color="primary"
      icon="camera"
      @click="takePhoto"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue"
//import db from "src/boot/firebase"
//import { v4 as uuidv4 } from "uuid"

export default defineComponent({
  name: "Camera",
  props: {},

  data() {
    return {
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

  methods: {},

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

  upload(result) {
    //   var t = this
    //   let ref = db.storage().ref().child(this.photoID)
    //   ref.putString(result, "data_url").then(function (snapshot) {
    //     snapshot.ref.getDownloadURL().then((url) => {
    //       t.photoID = url
    //     })
    //   })
  },

  sair() {
    this.$router.go("/clientes")
  },

})
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