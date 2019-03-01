<template>
  <div style="width:220px;overflow: auto; height: 100%" class="pa-2">
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
            color="blue"
            dark block
          >{{item.alias}} [ {{item.amount}} ]</v-btn>
        </template>
        <template v-else>
          <v-btn
            @click="click(item.alias)"
            outline
            color="blue"
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
    click: function(date){
      this.SET_CURRENT_DATE(date)
      this.$emit('date-selected')
    }
  }
}
</script>
