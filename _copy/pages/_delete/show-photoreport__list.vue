<template>
  <v-card>
    <v-container grid-list-sm fluid>
      <v-layout row wrap>
        <v-flex
          v-for="(item,index) in list"
          :key="item.id"
          xs3
          d-flex
        >

            <v-card flat1 tile class="d-1flex ma-2 overflow-hidden">
              <a href="" @click.prevent="openDialog(item.id, index)" style="text-decoration: none;"  >
                <v-card-title class="caption ma-1 pa-0 overflow-hidden">
                  <div class="black--text">{{item.date}} / {{item.shopNumber}}</div>
                  <v-spacer></v-spacer>
                  <div v-if="item.numOfComments>0"><v-icon small color="blue">comment</v-icon></div>
                </v-card-title>
                <v-img
                  :src="`${photo_url}/${item.date}/${item.shopId}/tn/${item.fileName}.jpg`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <v-progress-circular indeterminate :width="1" color="blue"></v-progress-circular>
                  </v-layout>
                </v-img>
                <v-card-actions class="caption ma-1 mr-2 pa-0 overflow-hidden">
                  <div class="text-no-wrap pl-1 black--text">{{item.categoryName}}</div>
                </v-card-actions>
              </a>
            </v-card>

        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <photoreportListDialog
        v-on:close-dialog="closeDialog"
        :list="list"
        :activeId.sync="activeIdInDialog"
        :activeIndex.sync="activeIndexInDialog"
      ></photoreportListDialog>
    </v-dialog>
  </v-card>
</template>

<script>
  import {mapActions} from 'vuex'
  import photoreportListDialog from '@/pages/show-photoreport__list_dialog'

  export default {
    name: 'ShowPhotoreportListPage',
    components: {
      photoreportListDialog: photoreportListDialog
    },
    data: function(){
      return {
        photo_url: window.photo_url, // todo: убрать из window
        dialog: false,
        list: [],
        activeIdInDialog: -1, // для первого выделения в Диаллоге,
        activeIndexInDialog: -1 // для первого выделения в Диаллоге,
      }
    },
    mounted: function(){
      this.load_data()
    },
    methods: {
      ...mapActions('listPhoto', {get_list: 'get_list'}),
      load_data: function(){
        this.get_list({
          idShop: this.$route.params.id,
          date: this.$route.params.date
        }).then((res) => {
          this.list = res
        })
      },
      openDialog: function(id, index){
        this.activeIdInDialog = id
        this.activeIndexInDialog = index
        this.dialog = true
      },
      closeDialog: function () {
        this.dialog = false
      }
    },
    watch: {
      '$route.params.id': function () { this.load_data() },
      '$route.params.date': function () { this.load_data() }
    }
  }
</script>
