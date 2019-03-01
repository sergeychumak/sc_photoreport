<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex md4>

          <h3 class="text-md-center mb-2">{{$t('CHOOSE_BUSINESS')}}</h3>

          <v-select
            :items="LIST_BUSINESS"
            v-model="current_business_"
            item-text="alias"
            item-value="id"
            solo
          ></v-select>

          <div class="text-xs-center">
            <v-btn color="" @click="back">{{$t('BTN.BACK')}}</v-btn>
            <v-btn color="primary" @click="next" v-if="CURRENT_BUSINESS !== null">{{$t('BTN.NEXT')}}</v-btn>
          </div>

        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import {mapActions ,mapGetters} from 'vuex'
  export default {
    name: "choose-business-layout",
    mounted: function(){
      this.FILL_LIST_BUSINESS()
    },
    computed: {
      ...mapGetters('base', {
        LIST_BUSINESS: 'list_business',
        CURRENT_BUSINESS: 'current_business'
      }),
      current_business_: {
        get: function () {
          return this.CURRENT_BUSINESS
        },
        set: function (code) {
          this.SET_CURRENT_BUSINESS(code)
        }
      }
    },
    methods: {
      ...mapActions('base', {
        FILL_LIST_BUSINESS: 'fill_list_business',
        SET_CURRENT_BUSINESS: 'set_current_business'
      }),
      back: function(){
        this.$router.push({name:"choose-language-layout"})
      },
      next: function(){
        this.$router.push({name:"choose_countries-layout"})
      }
    }
  }
</script>
