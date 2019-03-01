<template >

  <div>

    <v-expansion-panel v-model="panel" expand>
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
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'images-list',
    data () {
      return {
        photo_url: window.photo_url, // todo: убрать из window
        panel: [],
        panelItem:{},
      }
    },
    methods: {
      openDialog: function(itemSubCategory, index, keyCategory, keySubCategory){
        this.$emit('image-selected',itemSubCategory, index, keyCategory, keySubCategory)
      }
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
        remadeList: "remade_list"
      })
    }
  }
</script>
