import axios from "axios";
import qs from 'qs';

const state = {

}
const getters = {}

const actions = {
  //Линейка
    ruler: ({rootState}, inData) => {
      return new Promise((resolve, reject) => {
        // var data = {"page": 1, "start": 0, "limit": -1}
        // axios.post(
        //   rootState.api.server + "/" + state.ruler,
        //   qs.stringify(data),
        //   {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        // ).then((res)=>{
        //   resolve(res.data)
        // })
        console.log(909)
        resolve()
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
