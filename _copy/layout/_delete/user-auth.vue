<template>
  <v-app>
    <v-card flat max-width="500" color="transparent" class="ml-3">
      <v-btn color="info" flat  @click="clk_toMain">{{$t('BTN.TO_MAIN')}}</v-btn>
      <v-btn color="success" flat @click="$router.push( { name:'user_registration' } )">{{$t('BTN.TO_REG')}}</v-btn>
      <v-card-title class="headline" primary-title>
        {{$t('LABEL.AUTH')}}
      </v-card-title>
      <v-card-text>
        <v-layout row>
          <v-flex xs4>{{$t('EMAIL')}}</v-flex>
          <v-flex xs8><v-text-field solo v-model="email" hide-details></v-text-field></v-flex>
        </v-layout>
        <v-layout row class="mt-4">
          <v-flex xs4>{{$t('PASSWORD')}}</v-flex>
          <v-flex xs8><v-text-field type="password" password solo v-model="password" hide-details></v-text-field></v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions class="pr-3 pl-3">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="clk_enter">{{$t('BTN.ENTER')}}</v-btn>
      </v-card-actions>
      <v-alert :value="ERROR" type="error">{{$t('ERROR.AUTH')}}</v-alert>
    </v-card>
  </v-app>
</template>

<script>

  import {mapActions ,mapGetters} from 'vuex'

  export default {
    name: "user-auth-layout",
    data: () => ({
      email: null,
      password: null
    }),

    mounted: function(){
      if (this.IS_AUTH){
        this.$router.push({ name: 'main'})
      }
    },
    computed: {
      ...mapGetters( "auth", {
        IS_AUTH: 'is_auth',
        ERROR: 'error',
      }),
    },
    methods: {

      ...mapActions( "auth", {
        AUTH_ENTER: 'enter'
      }),

      clk_enter: function(){
        this.AUTH_ENTER({
          email: this.email,
          password: this.password
        })
      },

      clk_toMain: function(){
        this.$router.push({ name: 'main'})
      }

    },
    watch: {
      "IS_AUTH": function(newValue){
        if (newValue){
          this.$router.push({ name: 'main'})
        }
      }
    },
  }
</script>
