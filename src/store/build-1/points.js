import axios from "axios";

const state = {}

const getters = {}

const actions = {

  create_point: ({dispatch}, inData) => {
    return new Promise((resolve) => {
      dispatch('api/send_post_request', {
        url: "point.create",
        data: inData
      }, {root: true} )
        .then( res => {
          resolve(res.data)
        })
    })
  },

  get_list_problem: ({dispatch}, inData) => {
    return new Promise((resolve) => {
      dispatch('api/send_get_request', {
        url: "point.items.list",
        data: inData
      }, {root: true} )
        .then( res => {
          resolve(res.data)
        })
    })
  },



  get_list_problem_point: ({dispatch}, inData ) => {
    return new Promise((resolve) => {
      dispatch('api/send_get_request', {
        url: "point.list",
        data: inData
      }, {root: true} )
        .then( res => {
          resolve(res.data)
        })
    })
  },
  //
  // /** Получаем группу */
  // GET_LIST_PROBLEM_LOCATION: ({dispatch}) => {
  //   return new Promise((resolve) => {
  //     dispatch('api/send_post_request', {
  //       url: "point.location.list"
  //     }, {root: true} )
  //     .then( res => {
  //       resolve(res.data)
  //     })
  //   })
  // },

  




  /** Обновляесмя  */
  update_problem_point: ({dispatch}, inData) => {
    return new Promise((resolve) => {
      dispatch('api/send_post_request', {
        url: "point.update",
        data: inData
      }, {root: true} )
        .then( res => {
          resolve(res.data)
        })
    })
  },

  /** Удаляем точку  */
  delete_problem_point: ({dispatch}, inData) => {
    console.log(inData)
    return new Promise((resolve) => {
      dispatch('api/send_post_request', {
        url: "point.delete",
        data: inData
      }, {root: true} )
        .then( res => {
          resolve(res.data)
        })
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
