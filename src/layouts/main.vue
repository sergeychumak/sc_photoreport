<template>
  <v-app>
    <v-progress-circular
      v-if="init"
      width="2"
      class="ma-5"
      color="primary"
      indeterminate
    ></v-progress-circular>
    <template v-else>
      <NavigationDrawer></NavigationDrawer>
      <Toolbar ref="toolbar"></Toolbar>
      <Content ref="content"></Content>
    </template>
  </v-app>
</template>

<script>
  import {mapActions} from 'vuex'
  import { EmitUpdateContent } from "@/utils/emiter/updateContent"
  import NavigationDrawerComponent from '@/components/build-1/main/navigation-drawer'
  import ToolbarComponent from '@/components/build-1/main/toolbar'
  import ContentComponent from '@/components/build-1/main/content'
  export default {
    name: 'master',
    mixins: [EmitUpdateContent],
    components: {
      NavigationDrawer: NavigationDrawerComponent,
      Toolbar: ToolbarComponent,
      Content: ContentComponent
    },
    data: function(){
      return {
        init: true
      }
    },
    mounted: function(){
      this.master_init()
      .then(()=>{
        this.init = false
      })
    },
    methods: {
      ...mapActions( "master" , {
        master_init: "init"
      })
    }
  }
</script>
