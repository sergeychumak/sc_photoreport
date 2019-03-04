<template >

  <v-layout>
    <v-flex class="ma1-2">
      <Cards
        v-if="!LOADING"
        class="ma-2"
        :list="list"
        v-on:click-card="showImage"
      ></Cards>
    </v-flex>
  </v-layout>

</template>

<script>
  import {mapGetters} from 'vuex'

  import CardsComponents from '@/components/build-1/cards/cards'

  export default {
    name: 'images-list',
    components: {
      Cards: CardsComponents
    },
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
