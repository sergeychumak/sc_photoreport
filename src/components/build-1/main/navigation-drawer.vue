<template>
  <v-navigation-drawer
    v-show="isShowImagePage"
    :app="isShowImagePage"
    :mini-variant="mini"
    permanent
    overflow
    stateless
    class="grey lighten-5"
  >
    <v-toolbar flat class="transparent">

      <v-list class="pa-0">

        <v-list-tile @click="mini=!mini">
          <v-list-tile-avatar><v-icon>menu</v-icon></v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="caption brown--text text--lighten-4">{{$t('MENU.HIDE_PANEL')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="IS_AUTH"
          avatar color="blue" class="pt-3 tBorder bBorder" style="height: 85px; background: #ffffff;">
          <v-list-tile-avatar>
            <v-avatar>
              <v-icon color="primary" large dark1>account_circle</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="body-2">{{userName}}</v-list-tile-title>
            <v-list-tile-sub-title>
                <span
                  style="cursor: pointer"
                  class="caption brown--text text--lighten-3 pr-3"
                  @click="$router.push( { name:'UserInfo' } )"
                >{{$t('LABEL.USER_INFO')}}</span>
              <span
                style="cursor: pointer"
                class="caption brown--text text--lighten-3 pr-1"
                @click="exit">{{$t('BTN.EXIT')}}</span>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="$router.push( { name:'showPhotoreport' } )">
          <v-list-tile-avatar>
            <v-tooltip bottom>
              <v-icon slot="activator">camera_alt</v-icon>
              <span>{{$t('MENU.SHOW_PHOTO_REPORT')}}</span>
            </v-tooltip>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="caption brown--text">{{$t('MENU.SHOW_PHOTO_REPORT')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <div class="ml-3 mr-3">
          <ReportsFilter v-show="!mini && isShowPhotoreportPage"></ReportsFilter>
        </div>

        <v-list-tile @click="$router.push( { name:'photoUpload' } )" v-if="isShop">
          <v-list-tile-avatar>
            <v-tooltip bottom>
              <v-icon slot="activator">add_a_photo</v-icon>
              <span>{{$t('MENU.UPLOAD_PHOTO_REPORT')}}</span>
            </v-tooltip>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="caption brown--text">{{$t('MENU.UPLOAD_PHOTO_REPORT')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


        <router-link v-if="!IS_AUTH" tag="v-list-tile" :to="{ name: 'userAuthentication' }">
          <v-list-tile-avatar>
            <v-tooltip bottom>
              <v-icon slot="activator">person</v-icon>
              <span>{{$t('BTN.ENTER')}}</span>
            </v-tooltip>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="body-1">{{$t('BTN.ENTER')}}</v-list-tile-title>
          </v-list-tile-content>
        </router-link>

        <router-link v-if="!IS_AUTH" tag="v-list-tile" :to="{ name: 'userRegistration' }">
          <v-list-tile-avatar>
            <v-tooltip bottom>
              <v-icon slot="activator">details</v-icon>
              <span>{{$t('BTN.TO_REG')}}</span>
            </v-tooltip>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="body-1">{{$t('BTN.TO_REG')}}</v-list-tile-title>
          </v-list-tile-content>
        </router-link>



        <!-- ADMIN ****************************************** -->
        <v-list-group v-if="IS_AUTH && isAdmin">
          <v-list-tile slot="activator">
            <v-list-tile-avatar>
              <v-tooltip bottom>
                <v-icon slot="activator">extension</v-icon>
                <span>{{$t('ADMIN.LABEL')}}</span>
              </v-tooltip>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="caption brown--text">{{$t('ADMIN.LABEL')}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <template v-for="item in adminMenu">
            <v-list-tile @click="$router.push( { name: item.router } )">
              <v-list-tile-avatar>
                <v-tooltip bottom>
                  <v-icon slot="activator">{{item.icon}}</v-icon>
                  <span>{{item.label}}</span>
                </v-tooltip>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="caption brown--text">{{item.label}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list-group>
      </v-list>
    </v-toolbar>
  </v-navigation-drawer>
</template>

<script>
  import {mapActions ,mapGetters} from 'vuex'
  import ReportsFilter from '@/components/build-1/reports-filter'
  export default {
  name: 'navigation-drawer-components',
  components: {
    ReportsFilter: ReportsFilter
  },
  data: function(){
    return {
      mini: false,
      adminMenu : [
        { router: 'adminUsers', label: this.$t('ADMIN.MENU.USERS'), icon: "assignment_ind" },
        { router: 'adminPhotoCategories', label: this.$t('ADMIN.MENU.PHOTO_CATEGORIES'), icon: "assignment"},
        { router: 'adminLines', label: this.$t('ADMIN.MENU.LINES'), icon: "assignment_returned" },
        { router: 'adminGoms', label: this.$t('ADMIN.MENU.GOMS'), icon: "assignment_late" },
        { router: 'adminDocumentcategory', label: this.$t('ADMIN.MENU.DOCUMENT_CATEGORY'), icon: "bookmark" },
        { router: 'adminDocumenttypes', label: this.$t('ADMIN.MENU.DOCUMENT_TYPES'), icon: "bookmark_border" },
        { router: 'adminDocumentseasons', label: this.$t('ADMIN.MENU.DOCUMENT_SEASONS'), icon: "book" },
        { router: 'adminErrors', label: this.$t('ADMIN.MENU.ERRORS'), icon: "bug_report" }
      ]
    }
  },
  methods: {
    ...mapActions("master", {
      exit: "user_exit"
    }),
    clk_exit: function(){
      this.exit().then(()=>{
        this.$router.push({ name: "main" })
      })
    }
  },
  computed: {
    ...mapGetters( "master", {
      IS_AUTH: "is_auth",
      USER_INFO: "user_info"
    }),
    isShowPhotoreportPage: function(){
      return this.$route.name == "showPhotoreport"
    },
    isShowImagePage: function () {
      return !(this.$route.name == "showImage")
    },

    userName: function(){
      if (Object.keys(this.USER_INFO).length > 0)
        return this.USER_INFO.alias
      return ""
    },
    isAdmin: function(){
      if (Object.keys(this.USER_INFO).length > 0)
        return this.USER_INFO.email == "admin@admin"
      return false
    },
    isShop: function(){
      if (Object.keys(this.USER_INFO).length > 0)
        return this.USER_INFO.shopId > 0
      return false
    },

  }
}
</script>
