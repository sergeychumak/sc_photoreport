import axios from 'axios'

const state = {
  list: []
}

const getters = {
  list: state => { return state.list }
}

const actions = {
  FILL_LIST: ({rootGetters, rootState, commit}, inData) => {

    return new Promise((resolve) => {

      if (!inData.regionId){
        commit("FILL_LIST_", [])
        resolve()
      }
      
      if (
        !rootGetters["business/currentId"] ||
        !rootGetters["countries/currentId"] ||
        !inData.regionId
      ){
        resolve()
        return false
      }

      let data = new FormData();
      data.append('businessId', rootGetters["business/currentId"]);
      data.append('countryId', rootGetters["countries/currentId"]);
      data.append('regionId', inData.regionId);
      data.append('query', '');
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', -1);
      data.append('sort', JSON.stringify([{"property": "name", "direction": "ASC"}]));
      data.append('filter', JSON.stringify([{"property": "alias"}]));

      let options = {
        method: 'POST',
        url: rootState.api.server + "/" + rootState.api.department.list,
        headers: {'Content-Type': 'multipart/form-data;'},
        data
      };

      axios(options)
        .then(response => {
          commit("FILL_LIST_", response.data.data)
          resolve()
        });

    })
  }
}

const mutations = {
  FILL_LIST_: (state, list) => {
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
