<template>
  <div class="pt-1 pb-1 ma-2 mr-3 ml-3" v-if="LIST.length > 0">
    <template v-for="item in LIST">
      <template v-if="item.amount > 200">
        <template v-if="item.amount > 100000">
          <v-btn block color="blue" disabled outline>{{item.alias}} [ > 100k ]</v-btn>
        </template>
        <template v-else-if="item.amount > 10000">
          <v-btn block color="blue" disabled outline>{{item.alias}} [ > {{Math.ceil(item.amount/10000)}}k ]</v-btn>
        </template>
        <template v-else-if="item.amount > 1000">
          <v-btn block color="blue" disabled outline>{{item.alias}} [ > {{Math.ceil(item.amount/1000)}}k ]</v-btn>
        </template>
        <template v-else>
          <v-btn block color="blue" disabled outline>{{item.alias}} [ > {{item.amount}} ]</v-btn>
        </template>
      </template>
      <template v-else>
        <template v-if="item.alias==CURRENT_DATE">
          <v-btn
            @click="click(item.alias)"
            :loading="loading"
            color="primary"
            dark block
          >{{item.alias}} [ {{item.amount}} ]</v-btn>
        </template>
        <template v-else>
          <v-btn
            @click="click(item.alias)"
            outline
            color="primary"
            dark block
          >{{item.alias}} [ {{item.amount}} ]</v-btn>
        </template>

      </template>
    </template>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'facets-list',
    mounted: function(){
      let f = false
      if (this.$route.query && this.$route.query['date']){
        f = true
      }
      if (f){
        this.SET_CURRENT_DATE(this.$route.query['date'])
        this.GET_LIST_BASED_ON_FACET()
      }
    },
    computed: {
      ...mapGetters( "facets", {
        LIST: "list",
        CURRENT_DATE: "current_date"
      }),
      ...mapGetters( "images", {
        loading: "loading"
      }),
    },
    methods: {
      ...mapActions( "facets", {
        SET_CURRENT_DATE: "set_current_date"
      }),
      ...mapActions( "images", {
        GET_LIST_BASED_ON_FACET: "get_list_based_on_facet"
      }),

      click: function(date){
        this.SET_CURRENT_DATE(date)
        this.GET_LIST_BASED_ON_FACET().then(()=>{
          this.$router.push({
            name: "show-photoreport",
            query: Object.assign({},this.$route.query,{date: date})
          })
        })
      }
    }
  }
</script>
