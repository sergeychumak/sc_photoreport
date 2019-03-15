import axios from 'axios'

const localStorageName = "countries_current_id";

const state = {
  list: [],
  currentObject: {},
  currentId: -1
}

const getters = {
  list: state => {
    return state.list
  },
  currentObject: state => {
    return state.currentObject
  },
  currentId: state => {
    return state.currentObject.id
  }
}

const actions = {
  fill_list: ({commit, rootState}) => {
    return new Promise((resolve, reject) => {
      axios
        .get(rootState.api.server + "/" + rootState.api.country.list)
        .then(function (response) {
          var dataObject = response.data.data[0]
          if (localStorage[localStorageName]){
            var dataObject_ = response.data.data.filter((el) => {
              if (el.id === parseInt(localStorage[localStorageName])) {
                return true;
              }
            })
            if (dataObject_.length === 1)
              dataObject = dataObject_[0]
          }

          commit("set_list", response.data.data);
          commit("set_currentObject", dataObject);
          commit("set_currentId", dataObject.id);
          localStorage[localStorageName] = dataObject.id;
          resolve()
        })
        .catch(function (error) {
          reject()
        });
    })
  },
  set_current: ({commit, state}, idBusiness = 0) => {
    if (idBusiness !== 0) {
      var currentObject = state.list.filter((el) => {
        if (el.id === idBusiness) {
          return true;
        }
      })
      commit("set_currentObject", currentObject[0]);
      commit("set_currentId", currentObject[0].id);
      localStorage[localStorageName] = currentObject[0].id;
    }
  }
}

const mutations = {
  "set_list": (state, list) => {
    state.list = list
  },
  "set_currentObject": (state, currentObject) => {
    state.currentObject = Object.assign({}, currentObject)
  },
  "set_currentId": (state, id) => {
    state.currentId = id
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
