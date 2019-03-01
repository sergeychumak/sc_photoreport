import axios from "axios";

const state = {
  auth: false,
  error: false,
  user_info: {}
}
const getters = {
  is_auth: state => { return state.auth },
  user_info: state => { return state.user_info },
  error: state => { return state.error }
}

const actions = {
  enter: ({dispatch, commit, rootState}, inData) => {
    return new Promise((resolve) => {
      dispatch('api/post_request', {
        url: "auth.enter",
        data: {
          email: inData.email,
          password: inData.password,
          "savePassword-inputEl": "on"
        }
      }, {root: true})
        .then(function (result) {

          if (result.success) {
            commit('ENTER', true)
            commit('ERROR', false)
            dispatch('get_user_info', {
              email: inData.email
            })
          } else {
            commit('ENTER', false)
            commit('ERROR', true)
            commit('SET_USER_INFO', {})
          }
          resolve()
        });
    })
  },
  exit: ({commit, rootState}) => {
    return new Promise((resolve) => {
      axios
        .get(rootState.api.server + "/" + rootState.api.auth.exit)
        .then(function () {
          commit('ENTER', false)
          commit('ERROR', false)
          commit('SET_USER_INFO', {})
          resolve()
        })
    })
  },
  get_user_info: ({dispatch, commit},inData) => {
    return new Promise((resolve) => {
      dispatch("api/post_request", {
        url: "users.list",
        data: {page: 1, start: 0, limit: -1}
      }, {root: true} ).then((res) => {
        let userObj = res.data.filter(el=>{
          return el.email === inData.email
        })
        if (userObj.length > 0){
          commit('SET_USER_INFO', userObj[0])
        }else{
          commit('SET_USER_INFO', {})
        }
        resolve()
      })
    })
  },
  registration: ({dispatch}, inData) => {
    return new Promise((resolve) => {
      dispatch('api/send_post_request', {
        url: "auth.register",
        data: inData
      }, {root: true})
        .then(function (res) {
          resolve(res)
        });
    })
  },


  checkHash: ({dispatch, rootGetters}, inData) => {
    return new Promise((resolve, reject) => {
      if (inData.hash){
        if ( inData.hash !== rootGetters['main/hash'] ){
          dispatch("exit")
          reject(rootGetters['main/hash'])
        }else{
          resolve()
        }
      }else{
        dispatch("exit")
        reject(rootGetters['main/hash'])
      }
    })
  }

}

const mutations = {
  "ENTER": (state, f) => { state.auth = f },
  "ERROR": (state, f) => { state.error = f },
  "SET_USER_INFO": (state, obj) => { state.user_info = obj }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
