<template>

  <v-layout>

    <!--NAME-->
    <div class="isHook">
    <div ref="isHook__Name">
      / <span class="brown--text text--lighten-3">{{$t('TITLE_PAGE.SHOW_PHOTOREPORT')}}</span>
    </div>
    </div>

    <!--ACTION-->
    <div class="isHook">
      <div ref="isHook__Actions">
      </div>
    </div>

    <v-flex shrink1 class="overflowAuto" style="min-width: 200px; max-width: 200px;">
      <v-navigation-drawer permanent width="200">
        <FacetsList></FacetsList>
      </v-navigation-drawer>
    </v-flex>
    <v-flex class="overflowAuto">
      <ImagesList></ImagesList>
    </v-flex>
  </v-layout>
</template>

<script>
  import {mapGetters} from 'vuex'
  import FacetsList from '@/components/build-1/facets-list'
  import ImagesList from '@/components/build-1/image-list'
  export default {
    name: 'ViewPhotoReportPage',
     components: {
      FacetsList: FacetsList,
      ImagesList: ImagesList
    },
    data(){return {
    }},
    watch: {},
    mounted: function(){},
    computed: {
      ...mapGetters( "master", {
        FACETS_CURRENT_DATE: "facets_current_date"
      }),

    },
    updated: function(){
//      this.$emit('sync-content')
    }
  }
</script>
