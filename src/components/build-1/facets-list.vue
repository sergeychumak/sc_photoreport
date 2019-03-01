<template>

  <v-layout column>
    <v-flex v-for="item in LIST" class="pr-2 pl-2">
      <template v-if="item.amount > 200">
        <template v-if="item.amount > 100000">
          <v-btn block color="primary" disabled outline>{{item.alias}} [ > 100k ]</v-btn>
        </template>
        <template v-else-if="item.amount > 10000">
          <v-btn block color="primary" disabled outline>{{item.alias}} [ > {{Math.ceil(item.amount/10000)}}k ]</v-btn>
        </template>
        <template v-else-if="item.amount > 1000">
          <v-btn block color="primary" disabled outline>{{item.alias}} [ > {{Math.ceil(item.amount/1000)}}k ]</v-btn>
        </template>
        <template v-else>
          <v-btn block color="primary" disabled outline>{{item.alias}} [ > {{item.amount}} ]</v-btn>
        </template>
      </template>
      <template v-else>
        <template v-if="item.alias==CURRENT_DATE">
          <v-btn
            @click="getImageList(item.alias)"
            :loading="LOADING"
            color="primary"
            dark block
          >{{item.alias}} [ {{item.amount}} ]</v-btn>
        </template>
        <template v-else>
          <v-btn
            @click="getImageList(item.alias)"
            outline
            color="primary"
            dark1 block
          >{{item.alias}} [ {{item.amount}} ]</v-btn>
        </template>
      </template>
    </v-flex>
  </v-layout>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
  name: 'facets-list',
  computed: {
    ...mapGetters( "master", {
      LIST: "facets_list",
      CURRENT_DATE: "facets_current_date",
      LOADING: "images_loading"
    })
  },
  mounted: function(){
    
    if (this.$route.params['date']){
      if (this.$route.params['date'] !== "!") {
        this.getImageList(this.$route.params['date'])
      }
    }
  },
  methods: {
    ...mapActions( "master", {
      set_current_date: "facets_set_current_date",
      get_list_based_on_facet: "images_receive_list"
    }),
    getImageList: function(date){
      this.set_current_date(date).then(()=>{
        this.get_list_based_on_facet().then(()=>{
          this.$router.push({
            name: "showPhotoreport",
            params: Object.assign( {}, this.$route.params, { date: date })
          })
        })
      })
    }
  }
}
</script>
