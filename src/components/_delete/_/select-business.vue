<template>
  <v-menu transition="slide-x-transition">
    <v-btn slot="activator" flat><span class="caption">{{currentObject.alias}}</span></v-btn>
    <v-list dense>
      <v-list-tile
        v-for="item in list"
        :key="item.id"
        @click="click(item.id)"
        :class="{'primary--text' : item.id === currentId}"
      >
        <v-list-tile-title>{{ item.alias }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'select-business',
  methods: {
    ...mapActions('business', {
      set_current: 'set_current'
    }),
    click: function(id){
      this.set_current(id)
    }
  },
  computed: {
    ...mapGetters('business' , {
      list: 'list',
      currentObject: 'currentObject',
      currentId:'currentId'
    })
  }
}
</script>
