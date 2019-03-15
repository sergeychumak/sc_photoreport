<template>
  <div class="vApp">
    <div class="app__wrapper">
      <div class="app__header">
        <v-toolbar height="50" light>
          <v-toolbar-title>
            <div class="title pb-0">Просмотр фотографий <!--{{active_id}} - {{active_index}}--></div>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat color="teal" @click="slide2Back">
              <v-icon color="teal">arrow_back_ios</v-icon>
            </v-btn>
            <v-btn flat color="teal" @click="slide2Forward">
              <v-icon color="teal">arrow_forward_ios</v-icon>
            </v-btn>
            <v-btn @click="$emit('close-dialog')" flat color="blue">
              <v-icon color="blue">close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </div>
      <div class="app__page">
        <!--<div class="app__subHeader"></div>-->
        <div class="app__content">
          <div class="app__content_left app__content_left_small" ref="container">

            <annotations width="600" height="600" :minSize="minSize" :grid="grid" :inertia="inertia" :multipleSelect="multipleSelect">
              <circle class="stroke" slot="annotation" cx="150" cy="150" r="100" />
              <circle class="stroke" slot="annotation" cx="300" cy="300" r="100" />
            </annotations>


            <div
              v-for="(item,index) in list"
              :key="item.id">
              <v-card
                tile
                class="ma-2 overflow-hidden"
                :ref="'img-item-'+item.id"
                :class="{'blue lighten-3' : active_id === item.id }"
              >
                <a href="" @click.prevent="active_id=item.id; active_index=index" style="text-decoration: none;">
                  <v-card-title class="caption ma-1 pa-0 overflow-hidden">
                    <div class="black--text">{{item.date}} / {{item.shopNumber}}</div>
                    <v-spacer></v-spacer>
                    <div v-if="item.numOfComments>0">
                      <v-icon small color="blue">comment</v-icon>
                    </div>
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
                  <v-card-actions class="caption ma-1 pa-0 overflow-hidden">
                    <div class="text-no-wrap pl-1 black--text">{{item.categoryName}}</div>
                  </v-card-actions>
                </a>
              </v-card>
            </div>
          </div>

          <div class="app__content_center pt-3 pl-3"><v-img :src="active_src">

            <div class="pa-3">
              <v-icon>information</v-icon>
            </div>
          </v-img></div>

          <div class="app__content_right pa-3">
            <commentPhoto :activeId="active_id"></commentPhoto>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Annotator from '@/components/Annotator'


  import commentPhoto from '@/components/comment-photo'
  export default {
    name: 'ShowPhotoreportListDialogPage',
    props: ["list", "activeId", "activeIndex"],
    components: {
      commentPhoto: commentPhoto,
      annotations: Annotator
    },
    data() {
      return {

        minSize: number('minimum diameter', 50),
        grid: [number('gird width', 0), number('gird height', 0)],
        inertia: boolean('enable inertia', true),
        multipleSelect: boolean('enable multiple select', false),


        photo_url: window.photo_url, // todo: убрать из window
        active_id: this.$props.activeId,
        active_index: this.$props.activeIndex,
        active_src: ""
      }
    },
    watch: {
      "activeId": function (value) {
        this.active_id = value
      },
      "activeIndex": function (value) {
        this.active_index = value
        this.scroll2Image()
      },
      "active_index": function(value){
        let obj = this.$props.list[value];
        this.active_src = this.photo_url + "/" + obj.date + "/" + obj.shopId + "/" + obj.fileName + ".jpg"
      }
    },
    methods: {
      slide2Back: function(){
        this.active_index = this.active_index - 1
        if (this.active_index < 0) this.active_index = 0
        this.active_id = this.$props.list[this.active_index].id
        this.scroll2Image()
        this.$emit('update:activeIndex', this.active_index)
      },
      slide2Forward: function(){
        this.active_index = this.active_index + 1
        if (this.active_index > this.$props.list.length - 1) this.active_index = this.$props.list.length - 1
        this.active_id = this.$props.list[this.active_index].id
        this.scroll2Image()
        this.$emit('update:activeIndex', this.active_index)
      },
      scroll2Image: function(){
        let container = this.$refs.container;
        let id = this.$props.list[this.active_index].id
        container.scrollTop = this.$refs['img-item-' +  id][0].$el.offsetTop - Math.ceil(container.clientHeight / 2) + 100
      }
    }
  }
</script>
