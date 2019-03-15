<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex md4>

          <h3 class="text-md-center mb-2">{{$t('CHOOSE_LANGUAGE')}}</h3>

          <v-select
            :items="LIST_LANGUAGE"
            v-model="current_language_"
            item-text="label"
            item-value="code"
            solo
          ></v-select>

          <div class="text-xs-center" v-if="CURRENT_LANGUAGE !== null">
            <v-btn color="primary" @click="next">{{$t('BTN.NEXT')}}</v-btn>
          </div>

        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import {mapActions ,mapGetters} from 'vuex'
  export default {
    name: "choose-language-layout",
    computed: {
      ...mapGetters('base', {
        LIST_LANGUAGE: 'list_language',
        CURRENT_LANGUAGE: 'current_language',
      }),
      current_language_: {
        get: function () {
          return this.CURRENT_LANGUAGE
        },
        set: function (code) {
          this.SET_CURRENT_LANGUAGE(code)
          this.$i18n.locale = code
          this.$cookies.set("org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE", code)
        }
      }
    },
    methods: {
      ...mapActions('base', {
        SET_CURRENT_LANGUAGE: 'set_current_language'
      }),
      next: function(){
        this.$router.push({name:"choose_business-layout"})
      }
    }
  }
</script>
