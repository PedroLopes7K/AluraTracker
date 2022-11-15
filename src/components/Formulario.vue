<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.id"> {{ projeto.nome }}</option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador :id-projeto="idProjeto" @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import Temporizador from './Temporizador.vue'
import { TipoNotificacao } from '@/interfaces/INotificacao';


export default defineComponent({
  name: "Formulário",
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador
  },
  data() {
    return {
      descricao: '',
      idProjeto: ''
    }
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {

      // ESSA LOGICA TEM QUE IR PARA O TEMPORIZADOR NO PLAY
      // if (!this.idProjeto) {
      //   this.store.commit('INSERIR_NOTIFICACAO', {
      //     id: new Date().getTime(),
      //     titulo: "Falha",
      //     texto: "Tarefa sem um projeto vinculado!",
      //     tipo: TipoNotificacao.FALHA
      //   })
      //   return
      // }
      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto: this.projetos.find(projeto => projeto.id == this.idProjeto)
      })
      this.descricao = ''
      this.store.commit('INSERIR_NOTIFICACAO', {
        id: new Date().getTime(),
        titulo: "Sucesso",
        texto: "Tarefa concluida com sucesso!",
        tipo: TipoNotificacao.SUCESSO
      })
    }
  },

  setup() {
    const store = useStore(key)
    // tudo retornado no setup fica disponivel para o component
    return {
      store,
      projetos: computed(() => store.state.projetos)
    }
  }
});
</script>
<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>