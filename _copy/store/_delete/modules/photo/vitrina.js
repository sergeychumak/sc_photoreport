import axios from 'axios'

const state = {}

const getters = {}

const actions = {
  get_list: ({rootGetters, rootState}) => {

    return new Promise((resolve) => {

      let data = new FormData();
      // data.append('shopId', rootGetters["shopPhoto/current"]);
      data.append('shopId', 888 );
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', 200);

        let options = {
          method: 'POST',
          url: rootState.api.server + "/" + rootState.api.photo.vitrina,
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
