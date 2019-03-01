import axios from 'axios'

const state = {}

const getters = {}

const actions = {






  LIST_ERROR: () => {
    return new Promise((resolve) => {
      let res = [
        { id: 'a', label: 'Foo'},
        { id: 'b', label: 'Foo1'}
      ]
      resolve(res)
    })
  },
  LIST_POINT: () => {
    return new Promise((resolve) => {
      let res = [
        {
          id: "c1",
          x:"100",
          y:"100",
          r:"50",
          idError:"a",
          text: "как дела как дела как дела как дела как делпа как депел как"
        },
        {
          id: "c2",
          x:"300",
          y:"300",
          r:"50",
          idError:"b",
          text: "Тест"
        }
      ]
      resolve(res)
    })
  },

}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
