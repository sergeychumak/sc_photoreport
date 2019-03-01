import axios from 'axios'

const state = {
  list: [],
  currentId: -1,
  currentText: ""
}

const getters = {
  list: state => {
    return state.list
  },
  currentId: state => {
    return state.currentId
  },
  currentText: state => {
    return state.currentText
  }
}

const actions = {
  get_list: ({rootGetters, rootState, commit}) => {

    return new Promise((resolve) => {

      let data = new FormData();
      data.append('businessId', rootGetters["business/currentId"]);
      data.append('countryId', rootGetters["countries/currentId"]);
      data.append('regionId', rootGetters["regionPhoto/currentId"]);
      data.append('query', '');
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', -1);
      data.append('sort', JSON.stringify([{"property": "name", "direction": "ASC"}]));
      data.append('filter', JSON.stringify([{"property": "alias"}]));

      let options = {
        method: 'POST',
        url: rootState.api.server + "/" + rootState.api.photo.department,
        headers: {'Content-Type': 'multipart/form-data;'},
        data
      };

      axios(options)
        .then(response => {
          commit("fill_list", response.data.data)
          resolve()
        });

    })
  },
  set_current: ({commit, state}, id) => {
    var tmp = state.list.filter((el) => {
      if (el.id === id)
        return true;
    })
    if (tmp.length > 0) {
      commit("set_current_id", id)
      commit("set_current_text", tmp[0].name)
    } else {
      commit("set_current_id", -1)
      commit("set_current_text", "")
    }
  }
}

const mutations = {
  fill_list: (state, list) => {
    state.list = list
  },
  set_current_id: (state, id) => {
    state.currentId = id
  },
  set_current_text: (state, text) => {
    state.currentText = text
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
