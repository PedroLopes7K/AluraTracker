<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeProjeto" class="label">Nome do Projeto:</label>
        <input type="text" class="input" v-model="nomeProjeto" id="nomeProjeto">
      </div>

      <div class="field">

        <button class="button" type="submit">Salvar</button>

      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from "@/store"
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
  name: 'Formulario',
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(projeto => projeto.id == this.id)

      this.nomeProjeto = projeto?.nome || ''
    }
  },
  data() {
    return {
      nomeProjeto: '',
    }
  },

  methods: {
    salvar() {

      if (this.id) {
        this.store.commit('ALTERA_PROJETO', {
          id: this.id,
          nome: this.nomeProjeto
        })

      } else {
        // const projeto: IProjeto = {
        //   nome: this.nomeProjeto,
        //   id: new Date().toISOString()
        // }

        // this.projetos.push(projeto)
        this.store.commit('ADICIONA_PROJETO', this.nomeProjeto)
        this.store.commit('INSERIR_NOTIFICACAO', {
          id: new Date().getTime(),
          titulo: "Criação",
          texto: "Projeto Inserido com sucesso!",
          tipo: TipoNotificacao.SUCESSO
        })


      }
      this.nomeProjeto = ''
      // $router para acessar as rotas fica disponivel em qualquer componente
      this.$router.push('/projetos')
    }
  },

  setup() {
    const store = useStore()
    return {
      store,
    }
  }

});
</script>


<style scoped>
form {
  margin-bottom: 10px;
}
</style>