<template>
  <v-layout column>

    <!--NAME-->
    <div class="isHook">
      <div ref="isHook__Name" class="blue--text">
        / {{$t('PAGE_TITLE.USER_AUTHENTICATION')}}
      </div>
    </div>

    <!--ACTION-->
    <div class="isHook">
      <div ref="isHook__Actions">
        <v-btn small flat color="primary" @click="enter">{{$t('BTN.ENTER')}}</v-btn>
      </div>
    </div>

    <v-flex class="overflowAuto" >
      <v-card width="500" flat class="ma-4">

        <div>{{$t("FIELDS.EMAIL")}} *</div>
        <v-text-field solo v-model="email" hide-details></v-text-field>

        <div class="mt-4">{{$t("FIELDS.PASSWORD")}} *</div>
        <v-text-field type="password" password solo v-model="password" hide-details></v-text-field>

        <v-alert class="mt-4" :value="alert.error" type="error" transition="scale-transition">
          {{$t('ERROR.AUTH')}}
        </v-alert>

      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'user-authentication',
    data(){
      return {
        alert: {
          error: false
        },
        email: null,
        password: null
      }
    },
    methods:{

      ...mapActions( "master", {
        user_enter: "user_enter"
      }),

      enter: function(){
        this.user_enter({
          email: this.email,
          password: this.password
        }).then((res)=>{
          if (res){
            this.$router.push({name: 'showPhotoreport'})
          }
          else{
            this.alert.error = true
            setTimeout(()=>{
              this.alert.error = false
            },5000)
          }
        })

      }
    }
  }
</script>

