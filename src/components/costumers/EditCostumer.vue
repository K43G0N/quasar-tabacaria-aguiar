<template>
  <div>
    <p class="text-h6 text-center">ALTERAR CLIENTE</p>
    <div class="row">
      <div class="col-12 text-center">
      <img
        v-show="!cameraStart && !cameraFinish"
        id="avatar-img"
        :src="photo_id"
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
  </div>

  <div class="q-pa-md" style="max-width: 400px;margin: 0 auto;">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Nome do cliente *"
        hint="Nome completo"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'digite algum nome']"
      />
			<q-input
        filled
        v-model="nick"
        label="Apelido"
        hint="apelido"
        lazy-rules
      />
			
      <q-toggle v-model="use_nick" label="usar o aplido do kara?" />

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
import { defineComponent } from "vue"
import db from "src/boot/firebase"
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
    name: "EditCostumer",
    components: {},
    props: {editCostumerInfo:Object},

    setup() {},

    data(props) {
      return {
        enableCamera: false,
        cameraStart: false,
        cameraFinish: false,
        imageCapture: null,
        track: null,
        name: props.editCostumerInfo['name'],
        nick: props.editCostumerInfo['nick'],
        use_nick: props.editCostumerInfo['use_nick'],
        photo_id: props.editCostumerInfo['photo_id'],
        costumer_id: props.editCostumerInfo['id']
      };
    },

    mounted() {
      if (navigator.mediaDevices.getUserMedia) {
        this.enableCamera = true
      }
    },

    methods: {
      onReset(){},

      upload(result) {
        var t = this
        let ref = db.storage().ref().child(this.photo_id)
        ref.putString(result, "data_url").then(function (snapshot) {
          snapshot.ref.getDownloadURL().then((url) => {
            t.photo_id = url
          })
        })
      },
        
      onSubmit(){
        db.firestore().collection("costumers").doc(this.costumer_id).update({
      	  name: this.name,
          nick: this.nick,
          photo_id: this.photo_id,
          use_nick: this.use_nick
        }).then(() => {
          this.$router.go('/clientes')
        }).catch((error) => {
      	  alert("erro interno")
        })
		  } ,

      useCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
          this.cameraStart = true;
          this.$refs.videoplay.srcObject = mediaStream;
          this.track = mediaStream.getVideoTracks()[0];
          this.imageCapture = new ImageCapture(this.track)
        })
      },

      takePhoto() {
        this.imageCapture.takePhoto()
        .then((blob) => {
					this.photo_id = uuidv4()
          createImageBitmap(blob)
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            this.$refs.imgTakePhoto.src = reader.result
            this.cameraFinish = true
            this.upload(reader.result)
          }
        })
        .catch((error) => console.log('takePhoto_error'))
      },

      sair(){
        this.$router.go('/clientes')
      },
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