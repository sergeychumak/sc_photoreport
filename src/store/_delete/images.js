import axios from 'axios'

const state = {
  list: [],
  remade_list: {},
  loading: false
}

const getters = {
  list: state => {return state.list},
  loading: state => {return state.loading},
  remade_list: state => { return state.remade_list }
}

const actions = {
  get_list_based_on_facet: ({rootGetters, rootState, commit}) => {

    return new Promise((resolve) => {

      function isInt(value){
        return  ( !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value)))
      }

      commit("set_loading",true)

      let tmpData = Object.assign({}, rootGetters["master/facets_current_filter"], {
        businessId: rootGetters["master/current_business"],
        countryId: rootGetters["master/current_countries"],
        date: rootGetters["master/current_date"]
      })

      let data = new FormData();
      data.append('date', tmpData.date);
      data.append('businessId', tmpData.businessId);
      data.append('countryId', tmpData.countryId);
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', -1);

      if (isInt(tmpData.line)) data.append('category0Id', tmpData.line);
      if (isInt(tmpData.category)) data.append('categoryId', tmpData.category);
      if (isInt(tmpData.region)) data.append('regionId', tmpData.region);
      if (isInt(tmpData.department)) data.append('departmentId', tmpData.department);
      if (isInt(tmpData.shop)) data.append('shopId', tmpData.shop);

      let options = {
        method: 'POST',
        url: rootState.api.server + "/" + rootState.api.photo.list,
        headers: {'Content-Type': 'multipart/form-data;'},
        data
      };
      axios(options)
        .then(res => {
          commit("fill_list",res.data.data)
          commit("create_remade_list",res.data.data)
          commit("set_loading",false)
          resolve()
        });
    })
  },
  clear_list: ({commit}) => {
    commit('clear_list', [])
  }
}

const mutations = {
  "fill_list": (state, list) => {
    if (list.length > 0)
      state.list = list.reverse()
  },
  "clear_list": (state) => {
    state.list = []
    state.remade_list = new Object()
  },
  "create_remade_list": (state, list) => {
    let obj = {}
    list.map((el)=>{
      if (!el.categoryName0)
        el.categoryName0 = "!"
      if (!el.categoryName)
        el.categoryName = "!"
      if (!obj[el.categoryName0]){
        obj[el.categoryName0] = {}
      }
      if (!obj[el.categoryName0][el.categoryName]){
        obj[el.categoryName0][el.categoryName] = []
      }
      obj[el.categoryName0][el.categoryName].push(el)
    })
    state.remade_list = obj
  },
  "set_loading": (state, flag) => {
    state.loading = flag
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
