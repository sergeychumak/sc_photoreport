import axios from "axios";

const state = {

  current_language: null,
  current_business: null,
  current_countries: null,

  list_language: [
    { code: 'ru', label: "Русский"},
    { code: 'en', label: "English"},
    { code: 'zh', label: "中文"}
  ],
  list_business: [],
  list_countries: []

}

const getters = {
  current_language: state => { return state.current_language },
  current_business: state => {
    return state.current_business
  },
  current_countries: state => {
    return state.current_countries
  },
  list_language: state => { return state.list_language },
  list_business: state => { return state.list_business },
  list_countries: state => { return state.list_countries },

  current_business_text: state => {
    let obj = state.list_business.filter(el=>{
      return el.id === state.current_business
    })
    if ( obj.length > 0 ){
      return obj[0].name
    }else{
      return ""
    }
  }

}

const actions = {
  set_current_language: ({commit}, code) => { commit("set_current_language", code) },
  set_current_business: ({commit}, code) => {

    // console.log(123)
    commit("set_current_business", code) },
  set_current_countries: ({commit}, code) => { commit("set_current_countries", code)},
  fill_list_business: ({dispatch, commit, rootGetters}) => {
    dispatch('api/send_get_request', {
      url: "business.list"
    }, {root: true})
      .then(res => {
        //console.log( res.data)
        var resA =res.data.filter(el=>{
          return el.name === "OSTIN"
        })
        commit("fill_list_business", resA)

        if (resA.length > 0){
          commit("set_current_business", resA[0].id)
        }

        // if (rootState.saveData2jsonServer){
        //   axios.post("http://localhost:3000/business.list", res.data)
        // }

      })
  },
  fill_list_countries: ({dispatch, commit}) => {
    dispatch('api/send_get_request', {
      url: "countries.list"
    }, {root: true})
      .then(res => {

        console.log(res)
        var resA =res.data.filter(el=>{
          return el.name === "RF"
        })
        
        commit("fill_list_countries", resA)
        if (resA.length > 0){
          commit("set_current_countries", resA[0].id)
        }

        // if (rootState.saveData2jsonServer){
        //   axios.post("http://localhost:3000/countries.list", res.data)
        // }



      })
  }
}

const mutations = {
  set_current_language:  (state, code) => { state.current_language = code },
  set_current_business:  (state, code) => { state.current_business = code },
  set_current_countries:  (state, list) => { state.current_countries = list },
  fill_list_business:  (state, list) => { state.list_business = list },
  fill_list_countries:  (state, list) => { state.list_countries = list }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
