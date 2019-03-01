<template>
  <span class="body-2 pb-0">
    <v-menu transition="slide-x-transition" class="pa-0">
      <span slot="activator">{{CURRENT_LANGUAGE.toUpperCase()}}</span>
      <v-list dense >
        <v-list-tile
          v-for="item in LIST_LANGUAGE"
          :key="item.code"
          @click="_set_current_language(item.code)"
          :class="{'blue--text' : item.code === CURRENT_LANGUAGE}"
        >
          <v-list-tile-title>{{item.label.toUpperCase()}} </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    /
    <v-menu transition="slide-x-transition">
      <span slot="activator">{{current_business_text.toUpperCase()}}</span>
      <v-list dense>
        <v-list-tile
          v-for="item in LIST_BUSINESS"
          :key="item.id"
          @click="_set_current_business(item.id)"
          :class="{'blue--text' : item.id === CURRENT_BUSINESS}"
        >
          <v-list-tile-title>{{item.alias.toUpperCase()}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    /
    <v-menu transition="slide-x-transition">
      <span slot="activator">{{current_countries_text.toUpperCase()}}</span>
      <v-list dense>
        <v-list-tile
          v-for="item in LIST_COUNTRIES"
          :key="item.id"
          @click="_set_current_countries(item.id)"
          :class="{'blue--text' : item.id === CURRENT_COUNTRIES}"
        >
          <v-list-tile-title>{{item.alias.toUpperCase()}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu transition="slide-x-transition">
       <span slot="activator" class="caption blue-grey--text"><slot></slot></span>
    </v-menu>
  </span>
</template>

<script>
import {mapActions ,mapGetters} from 'vuex'
export default {
  name: 'top-bread-crumbs',
  data: function(){
    return {
      asd: 'en'
    }
  },
  computed: {
    ...mapGetters( "base", {
      CURRENT_LANGUAGE: "current_language",
      CURRENT_BUSINESS: "current_business",
      CURRENT_COUNTRIES: "current_countries",
      LIST_LANGUAGE: "list_language",
      LIST_BUSINESS: "list_business",
      LIST_COUNTRIES: "list_countries"
    }),
    current_business_text: function(){
      let obj = this.LIST_BUSINESS.filter(el=>{
        return el.id === this.CURRENT_BUSINESS
      })
      return obj[0].alias
    },
    current_countries_text: function(){
      let obj = this.LIST_COUNTRIES.filter(el=>{
        return el.id === this.CURRENT_COUNTRIES
      })
      return obj[0].alias
    }
  },
  methods: {
    ...mapActions( "base", {
      SET_CURRENT_LANGUAGE: "set_current_language",
      SET_CURRENT_BUSINESS: "set_current_business",
      SET_CURRENT_COUNTRIES: "set_current_countries"
    }),
    _set_current_language: function(code){
      this.SET_CURRENT_LANGUAGE(code)
      this.$router.go({ name: "main" })
    },
    _set_current_business: function(code){
      this.SET_CURRENT_BUSINESS(code)
      this.$router.go({ name: "main" })
    },
    _set_current_countries: function(code){
      this.SET_CURRENT_COUNTRIES(code)
    }
  }
}
</script>
