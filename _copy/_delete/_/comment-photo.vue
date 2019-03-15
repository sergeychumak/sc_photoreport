<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-toolbar height="40">
          <v-toolbar-title class="caption">Комментарии</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list three-line v-if="items.length > 0">
          <template v-for="item in items">
            <v-list-tile
              :key="item.id"
              @click=""
            >
              <v-list-tile-content>
                <v-list-tile-title>
                  <span class="grey--text text--lighten-2">{{item.created}}</span>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <div class='grey--text text--lighten-1'>{{item.authorName}}</div>
                  <div class='text--primary'>{{item.text}}</div>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'comment-photo',
    props: ["activeId"],
    data: function(){
      return {
        items: []
      }
    },
    watch: {
      activeId: function(value){
        this.items = [];
        this.$store.dispatch("commentPhoto/get_list",{photoId:value})
          .then((res)=>{
            this.items = res;
          })
      }
    }
  }
</script>
