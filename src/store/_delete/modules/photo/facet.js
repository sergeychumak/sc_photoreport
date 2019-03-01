import axios from 'axios'

const state = {}

const getters = {}

const actions = {
  get_list: ({rootGetters, rootState, commit}) => {
    return new Promise((resolve) => {
      let data = new FormData();
      data.append('businessId', rootGetters["business/currentId"]);
      data.append('countryId', rootGetters["countries/currentId"]);
      data.append('shopId', rootGetters["shopPhoto/currentId"]);
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', 25);
      let options = {
        method: 'POST',
        url: rootState.api.server + "/" + rootState.api.photo.facets,
        headers: {'Content-Type': 'multipart/form-data;'},
        data
      };
      axios(options)
        .then(response => {
          resolve(response.data.data)
        });
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
