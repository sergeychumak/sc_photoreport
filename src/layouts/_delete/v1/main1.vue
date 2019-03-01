<template>
  <v-app>



    <VueDragResize
      :isActive="false"
      :w="200" :h="200"
      :sticks="['tm','bm','ml','mr']"
      :parentLimitation="true"
      :isResizable="true"
      :isDraggable="true"
      v-on:resizing="resize"
      v-on:dragging="resize"

    >
      <h3>Hello World!</h3>
      <p>{{ top }} х {{ left }} </p>
      <p>{{ width }} х {{ height }}</p>


      <VueDragResize
        :isActive="false"
        :w="20" :h="20"
        :sticks="['tm','bm','ml','mr']"
        :parentLimitation="true"
        :isResizable="true"
        :isDraggable="true"


      >
       123
      </VueDragResize>


    </VueDragResize>
    <!--<div-->
      <!--class="wrapContainer"-->
      <!--id="app">-->


    <!--</div>-->

  </v-app>
</template>

<script>
  import Vue from 'vue'
  import VueDragResize from 'vue-drag-resize'
  Vue.component('vue-drag-resize', VueDragResize)

  export default {
    name: 'Layout_V1',
    data: function(){
      return {
        mini: false,
        width: 0,
        height: 0,
        top: 0,
        left: 0
      }
    },
    components: {
      VueDragResize
    },
    methods: {
      resize(newRect) {
        this.width = newRect.width;
        this.height = newRect.height;
        this.top = newRect.top;
        this.left = newRect.left;
      }
    }
  }
</script>

<style>

  .wrapContainer {
    position: absolute;
    top: 2px;
    bottom: 2px;
    left:2px;
    right: 2px;
    background-image: url(https://www.demix-sport.com/sportmaster.ru/sm-dev/img/landingphoto.jpg);
    background-size: contain;
    background-position: center center;
    overflow: hidden;
  }

</style>

