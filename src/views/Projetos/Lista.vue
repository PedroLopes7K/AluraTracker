<template>
  <section>
    <RouterLink to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo Projeto</span>
    </RouterLink>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>
            ID
          </th>
          <th>Nome</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>

          <td>
            <RouterLink :to="
            `/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </RouterLink>

            <button class="button ml-2 is-danger" @click="deletar(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from "@/store"
import RouterLink from 'vue-router';

export default defineComponent({
  name: 'Lista',
  data() {
    return {
      nomeProjeto: '',
    }
  },

  methods: {
    deletar(id: string) {
      this.store.commit('EXCLUIR_PROJETO', id)
    }
  }
  ,
  setup() {
    const store = useStore()
    return {
      store,
      projetos: computed(() => store.state.projetos)
    }
  }

});
</script>


