<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex md4>

          <h3 class="text-md-center mb-2">{{$t('CHOOSE_COUNTRIES')}}</h3>

          <v-select
            :items="LIST_COUNTRIES"
            v-model="current_countries_"
            item-text="alias"
            item-value="id"
            solo
          ></v-select>

          <div class="text-xs-center">
            <v-btn color="" @click="back">{{$t('BTN.BACK')}}</v-btn>
            <v-btn color="primary" @click="next" v-if="CURRENT_COUNTRIES !== null">{{$t('BTN.WELCOME')}}</v-btn>
          </div>

        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import {mapActions ,mapGetters} from 'vuex'
  export default {
    name: "choose-countries-layout",
    mounted: function(){
      this.FILL_LIST_COUNTRIES()
    },
    computed: {
      ...mapGetters('base', {
        LIST_COUNTRIES: 'list_countries',
        CURRENT_COUNTRIES: 'current_countries'
      }),
      current_countries_: {
        get: function () {
          return this.CURRENT_COUNTRIES
        },
        set: function (code) {
          this.SET_CURRENT_COUNTRIES(code)
        }
      }
    },
    methods: {
      ...mapActions('base', {
        FILL_LIST_COUNTRIES: 'fill_list_countries',
        SET_CURRENT_COUNTRIES: 'set_current_countries'
      }),
      back: function(){
        this.$router.push({name:"choose_business-layout"})
      },
      next: function(){
        this.$router.push({name:"main"})
      }
    }
  }
</script>
