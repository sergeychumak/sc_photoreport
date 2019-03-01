<template>
  <v-app>

    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >

      <v-list dense>
        <!-- VIEW_PHOTO_REPORTS****************************************** -->
        <v-list-tile @click="$router.push( { name:'viewPhotoreport' } )" color="blue" class="grayBackground">
          <v-list-tile-action><v-icon color="blue">photo_size_select_actual</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>{{$t('VIEW_PHOTO_REPORTS')}}</v-list-tile-title></v-list-tile-content>
        </v-list-tile>

        <div v-if="is_viewPhotoReport" class="pa-2 ma-0 ViewPhotoreportWrap">
          <FilterViewPhotoReports
            v-on:apply="FACETS_GET_LIST"
          ></FilterViewPhotoReports>
        </div>

        <!-- ADMIN ****************************************** -->
        <v-list-group v-if="is_admin">
          <v-list-tile slot="activator" color="pink">
            <v-list-tile-action>
              <v-list-tile-action><v-icon color="pink">blur_on</v-icon></v-list-tile-action>
            </v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>{{$t('CONTROL.LABEL')}}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="$router.push( { name:'adminUsers' } )" color="pink">
            <v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>{{$t('CONTROL.USERS')}}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="$router.push( { name:'adminPhotoCategories' } )" color="pink">
            <v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>{{$t('CONTROL.' + CURRENT_BUSINESS_TEXT + '.PHOTO_CATEGORIES')}}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="$router.push( { name:'adminLines' } )" color="pink">
            <v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>{{$t('CONTROL.' + CURRENT_BUSINESS_TEXT + '.LINES')}}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="$router.push( { name:'adminGoms' } )" color="pink">
            <v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>{{$t('CONTROL.GOMS')}}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="$router.push( { name:'adminDocumentcategory' } )" color="pink">
          <v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>{{$t('CONTROL.DOCUMENTCATEGORY')}}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="$router.push( { name:'adminDocumenttypes' } )" color="pink">
            <v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>{{$t('CONTROL.DOCUMENTTYPES')}}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="$router.push( { name:'adminDocumentseasons' } )" color="pink">
            <v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>{{$t('CONTROL.DOCUMENTSEASONS')}}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>

          <!--<v-list-tile @click="" color="pink">-->
            <!--<v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>-->
            <!--<v-list-tile-content><v-list-tile-title>{{$t('CONTROL.CATEGORIES')}}</v-list-tile-title></v-list-tile-content>-->
          <!--</v-list-tile>-->

          <!--<v-list-tile @click="" color="pink">-->
            <!--<v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>-->
            <!--<v-list-tile-content><v-list-tile-title>{{$t('CONTROL.TYPES_OF_DOCUMENTS')}}</v-list-tile-title></v-list-tile-content>-->
          <!--</v-list-tile>-->

          <!--<v-list-tile @click="" color="pink">-->
            <!--<v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>-->
            <!--<v-list-tile-content><v-list-tile-title>{{$t('CONTROL.SEASONS')}}</v-list-tile-title></v-list-tile-content>-->
          <!--</v-list-tile>-->

          <!--<v-list-tile @click="" color="pink">-->
            <!--<v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>-->
            <!--<v-list-tile-content><v-list-tile-title>{{$t('CONTROL.DOCUMENTS')}}</v-list-tile-title></v-list-tile-content>-->
          <!--</v-list-tile>-->

          <!--<v-list-tile @click="" color="pink">-->
            <!--<v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>-->
            <!--<v-list-tile-content><v-list-tile-title>{{$t('CONTROL.ZONING')}}</v-list-tile-title></v-list-tile-content>-->
          <!--</v-list-tile>-->

          <!--<v-list-tile @click="$router.push( { name:'adminErrorGroups' } )" color="pink">-->
            <!--<v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>-->
            <!--<v-list-tile-content><v-list-tile-title>{{$t('CONTROL.ERROR_GROUPS')}}</v-list-tile-title></v-list-tile-content>-->
          <!--</v-list-tile>-->

          <v-list-tile @click="$router.push( { name:'adminErrors' } )" color="pink">
            <v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>{{$t('CONTROL.ERRORS')}}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="$router.push( { name:'adminZoning' } )" color="pink">
            <v-list-tile-action><v-list-tile-action><v-icon color="pink">blur_circular</v-icon></v-list-tile-action></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>{{$t('CONTROL.ZONING')}}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>

        </v-list-group>

         <!--UPLOAD****************************************** -->
        <v-list-tile @click="$router.push( { name:'photoUpload' } )" color="blue" v-if="is_bindShop">
          <v-list-tile-action><v-icon color="blue">add_a_photo</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>{{$t('UPLOAD_PHOTO_REPORT')}}</v-list-tile-title></v-list-tile-content>
        </v-list-tile>

        <!-- DOC****************************************** -->
        <v-list-tile @click="$router.push( { name:'listOfDocuments' } )" color="cyan">
          <v-list-tile-action><v-icon color="cyan">list_alt</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>{{$t('DOCUMENTATION')}}</v-list-tile-title></v-list-tile-content>
        </v-list-tile>

        <!-- HELP ****************************************** -->
        <v-list-group>
          <v-list-tile slot="activator" color="teal">
            <v-list-tile-action ><v-icon color="teal">help_outline</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>{{$t('HELP.LABEL')}}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>
          <!--<v-list-tile @click="" color="teal">-->
            <!--<v-list-tile-action><v-icon color="teal">desktop_windows</v-icon></v-list-tile-action>-->
            <!--<v-list-tile-content><v-list-tile-title>{{$t('HELP.ABOUT_THE_PROGRAM')}}</v-list-tile-title></v-list-tile-content>-->
          <!--</v-list-tile>-->
          <v-list-tile @click="openUrl('/fosm2/resources/instructions/rules_ru.pdf')" color="teal">
            <v-list-tile-action><v-icon color="teal">star_border</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>{{$t('HELP.PHOTO_REPORT_PREPARATION_RULES')}}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="openUrl('/fosm2/resources/instructions/user_manual__ru.pdf')" color="teal">
            <v-list-tile-action><v-icon color="teal">sentiment_very_satisfied</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>{{$t('HELP.USER_GUIDE')}}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <!-- ENTER****************************************** -->
        <v-list-tile @click="$router.push( { name:'user_auth' } )" v-if="!IS_AUTH">
          <v-list-tile-action><v-icon>input</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>{{$t('BTN.ENTER')}}</v-list-tile-title></v-list-tile-content>
        </v-list-tile>

        <!-- ENTER****************************************** -->
        <v-list-tile @click="clk_exit" v-if="IS_AUTH" >
          <v-list-tile-action><v-icon>input</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>{{$t('BTN.EXIT')}}</v-list-tile-title></v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="IS_AUTH" class="blue-grey--text caption">
          {{USER_INFO.alias}} <v-btn flat small icon @click="$router.push( { name:'user_info' } )"><v-icon small>edit</v-icon></v-btn>
        </v-list-tile>


      </v-list>



    </v-navigation-drawer>

    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="darken-3"
      app
      fixed
      dense
    >
      <v-toolbar-title class="pl-1" >
        <v-toolbar-side-icon @click.stop="drawer = !drawer" ></v-toolbar-side-icon>

        <TopBreadCrumbs>
          <span ref="isHook__Name"></span>
        </TopBreadCrumbs>


      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div ref="isHook__Actions"></div>
    </v-toolbar>

    <v-content>
      <v-container class="pa-0">
        <v-layout>
          <div class="vApplication">
            <router-view ref="rview" v-on:sync-content="syncContent"></router-view>
          </div>
        </v-layout>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>

  import {mapActions ,mapGetters} from 'vuex'

  import TopBreadCrumbs from '@/components/top-bread-crumbs'
  import FilterViewPhotoReports from '@/components/elements/filter-view-photo-reports'

  export default {

    components: {
      TopBreadCrumbs: TopBreadCrumbs,
      FilterViewPhotoReports: FilterViewPhotoReports
    },

    data: () => ({

      facetsList: [],

      drawer: true,
      showContent: false,

      loading_lines: false,
      loading_category: false,
      loading_district: false,
      loading_department: false,
      loading_shop: false,
      loading_facet: false
    }),

    mounted: function () {
      if (this.CURRENT_LANGUAGE === null){
        this.$router.push({name:"choose-language-layout"})
      }else{
        this.$i18n.locale = this.CURRENT_LANGUAGE
        this.$cookies.set("org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE", this.CURRENT_LANGUAGE)
        if (this.CURRENT_BUSINESS === null){
          this.$router.push({name:"choose_business-layout"})
        }else{
          if (this.CURRENT_COUNTRIES === null){
            this.$router.push({name:"choose_countries-layout"})
          }
        }
      }
      this.syncContent()

      this.CHECK({
        hash: this.$cookies.get('hash')
      }).then(
        ()=>{
          console.log('page(main) hash ok', this.$cookies.get('hash'))
        },
        (hash)=>{
          this.$router.push({ name: "user_auth" })
          this.$cookies.set("hash", hash)
        },
      )


    },

    updated: function(){
      this.syncContent()
    },

    computed: {

      ...mapGetters( "main", {
        HASH: "hash"
      }),

      ...mapGetters( "base", {
        CURRENT_LANGUAGE: "current_language",
        CURRENT_BUSINESS: "current_business",
        CURRENT_COUNTRIES: "current_countries",
        CURRENT_BUSINESS_TEXT: "current_business_text"
      }),

      ...mapGetters( "auth", {
        IS_AUTH: "is_auth",
        USER_INFO: "user_info"
      }),

      is_viewPhotoReport: function () {
        return this.$route.name === "viewPhotoreport"
      },

      is_admin: function(){
        if ( Object.keys(this.USER_INFO).length > 0 )
          if (this.USER_INFO.alias === "Admin")
            return true
        return false
      },

      is_bindShop: function(){
        if ( Object.keys(this.USER_INFO).length > 0 )
          if (this.USER_INFO.shopId > 0)
            return true
        return false
      }

    },

    methods: {

      ...mapActions( "facets", {
        FACETS_GET_LIST: "get_list"
      }),

      ...mapActions( "auth", {
        EXIT: "exit",
        CHECK: "checkHash"
      }),

      syncContent: function () {
        if ('rview' in this.$refs && this.$refs.rview){
          if ('isHook__Name' in this.$refs.rview.$refs){
            this.$refs.isHook__Name.innerHTML = ""
            this.$refs.isHook__Name.appendChild(this.$refs.rview.$refs.isHook__Name)
          }else{
            this.$refs.isHook__Name.innerHTML = ""
          }

          if ('isHook__Actions' in this.$refs.rview.$refs){
            this.$refs.isHook__Actions.innerHTML = ""
            this.$refs.isHook__Actions.appendChild(this.$refs.rview.$refs.isHook__Actions)
          }else{
            this.$refs.isHook__Actions.innerHTML = ""
          }
        }
        else{
          this.$refs.isHook__Name.innerHTML = ""
          this.$refs.isHook__Actions.innerHTML = ""
        }
      },


      clk_exit: function(){
        this.EXIT().then(()=>{
          this.$router.push({ name: "main" })
        })
      },
      //
      // openUrl: function(url){
      //   let win = window.open(url, '_blank');
      //   win.focus();
      // }


    }
  }
</script>

