import axios from 'axios'

const state = {}

const getters = {}

const actions = {
  LIST_CATEGORY: ({rootGetters, rootState}) => {

    return new Promise((resolve) => {

      let data = new FormData();
      data.append('businessId', rootGetters["business/currentId"]);
      data.append('countryId', rootGetters["countries/currentId"]);
      data.append('query', '');
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', -1);
      data.append('sort', JSON.stringify([{"property": "name", "direction": "ASC"}]));
      data.append('filter', JSON.stringify([{"property": "alias"}]));


      let options = {
        method: 'POST',
        url: rootState.api.server + "/" + rootState.api.photocategory.list_category,
        headers: {'Content-Type': 'multipart/form-data;'},
        data
      };

      axios(options)
        .then(res => {
          resolve(res.data)
        });

    })
  },
  LIST_SUBCATEGORY: ({rootGetters, rootState}, inData) => {

    return new Promise((resolve) => {

      let data = new FormData();
      data.append('category0Id', inData.idCategory);
      data.append('businessId', rootGetters["business/currentId"]);
      data.append('countryId', rootGetters["countries/currentId"]);
      data.append('query', '');
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', -1);
      data.append('sort', JSON.stringify([{"property": "name", "direction": "ASC"}]));
      data.append('filter', JSON.stringify([{"property": "alias"}]));


      let options = {
        method: 'POST',
        url: rootState.api.server + "/" + rootState.api.photocategory.list_subcategory,
        headers: {'Content-Type': 'multipart/form-data;'},
        data
      };

      axios(options)
        .then(res => {
          resolve(res.data)
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
