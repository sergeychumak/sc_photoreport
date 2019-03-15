import axios from 'axios'

const state = {}

const getters = {}

const actions = {
  get_list: ({rootGetters, rootState}, inData) => {

    return new Promise((resolve, reject) => {

      let data = new FormData();
      data.append('businessId', rootGetters["base/current_business"]);
      data.append('countryId', rootGetters["base/current_countries"]);
      data.append('langId', inData.idLang);
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', -1);

      let options = {
        method: 'POST',
        url: rootState.api.server + "/" + rootState.api.documentation.list,
        headers: {'Content-Type': 'multipart/form-data;'},
        data
      };

      axios(options)
        .then(response => {
          console.log(response.data);
          var dateObj = new Date()
          response.data.data.forEach( (el) => {
            dateObj.setTime(el.lastModified);
            var d = "0" + dateObj.getDay();
            var m = "0" + dateObj.getMonth();
            var y = dateObj.getFullYear();
            el['lastModified_good_view'] = d.substr(-2) + '.' + m.substr(-2) + '.' + y;
          })
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
