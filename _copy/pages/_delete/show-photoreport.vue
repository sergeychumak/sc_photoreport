<template>
  <div class="app__page">
    <div class="app__subHeader">
      <v-toolbar height="40" color="white" class="elevation-1">
        <v-icon color="teal">photo_album</v-icon>
        <v-toolbar-title >
          <div class="teal--text">
            <span class="pr-02">{{$t('PHOTOREPORT')}}</span>
          </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn small flat color="success" class="caption"><v-icon color="success" class="pr-2">home</v-icon> Мои магазин</v-btn>
          <v-btn small flat color="info" class="caption"><v-icon color="info" class="pr-2">star</v-icon>Только фавориты</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <div class="app__content">
      <div class="app__content_left elevation-0 pa-2">
        <selectCategory></selectCategory>
        <selectRegion></selectRegion>
        <departmentRegion></departmentRegion>
        <shopRegion></shopRegion>
        <facetPhoto></facetPhoto>
        <zoningPhoto></zoningPhoto>
        <vitrinaPhoto></vitrinaPhoto>
      </div>
      <div class="app__content_center elevation-0 pa-2">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  // COMPONENTS
  import selectCategory from '@/components/select-photo-category'
  import selectRegion from '@/components/select-photo-region'
  import departmentRegion from '@/components/select-photo-department'
  import shopRegion from '@/components/select-photo-shop'
  import facetPhoto from '@/components/facets-photo'
  import zoningPhoto from '@/components/zoning-photo'
  import vitrinaPhoto from '@/components/vitrina-photo'

  export default {
    name: 'ShowPhotoreportPage',
    data: function(){
      return {

        isLoading: true,
        list: []
      }
    },
    components: {
      selectCategory: selectCategory,
      selectRegion: selectRegion,
      departmentRegion: departmentRegion,
      shopRegion: shopRegion,
      facetPhoto: facetPhoto,
      zoningPhoto: zoningPhoto,
      vitrinaPhoto: vitrinaPhoto
    }
  }
</script>
