<template>
  <div class="isTable__footer">
    <v-toolbar class="elevation-1" height="40">
      <v-toolbar-title>
        <div class="caption  teal--text"> {{$t('PAGINATION.PAGE')}} <span class="body-2"> {{pagination.page}} </span>
          {{$t('PAGINATION.OF')}} <span class="body-2"> {{pages}} </span> / {{$t('PAGINATION.TOTAL_RECORDS')}} : <span
            class="body-2"> {{pagination.totalItems}} </span></div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <div class="caption teal--text">{{$t('PAGINATION.RECORDS_ON_PAGE')}}:</div>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-menu transition="slide-x-transition">
          <v-btn slot="activator" icon flat color="teal">{{pagination.rowsPerPage}}</v-btn>
          <v-list dense>
            <v-list-tile @click="__pagination_change_rowsPerPage(5)">
              <v-list-tile-title>5</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="__pagination_change_rowsPerPage(10)">
              <v-list-tile-title>10</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="__pagination_change_rowsPerPage(25)">
              <v-list-tile-title>25</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="__pagination_change_rowsPerPage(50)">
              <v-list-tile-title>50</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn icon flat small color="teal" @click="__pagination_change_page('down')">
          <v-icon small color="teal">arrow_back_ios</v-icon>
        </v-btn>
        <v-btn icon flat small color="teal" @click="__pagination_change_page('up')">
          <v-icon small color="teal">arrow_forward_ios</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    name: 'is-table-footer',
    props: {
      pagination: {
        type: Object,
        default () {
          return {
            rowsPerPage: 25,
            page: 1
          }
        }
      }
    },
    data: function () {
      return {
        selected: [],
        offsetTop: 0
      }
    },
    methods:{},
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
