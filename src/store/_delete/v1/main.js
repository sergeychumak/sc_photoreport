const state = {

    hash: "v.1.0.14",

  /****************************************
    SNACKBAR */
    snackbar: false,
    color: 'cyan darken-2',
    timeout: 0,
    text: 'Загрузка фотографий ds fds fasd fdas'
}

const getters = {
  /****************************************
    SNACKBAR */
    snackbar: state => { return state.snackbar },
    text: state => { return state.text },
    color: state => { return state.color },
    timeout: state => { return state.timeout },

    hash: state => { return state.hash }
}

const actions = {
  /****************************************
    SNACKBAR */
    snackbar_close: ({commit}) => {
      commit('snackbar_show', false)
    },
    snackbar_show: ({commit}) => {
      commit('snackbar_show', true)
    }
}

const mutations = {
  /****************************************
    SNACKBAR */
    snackbar_show:  (state, flag) => { state.snackbar = flag }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
