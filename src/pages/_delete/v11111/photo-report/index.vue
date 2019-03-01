<template>

  <v-flex>

    <v-container fluid fill-height class="pa-0 ma-0">

      <v-layout >

        <v-flex v-if="FACET_LIST.length > 0" class="showPhotoreport__facetList elevation-5 grey lighten-3">

          <Facets></Facets>

        </v-flex>

        <v-flex class="showPhotoreport__imageList pa-3">

          <ImageList></ImageList>

        </v-flex>

      </v-layout>

    </v-container>

  </v-flex>

</template>

<script>
  import {mapGetters} from 'vuex'
  import FacetsComponent from '@/components/v1/photo-report/facets'
  import ImageListComponent from '@/components/v1/photo-report/image-list'
  export default {
    components: {
      Facets: FacetsComponent,
      ImageList: ImageListComponent
    },
    computed: {
      ...mapGetters( "facets", {
        FACET_LIST: "list"
      })
    }
  }
</script>
