import axios from 'axios'

const state = {
  cookieName: "photoreport_countries",
  list: []
}

const getters = {
  list: state => {return state.list},
  cookieName: state => {return state.cookieName},
  currentId:  state => {
    return  window.$cookies.get(state.cookieName)
  }
}

const actions = {
  FILL_LIST: ({commit, rootState}) => {
    return new Promise((resolve, reject) => {
      axios
        .get(rootState.api.server + "/" + rootState.api.countries.list)
        .then(function (response) {
          commit("FILL_LIST_", response.data.data);
          resolve()
        })
        .catch(function (error) {
          reject()
        });
    })
  }
}

const mutations = {
  "FILL_LIST_": (state, list) => {
    state.list = list
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
