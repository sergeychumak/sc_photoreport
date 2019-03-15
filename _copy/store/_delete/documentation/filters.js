import axios from 'axios'

const state = {}

const getters = {}

const actions = {
  get_list_: ({rootGetters, rootState}, inData) => {
    return new Promise((resolve, reject) => {
      let data = new FormData();
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', -1);
      let options = {
        method: 'POST',
        url: rootState.api.server + "/" + rootState.api.documentation.filters[inData.type],
        headers: {'Content-Type': 'multipart/form-data;'},
        data
      };
      axios(options).then(response => {resolve(response.data.data)});
    })
  }
}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
