<template >

  <div>
    <v-expansion-panel
      v-model="panel"
      expand
      v-if="!loading"
    >
      <v-expansion-panel-content
        v-for="(itemCategory,keyCategory) in remadeList"
        :key="keyCategory"
      >
        <div slot="header">{{keyCategory}}</div>
        <v-card>
          <v-card-text>

            <v-expansion-panel v-model="panelItem[keyCategory]" expand>
              <v-expansion-panel-content
                v-for="(itemSubCategory,keySubCategory) in itemCategory"
                :key="keySubCategory"
              >
                <div slot="header">
                  <span class="body-2">{{keySubCategory}}</span>
                  <span class="caption blue-grey--text">[ {{itemSubCategory.length}} ]</span>
                </div>
                <v-card>
                  <v-card-text>

                    <v-layout row wrap>
                      <v-flex v-for="(item, index) in itemSubCategory" xs3>

                        <v-card flat tile class="pa-2 ma-2" style="border:2px solid #eee">
                          <a href="" @click.prevent="openDialog(itemSubCategory, index, keyCategory, keySubCategory )" style="text-decoration: none;">
                            <v-layout row wrap justify-space-between>
                              <div class="caption">№{{item.shopNumber}}</div>
                              <v-icon v-if="item.numOfComments>0" small class="ma-1" color="primary">comment</v-icon>
                            </v-layout>
                            <v-img :src="`${photo_url}/${item.date}/${item.shopId}/${item.fileName}.jpg`" aspect-ratio="1" class="grey lighten-2">
                              <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                              </v-layout>
                            </v-img>
                          </a>
                        </v-card>

                      </v-flex>
                    </v-layout>

                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>


          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-dialog v-model="dialogImageListByCategory" fullscreen hide-overlay transition="fade-transition">
      <ImageListByCategory
        v-on:close-dialog="dialogImageListByCategory = false"
      ></ImageListByCategory>
    </v-dialog>

  </div>

</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  import ImageListByCategoryComponent from "@/components/v1/photo-report/image-list-by-category"

  export default {
    name: 'images-list',
    components: {
      ImageListByCategory: ImageListByCategoryComponent
    },
    data () {
      return {
        dialogImageListByCategory: true,

        photo_url: window.photo_url, // todo: убрать из window
        panel: [],
        panelItem:{},
      }
    },
    methods: {
      // ...mapActions( "facets", {
      //   SET_CURRENT_DATE: "set_current_date"
      // }),
      // ...mapActions( "images", {
      //   GET_LIST_BASED_ON_FACET: "get_list_based_on_facet"
      // }),
      openDialog: function(itemSubCategory, index, keyCategory, keySubCategory){
        this.dialogImageListByCategory = true
        // this.$emit('image-selected',itemSubCategory, index, keyCategory, keySubCategory)
      },


    },
    watch: {
      'remadeList': function(newValue){

        this.panelItem = []

        if (Object.keys(newValue).length === 1){
          this.panel.push(true)
        }else{
          this.panel = []
        }

      }
    },
    computed: {
      ...mapGetters( "images", {
        remadeList: "remade_list",
        loading: "loading"
      }),
      // ...mapGetters( "facets", {
      //   CURRENT_DATE: "current_date"
      // })
    },
    mounted: function () {
      // if (this.CURRENT_DATE === null && this.$route.params.date){
      //   this.SET_CURRENT_DATE(this.$route.params.date)
      //   this.GET_LIST_BASED_ON_FACET().then(()=>{
      //     this.$router.push({ name: "show-photoreport-by-date", params: {
      //         date: this.$route.params.date
      //       }})
      //   })
      // }
    }
  }
</script>
