const state = {
  list: [
    { code: 'ru', label: "Русский"},
    { code: 'en', label: "English"},
    { code: 'zh', label: "中文"}
  ],
  currentId: -1,
  current: 'ru',
  _default: 'ru',
  cookieName: 'org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'
}

const getters = {
  list: state => {return state.list},
  langDefault: state => {return state._default},
  cookieName: state => {return state.cookieName},
  current: state => {return state.current},
  currentId: state => {return state.currentId}
}

const actions = {
  set_current: ({commit}, data) => {
    return new Promise((resolve) => {
      commit("set_current", data.lang )
      resolve()
    })
  }
}

const mutations = {
  "set_current":  (state, lang) => {
    state.current = lang
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
