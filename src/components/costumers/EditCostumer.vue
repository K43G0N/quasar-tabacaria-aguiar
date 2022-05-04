<template>
    <p class="text-h6 text-center">ALTERAR CLIENTE</p>
    <div class="row">
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
  </div>

  <div class="q-pa-md" style="max-width: 400px;margin: 0 auto;">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Nome do cliente *"
        hint="Nome completo"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'digite algum nome mané']"
      />
			<q-input
        filled
        v-model="nick"
        label="Apelido"
        hint="apelido"
        lazy-rules
      />
			
      <q-toggle v-model="useNick" label="usar o aplido do kara?" />

      <div>
        <q-btn label="Cadastrar" type="submit" color="primary" />
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

</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
    name: "EditCostumer",

    data() {
        return {
            useCamera:'',
            takePhoto:'',
            enableCamera: false,
            cameraStart: false,
            cameraFinish: false,
            imageCapture: null,
            track: null,
			name:'',
			nick:'',
			useNick:false,
			photoID:null
        };
    },

    mounted() {
    },

    methods: {
        onReset(){
            
        },
        
        onSubmit(){

        },

        sair(){
            this.$router.go('/clientes')
        }
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