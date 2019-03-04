import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang/lang'
import VueCookies from 'vue-cookies'
import * as directives from 'vuetify/es5/directives'

import {
  Vuetify,
  VApp,
  VGrid,
  VToolbar,
  VIcon,
  VBtn,
  VMenu,
  VList,
  VDialog,
  VCard,
  VDataTable,
  VSelect,
  VExpansionPanel,
  VAutocomplete,
  VImg,
  VProgressLinear,
  VProgressCircular,
  VTextField,
  VCheckbox,
  VSubheader,
  VNavigationDrawer,
  VAlert,
  VTextarea,
  VSnackbar,
  VBadge,
  VAvatar,
  VTooltip
} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VApp,
    VGrid,
    VToolbar,
    VIcon,
    VBtn,
    VMenu,
    VList,
    VDialog,
    VCard,
    VDataTable,
    VSelect,
    VExpansionPanel,
    VAutocomplete,
    VImg,
    VProgressLinear,
    VProgressCircular,
    VTextField,
    VCheckbox,
    VSubheader,
    VNavigationDrawer,
    VAlert,
    VTextarea,
    VSnackbar,
    VBadge,
    VAvatar,
    VTooltip
  },
  directives
})

Vue.use(VueCookies)

Vue.config.productionTip = false

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {App},
  template: '<App/>'
})
