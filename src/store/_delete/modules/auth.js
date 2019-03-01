import axios from "axios";
import qs from 'qs';

const state = {
  auth: false
}
const getters = {
  is_auth: state => { return state.auth }
}

const actions = {
  enter: ({dispatch, commit, rootState}, inData) => {

    console.log(555)
    
    dispatch('api/post_request', {
      url: "auth.enter",
      data: {
        email: inData.email,
        password: inData.password
      }
    },{root:true})
    .then(function (result) {
      console.log(result.success);
    });

  },
  exit: ({commit, rootState}) => {
    return new Promise((resolve) => {
      axios
        .get(rootState.api.server + "/" + rootState.api.auth.exit)
        .then(function () {
          commit('CHANGE_AUTH', false)
          resolve()
        })
    })
  }
}

const mutations = {
  "CHANGE_AUTH": (state, auth_flag) => {
    state.auth = auth_flag
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
