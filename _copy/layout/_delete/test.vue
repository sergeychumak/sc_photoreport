<template>

  <div id="app">

    <v-app id="inspire">

      <v-navigation-drawer
        v-model="drawer"
        class="grey lighten-3"
        fixed app
      >

        <div class="ma-2 mr-3 ml-3">
          <FilterComponent></FilterComponent>
        </div>




        <v-list dense>
          <v-list-tile @click="$router.push( { name:'listOfDocuments' } )" color="cyan">
            <v-list-tile-action><v-icon color="cyan">list_alt</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title>{{$t('DOCUMENTATION')}}</v-list-tile-title></v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar color="grey lighten-3" fixed app dense>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-menu :nudge-width="100">

          <v-toolbar-title slot="activator" class="mt-0">
            <span>SPORTMASTER</span>
            <v-icon>arrow_drop_down</v-icon>
          </v-toolbar-title>

          <v-list>
            <v-list-tile
              v-for="item in items1"
              :key="item"
              @click=""
            >
            <v-list-tile-title v-text="item"></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-spacer></v-spacer>

        <v-btn icon>
        <v-icon>search</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>

      </v-toolbar>

      <v-content>
        <v-container fluid fill-height class="pa-0 ma-0">
          <v-layout
            justify-center1
            align-center1
          >
            <!--<v-flex>-->

              <!--<div-->
                <!--style="position: absolute; top:0; bottom: 0; left:0; right: 0; overflow: auto;"-->
              <!--&gt;-->
                <router-view
                  style="position: absolute; top:0; bottom: 0; left:0; right: 0; overflow: auto;"
                  ref="rview"></router-view>
              <!--</div>-->

            <!--</v-flex>-->
          </v-layout>
        </v-container>
      </v-content>

      <Snackbar></Snackbar>

    </v-app>

  </div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SnackbarComponents from "@/components/snackbar"
import FilterViewPhotoReportsrComponents from '@/components/v1/filter-view-photo-reports'
import FacetsListComponents from '@/components/facets-list'

import FilterComponent from '@/components/v1/photo-report/filter'

export default {
  name: 'LayoutTest',
  components: {
    Snackbar: SnackbarComponents,
    FilterViewPhotoReports: FilterViewPhotoReportsrComponents,
    FilterComponent: FilterComponent
  },
  data () {
    return {
      drawer: null,

      items1: [
        'All', 'Family', 'Friends', 'Coworkers'
      ],

      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      right: null,






    }
  }

}
</script>


