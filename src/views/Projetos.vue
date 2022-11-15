<template>
  <div class="projetos">
    <h1 class="title">Projetos</h1>
    <!-- router view e nescessario para renderizar os componentes das rotas filhas, assim como no arquivo main.ts -->
    <RouterView></RouterView>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'Projetos'
})


</script>

<style  scoped>
.projetos {
  padding: 1.30rem;
}
</style>