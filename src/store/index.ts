import IProjeto from "@/interfaces/IProjeto";
import { INotificacao, TipoNotificacao } from "@/interfaces/INotificacao";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {InjectionKey} from 'vue'

interface Estado {
  // esse estado será uma lista de projetos
  projetos: IProjeto[],
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state:{
    projetos: [],
    notificacoes:  []
  },
  mutations: {
    'ADICIONA_PROJETO'(state, nomeProjeto: string){
        const projeto = {
          id: new Date().toISOString(),
          nome: nomeProjeto
        } as IProjeto
        state.projetos.push(projeto)
    },
    'ALTERA_PROJETO'(state, projeto: IProjeto){
      const index = state.projetos.findIndex(proj => proj.id == projeto.id)
      state.projetos[index] = projeto
    },
    'EXCLUIR_PROJETO'(state, id: string) {
      state.projetos=  state.projetos.filter(proj => proj.id != id)
    },

    'INSERIR_NOTIFICACAO'(state, notificacao: INotificacao ){
    console.log(notificacao)
    state.notificacoes.push(notificacao)

     setTimeout(() => {
      state.notificacoes = []
     }, 4000)
     
    }
  }
})


export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}