<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">CLIENTES</div>
        <div class="text-subtitle2">103</div>
      </q-card-section>

      <q-separator />

      <q-card-actions vertical>
        <q-btn flat to="/clientes">Abrir</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">PRODUTOS</div>
        <div class="text-subtitle2">403</div>
      </q-card-section>

      <q-separator />

      <q-card-actions vertical>
        <q-btn flat to="/produtos">Abrir</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">VENDAS</div>
        <div class="text-subtitle2">R$809</div>
      </q-card-section>
      <q-separator />
      <q-card-actions vertical>
        <q-btn flat to="/produtos">Abrir</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">CAIXA</div>
        <div class="text-subtitle2"></div>
      </q-card-section>
      <q-separator />
      <q-card-actions vertical>
        <q-btn flat to="/produtos">Abrir</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">ESTOQUE</div>
        <div class="text-subtitle2"></div>
      </q-card-section>
      <q-separator />
      <q-card-actions vertical>
        <q-btn flat to="/estoque">Abrir</q-btn>
      </q-card-actions>
    </q-card>
    
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">RELATORIO</div>
        <div class="text-subtitle2"></div>
      </q-card-section>
      <q-separator />
      <q-card-actions vertical>
        <q-btn flat to="/produtos">Abrir</q-btn>
      </q-card-actions>
    </q-card>


  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex'
})
</script>
