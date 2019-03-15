import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import api from './api'

Vue.use(Vuex)

import points from './build-1/points'
import master from './build-2/master'

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      key: 'PHOTOREPORT',
      paths: [
        'master'
      ]
    })
  ],
  modules: {
    api,
    points,
    master
  },
  state: {},
  getters: {},
  actions: {},
  mutations: {}
})

export default store
