import Vue from 'vue';

const defaultBackgroundColor = '#86bbff'

// Initialize the annoying-background directive.
export const TableBooleanType = {
  bind(el, binding, vnode) {
    console.log(909)
  }
}

// You can also make it available globally.
Vue.directive('table-boolean-type', TableBooleanType)
