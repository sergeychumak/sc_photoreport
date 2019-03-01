<template >

  <v-layout>
    <v-flex class="ma1-2">


      <v-layout row wrap>
        <v-flex v-for="(item, index) in list" xs3>
          <v-card flat tile class="pa-2 ma-2"
                  :style="styleCard(item.numOfComments)"
          >
            <a href="" @click.prevent="showImage(item.id)" style="text-decoration: none;">
              <v-layout row wrap justify-space-between>
                <div class="caption">№{{item.shopNumber}}</div>
              </v-layout>
              <v-img :src="`${photo_url}/${item.date}/${item.shopId}/${item.fileName}.jpg`" aspect-ratio="1"
                     class="grey lighten-2">
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>
              <v-layout column>
                <div class="caption">{{item.categoryName}}</div>
                <div class="caption">{{item.categoryName0}}</div>
              </v-layout>
            </a>
          </v-card>
        </v-flex>
      </v-layout>

        <!--<v-expansion-panel-->
          <!--v-model="panel"-->
          <!--expand-->
          <!--v-if="!LOADING"-->
        <!--&gt;-->

          <!--<v-expansion-panel-content-->
            <!--v-for="(itemShop,key) in list"-->
            <!--:key="key"-->
          <!--&gt;-->


            <!--<div slot="header">-->
              <!--<v-layout>-->
                <!--<v-flex shrink style="width:100px;">№ {{itemShop.shopNumber}}</v-flex>-->
                <!--<v-flex><span class="caption blue-grey&#45;&#45;text text&#45;&#45;lighten-3">{{itemShop.shopName}}</span></v-flex>-->
              <!--</v-layout>-->
            <!--</div>-->
            <!--<v-card>-->
              <!--<v-card-text>-->

                <!--&lt;!&ndash;<v-layout row wrap>&ndash;&gt;-->
                  <!--&lt;!&ndash;<v-flex v-for="(item, index) in itemShop.data" xs3>&ndash;&gt;-->

                    <!--&lt;!&ndash;<v-card flat tile class="pa-2 ma-2"&ndash;&gt;-->
                      <!--&lt;!&ndash;:style="styleCard(item.numOfComments)"&ndash;&gt;-->
                    <!--&lt;!&ndash;&gt;&ndash;&gt;-->
                      <!--&lt;!&ndash;&lt;!&ndash;<a href="" @click.prevent="openDialog(itemSubCategory, index, keyCategory, keySubCategory )" style="text-decoration: none;">&ndash;&gt;&ndash;&gt;-->
                      <!--&lt;!&ndash;<a href="" @click.prevent="showImage(item.id)" style="text-decoration: none;">&ndash;&gt;-->
                        <!--&lt;!&ndash;<v-layout row wrap justify-space-between>&ndash;&gt;-->
                          <!--&lt;!&ndash;<div class="caption">№{{item.shopNumber}}</div>&ndash;&gt;-->
                        <!--&lt;!&ndash;</v-layout>&ndash;&gt;-->
                        <!--&lt;!&ndash;<v-img :src="`${photo_url}/${item.date}/${item.shopId}/${item.fileName}.jpg`" aspect-ratio="1"&ndash;&gt;-->
                               <!--&lt;!&ndash;class="grey lighten-2">&ndash;&gt;-->
                          <!--&lt;!&ndash;<v-layout slot="placeholder" fill-height align-center justify-center ma-0>&ndash;&gt;-->
                            <!--&lt;!&ndash;<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>&ndash;&gt;-->
                          <!--&lt;!&ndash;</v-layout>&ndash;&gt;-->
                        <!--&lt;!&ndash;</v-img>&ndash;&gt;-->
                        <!--&lt;!&ndash;<v-layout column>&ndash;&gt;-->
                          <!--&lt;!&ndash;<div class="caption">{{item.categoryName}}</div>&ndash;&gt;-->
                          <!--&lt;!&ndash;<div class="caption">{{item.categoryName0}}</div>&ndash;&gt;-->
                        <!--&lt;!&ndash;</v-layout>&ndash;&gt;-->
                      <!--&lt;!&ndash;</a>&ndash;&gt;-->
                    <!--&lt;!&ndash;</v-card>&ndash;&gt;-->


                  <!--&lt;!&ndash;</v-flex>&ndash;&gt;-->
                <!--&lt;!&ndash;</v-layout>&ndash;&gt;-->

              <!--</v-card-text>-->
            <!--</v-card>-->
          <!--</v-expansion-panel-content>-->
        <!--</v-expansion-panel>-->

    </v-flex>
  </v-layout>



</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'images-list',
    data () {
      return {
        dialogImageListByCategory: true,

        photo_url: window.photo_url, // todo: убрать из window
        panel: [],
        panelItem:{},


        remadeList: []
      }
    },
    methods: {
      showImage: function(photoId){
        this.$router.push({
          name: "showImage",
          params: Object.assign( {}, this.$route.params),
          query: {
            photoId: photoId
          }
        })
      },
      styleCard: function(numOfComments){
        var str = 'eee'
        if (numOfComments> 0){
          str = '1976d2'
        }
        return {border: '1px dashed #'+str}
      }
    },
    watch: {
      'list': function(newValue){
        // console.log( newValue)
        // var res = {}
        // newValue.map(el=>{
        //   if (!res[el.shopId]){
        //     res[el.shopId] = {}
        //     res[el.shopId].shopNumber = el.shopNumber
        //     res[el.shopId].shopName = el.shopName
        //     res[el.shopId].data = []
        //   }
        //   res[el.shopId].data.push(el)
        // })
        // this.remadeList = res

      }
    },
    computed: {
      ...mapGetters( "master", {
        LOADING: "images_loading",
        list: "images_list"
      })
    }
  }
</script>
