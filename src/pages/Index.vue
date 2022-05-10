<template>
  <div class="q-pa-md row items-start q-gutter-md">
    
    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">CLIENTES</div>
        <div class="text-subtitle2">22 cadastrados</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat to="/clientes">ABRIR</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">PRODUTOS</div>
        <div class="text-subtitle2">220 cadastrados</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat to="/produtos">ABRIR</q-btn>
      </q-card-actions>
    </q-card>


    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">VENDAS</div>
        <div class="text-subtitle2">22 hoje</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat to="/vendas">ABRIR</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">CAIXA</div>
        <div class="text-subtitle2">aberto</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat to="/caixa">ABRIR</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">ESTOQUE</div>
        <div class="text-subtitle2">2000 disponivies</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat to="/estoque">ABRIR</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">RELATORIOS</div>
        <div class="text-subtitle2">2000 disponivies</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat to="/estoque">ABRIR</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">DELIVERY</div>
        <div class="text-subtitle2">5 entregadores</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat to="/delivery">ABRIR</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">PAGAMENTO</div>
        <div class="text-subtitle2">em dia</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat to="/pay">ABRIR</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">CONFIG</div>
        <div class="text-subtitle2">temas</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat to="/setup">ABRIR</q-btn>
      </q-card-actions>
    </q-card>
    
  </div>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex'
})
</script>
