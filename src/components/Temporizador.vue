<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />
    <button class="button" @click="iniciar" :disabled="cronometroRodando">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>Play</span>
    </button>

    <button class="button" @click="pausar" :disabled="!cronometroRodando">
      <span class="icon">
        <i class="fas fa-pause"></i>
      </span>
      <span>{{valorPause}}</span>
    </button>
    <button class="button" @click="finalizar" :disabled="!cronometroRodando">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>Stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from './Cronometro.vue'

export default defineComponent({
  name: "Temporizador",
  emits: ['aoTemporizadorFinalizado'],
  components: {
    Cronometro
  },
  data () {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
      pause: false
    }
  },
  computed: {
    valorPause() : string {
      return this.pause ? 'Retomar' : 'Pause'
    }
  },
  methods: {
    iniciar () {
      // começar a contagem
      // 1 seg = 1000 ms
      this.cronometroRodando = true
      this.cronometro = setInterval(() => {

        if(this.pause == false) {
          this.tempoEmSegundos += 1        
        }
      }, 1000)
    },
    finalizar () {
      this.cronometroRodando = false
      clearInterval(this.cronometro)
      this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
      this.tempoEmSegundos = 0
      this.pause = false

    },
    pausar () {
      this.pause = !this.pause
    }
  }
});
</script>