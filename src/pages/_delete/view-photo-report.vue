<template>
  <div class="vApplication__page">

    <!--NAME-->
    <div ref="isHook__Name">
      / view photo report
    </div>

    <!--ACTION-->
    <div ref="isHook__Actions">
      <!--<v-menu transition="slide-x-transition">-->
        <!--<v-btn slot="activator" icon flat color="teal">-->
          <!--<v-icon v-if="countPhotoInRow==4">filter_4</v-icon>-->
          <!--<v-icon v-else>filter_6</v-icon>-->
        <!--</v-btn>-->
        <!--<v-list dense>-->
          <!--<v-list-tile @click="countPhotoInRow=4">-->
            <!--<v-list-tile-title><v-icon >filter_4</v-icon></v-list-tile-title>-->
          <!--</v-list-tile>-->
          <!--<v-list-tile @click="countPhotoInRow=6">-->
            <!--<v-list-tile-title><v-icon >filter_6</v-icon></v-list-tile-title>-->
          <!--</v-list-tile>-->
        <!--</v-list>-->
      <!--</v-menu>-->
    </div>



    <v-container fluid fill-height class="ma-0 pa-0" style="overflow: hidden">

      <v-layout row class="ma-0 pa-0" fluid>

        <v-flex>
          <FacetsList
            v-on:date-selected="dateSelected"
          ></FacetsList>
        </v-flex>
        <v-flex style="width:100%; overflow: auto" class="pa-3">
          <ImagesList
            v-on:image-selected="openDialog"
          ></ImagesList>
        </v-flex>

      </v-layout>
    </v-container>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <viewPhotoReportPageDialog
        v-on:close-dialog="closeDialog"
        v-on:image-show-back="imageShowBack"
        v-on:image-show-up="imageShowUp"
        :dialog_category="dialog_category"
        :dialog_subcategory="dialog_subcategory"
        :dialog_index="dialog_index"
        :dialog_list="dialog_list"
      ></viewPhotoReportPageDialog>
    </v-dialog>

  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import viewPhotoReportPageDialog from '@/pages/view-photo-report-dialog'
  import FacetsList from '@/components/elements/facets-list'
  import ImagesList from '@/components/elements/images-list'
  export default {
    name: 'ViewPhotoReportPage',
    components: {
      viewPhotoReportPageDialog: viewPhotoReportPageDialog,
      FacetsList: FacetsList,
      ImagesList: ImagesList
    },
    data(){return {

      dialog: false,
      dialog_list: [],
      dialog_index: null,
      dialog_category: '',
      dialog_subcategory: '',

      photo_url: window.photo_url, // todo: убрать из window
      images: [],
      images_: [],
      countPhotoInRow: 4
    }},
    watch: {},
    mounted: function(){},
    methods: {

      ...mapActions( "auth", {
        CHECK: "checkHash"
      }),

      ...mapActions( "images", {
        GET_LIST_BASED_ON_FACET: "get_list_based_on_facet"
      }),

      dateSelected: function(){
        this.GET_LIST_BASED_ON_FACET()
      },

      ...mapActions([
        "IMAGES_GET_LIST"
      ]),
      getImages: function (packageDate) {
        this.IMAGES_GET_LIST(packageDate).then((res)=>{
          let obj = {}
          res.map((el)=>{
            if (!el.categoryName0)
              el.categoryName0 = "!"
            if (!el.categoryName)
              el.categoryName = "!"
             if (!obj[el.categoryName0]){
                obj[el.categoryName0] = {}
             }
            if (!obj[el.categoryName0][el.categoryName]){
              obj[el.categoryName0][el.categoryName] = []
            }
            obj[el.categoryName0][el.categoryName].push(el)
          })
          this.images = res
          this.images_ = obj
        })
      },
      openDialog: function (items, index, keyCategory, keySubCategory) {
        this.dialog_list = items
        this.dialog_index = index
        this.dialog_category = keyCategory
        this.dialog_subcategory = keySubCategory
        this.dialog = true
      },
      closeDialog: function () {
        this.dialog_index = null // необходим для того чтобы в диалоге срабатывал watch
        this.dialog = false
      },
      imageShowBack: function () {
        let res = this.dialog_index - 1
        if (res < 0)
          res = 0
          this.dialog_index = res
      },
      imageShowUp: function () {
        let res = this.dialog_index + 1
        let lenArr = this.dialog_list.length - 1
        if (res >= lenArr)
          res = lenArr
        this.dialog_index = res
      },
    },
    computed: {

      ...mapGetters( "facets", {
        facets_list: "list"
      }),

      ...mapGetters([
        "facet_list"
      ]),
      countPhotoInRow__class: function(){
        return this.countPhotoInRow === 4 ? "xs3" : "xs2"
      },
    },
    updated: function(){

      this.CHECK({
        hash: this.$cookies.get('hash')
      }).then(
        ()=>{
          console.log('page(view-photo-report) hash ok', this.$cookies.get('hash'))
        },
        (hash)=>{
          this.$router.push({ name: "user_auth" })
          this.$cookies.set("hash", hash)
        },
      )

    }
  }
</script>
