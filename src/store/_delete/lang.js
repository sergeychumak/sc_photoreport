const state = {
  cookieName: "photoreport_lang",
  cookieName_: "org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE",
  list: [
    { code: 'ru', label: "Русский"},
    { code: 'en', label: "English"},
    { code: 'zh', label: "中文"}
  ]
}

const getters = {
  list: state => {return state.list},
  cookieName: state => {return state.cookieName},
  cookieName_: state => {return state.cookieName_}
}

const actions = {}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
