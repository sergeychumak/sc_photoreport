import axios from 'axios'

const state = {}

const getters = {}

const actions = {
  get_list: ({rootGetters, rootState}) => {

    return new Promise((resolve) => {

      let tmpData = Object.assign({
        current_business: rootGetters["master/current_business"],
        current_countries: rootGetters["master/current_countries"],
      })

      let data = new FormData();
      data.append('businessId', tmpData.current_business);
      data.append('countryId', tmpData.current_countries);
      data.append('query', '');
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', -1);
      data.append('sort', JSON.stringify([{"property": "name", "direction": "ASC"}]));
      data.append('filter', JSON.stringify([{"property": "alias"}]));
      let options = {
        method: 'POST',
        url: rootState.api.server + "/" + rootState.api.lines.list,
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
