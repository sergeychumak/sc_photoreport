<template>
  <v-app class="vApplication application">
    <v-layout align-center justify-center column fill-height v-if="loading">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </v-layout>
    <div class="application__wrapper" v-else >
      <div class="application__header">
        <v-toolbar class="elevation-1" height="40">
          <v-icon>photo_camera</v-icon>
          <v-toolbar-title>
            <div class="body-2 pb-0">P.R.III</div>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items >

            <v-menu transition="slide-x-transition">
              <v-btn slot="activator" flat color="red">Управление</v-btn>
              <v-list dense>
                <v-list-tile @click="go2url('admin-users')">
                  <v-icon class="pr-2">person</v-icon>
                  <v-list-tile-title>Пользователи</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="go2url('admin-category-photos')">
                  <v-icon class="pr-2">photo</v-icon>
                  <v-list-tile-title>Категории фотографий</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="go2url('admin-ruler')">
                  <v-icon class="pr-2">device_hub</v-icon>
                  <v-list-tile-title>Линейка</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="go2url('admin-goms')"><v-icon class="pr-2">loyalty</v-icon><v-list-tile-title>{{$t('TABLE._name_.GOMS')}}</v-list-tile-title></v-list-tile>
                <v-list-tile @click="go2url('admin-category')"><v-icon class="pr-2">loyalty</v-icon><v-list-tile-title>{{$t('TABLE._name_.CATEGORY')}}</v-list-tile-title></v-list-tile>
                <v-list-tile @click="go2url('admin-document-types')"><v-icon class="pr-2">loyalty</v-icon><v-list-tile-title>{{$t('TABLE._name_.DOCUMENT_TYPES')}}</v-list-tile-title></v-list-tile>
                <v-list-tile @click="go2url('admin-document-seasons')"><v-icon class="pr-2">loyalty</v-icon><v-list-tile-title>{{$t('TABLE._name_.DOCUMENT_SEASONS')}}</v-list-tile-title></v-list-tile>
                <v-list-tile @click="go2url('admin-document')"><v-icon class="pr-2">note</v-icon><v-list-tile-title>{{$t('TABLE._name_.DOCUMENT')}}</v-list-tile-title></v-list-tile>
              </v-list>
            </v-menu>

            <v-btn flat color="teal" class="caption font-weight-regular" @click="go2url('show-photoreport')"><v-icon class="pr-2" color="teal">photo_album</v-icon>{{$t('PHOTOREPORT')}}</v-btn>
            <v-btn flat color="blue" class="caption font-weight-regular" @click="go2url('documentation')"><v-icon class="pr-2" color="blue">local_library</v-icon>{{$t('DOCUMENTATION')}}</v-btn>
            <selectBusiness></selectBusiness>
            <selectCountries></selectCountries>
            <selectReference></selectReference>
            <selectLanguage></selectLanguage>
            <v-btn icon flat color="orange" class="caption font-weight-regular" @click="showAuthDialog=true"><v-icon color="orange">verified_user</v-icon></v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </div>
      <div class="application__content"><router-view></router-view></div>
      <div class="application__footer">999</div>
      <!--<div class="app__page">-->
          <!--<div class="app__subHeader">-->
            <!--test sub header-->
          <!--</div>-->
          <!--<div class="app__content">-->
            <!--<div class="app__content_left">1</div>-->
            <!--<div class="app__content_center">2</div>-->
            <!--<div class="app__content_right">3</div>-->
          <!--</div>-->
      <!--</div>-->
    </div>

    <auth :showAuthDialog.sync="showAuthDialog"></auth>

  </v-app>
</template>



<script>
// COMPONENTS
  import selectLanguage from '@/components/select-language'
  import selectBusiness from '@/components/select-business'
  import selectCountries from '@/components/select-countries'
  import selectReference from '@/components/select-reference'
  import auth from '@/components/auth/auth'

// VUEX
  import { mapGetters, mapActions  } from 'vuex'

// ----

export default {
  name: 'LayoutMain',
  components: {
    selectLanguage: selectLanguage,
    selectBusiness: selectBusiness,
    selectCountries: selectCountries,
    selectReference: selectReference,
    auth: auth
  },
  data: function(){
    return {
      showAuthDialog: false,
      loading: false
    }
  },
  mounted: function(){
    var lang = this.$route.params.lang;
    this.$cookies.set(this.langCookieName, lang )
    this.set_current({ lang: lang })
    this.$i18n.locale = lang
    this.initData()
  },
  computed: {
    ...mapGetters('lang' , {
      langDefault : 'langDefault',
      langCookieName : 'cookieName'
    })
  },
  methods: {
    ...mapActions('lang', {
      set_current: 'set_current'
    }),
    initData: function(){
      this.loading = true
      Promise.all([
        this.$store.dispatch("business/fill_list"),
        this.$store.dispatch("countries/fill_list")
      ]).then(() => {
        setTimeout(() => {
          this.loading = false
        },1000)
      });
    },
    go2url: function(type){
      switch (type) {
        case "documentation":
          this.$router.push( { name:'doc' } )
        break
        case "show-photoreport":
          this.$router.push( { name:'shopReport' } )
        break
        case "auth":
          this.$router.push( { name:'auth' } )
        break
        case "admin-users":
          this.$router.push( { name:'adminUsers' } )
        break
        case "admin-category-photos":this.$router.push( { name:'adminCategoryPhoto' } ); break;
        case "admin-ruler": this.$router.push( { name:'adminRuler' } ); break;
        case "admin-goms": this.$router.push( { name:'adminGoms' } ); break;
        case "admin-category": this.$router.push( { name:'adminCategory' } ); break;
        case "admin-document-types": this.$router.push( { name:'adminDocumentTypes' } ); break;
        case "admin-document-seasons": this.$router.push( { name:'adminDocumentSeasons' } ); break;
        case "admin-document": this.$router.push( { name:'adminDocument' } ); break;

      }
    }
  }
}
</script>
