import axios from 'axios'

const state = {
  list: [],
  loading: false,
  current_date: null,
  current_filter: {}
}

const getters = {
  list: state => {return state.list},
  loading: state => {return state.loading},
  current_date: state => {return state.current_date},
  current_filter: state => {return state.current_filter}
}

const actions = {
  get_list: ({rootGetters, rootState, commit}, inData) => {
    return new Promise((resolve) => {

      commit("set_loading",true)

      function isInt(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
      }

      let data = new FormData();
      data.append('businessId', rootGetters["master/current_business"]);
      data.append('countryId', rootGetters["master/current_countries"]);
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', 25);
      if (isInt(inData.line)) data.append('category0Id', inData.line);
      if (isInt(inData.category)) data.append('categoryId', inData.category);
      if (isInt(inData.region)) data.append('regionId', inData.region);
      if (isInt(inData.department)) data.append('departmentId', inData.department);
      if (isInt(inData.shop)) data.append('shopId', inData.shop);

      let options = {
        method: 'POST',
        url: rootState.api.server + "/" + rootState.api.facets.list,
        headers: {'Content-Type': 'multipart/form-data;'},
        data
      };

      axios(options)
        .then(res => {
          commit("fill_list",res.data.data)
          commit("set_current_filter",inData)
          commit("set_loading",false)
          resolve()
        });

    })
  },
  set_current_date: ({commit}, date) => {
    return new Promise((resolve) => {
      commit("set_current_date", date)
      resolve()
    })
  },
  set_current_filter: ({commit}, inData) => {
    return new Promise((resolve) => {
      commit("set_current_filter", inData)
      resolve()
    })
  }
}

const mutations = {
  "fill_list": (state, list) => {
    state.list = list.reverse()
  },
  "set_loading": (state, flag) => {
    state.loading = flag
  },
  "set_current_date": (state, date) => {
    state.current_date = date
  },
  "set_current_filter": (state, data) => {
    state.current_filter = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
