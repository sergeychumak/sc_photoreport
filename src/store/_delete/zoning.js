import axios from 'axios'

const state = {}

const getters = {}

const actions = {
  get_list: ({rootGetters, rootState}, inData) => {
    return new Promise((resolve) => {

      let tmpData = Object.assign({
      }, inData)

      let data = new FormData();
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', 200);
      let options = {
        method: 'POST',
        url: rootState.api.server + "/" + rootState.api.zoning.list,
        headers: {'Content-Type': 'multipart/form-data;'},
        data
      };
      axios(options)
        .then(res => {
//          resolve(res.data)
          console.log(res)
        });
    })
  },
  upload: ({rootGetters, rootState}, inData) => {

    return new Promise((resolve) => {
      
      console.log(inData)
      console.log(inData.file.files[0])

      let data = new FormData();
      data.append("file", inData.file.files[0]);
      data.append("shopId", inData.shopId);

      let options = {
        method: 'POST',
        url: rootState.api.server + "/" + rootState.api.zoning.upload,
        headers: {'Content-Type': 'multipart/form-data;'},
        data
      };

      axios(options)
        .then(res => {
          resolve(res)
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
