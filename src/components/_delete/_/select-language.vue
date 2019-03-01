<template>
  <v-menu transition="slide-x-transition" left>
    <v-btn slot="activator" icon flat color="teal"><span class="caption">{{current}}</span></v-btn>
    <v-list dense>
      <v-list-tile v-for="item in list" :key="item.code" @click="click(item.code)">
        <v-list-tile-title
          :class="{'primary--text' : item.code === current}"
        >( {{item.code.toUpperCase()}} ) {{ item.label }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'select-language',
  methods: {
    click: function(lang){
      this.$router.replace({ name: "main", params: { lang: lang } })
      setTimeout(()=>{location.reload()},200);
    }
  },
  computed: {
    ...mapGetters('lang' , {
      list: 'list',
      current: 'current'
    })
  }
}
</script>
