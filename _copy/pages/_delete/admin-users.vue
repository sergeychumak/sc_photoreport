<template>
  <div class="app__page" v-table-boolean-type>

    <div class="app__subHeader">
      <v-toolbar height="40" color="white" class="elevation-1">
        <v-icon color="red">person</v-icon>
        <v-toolbar-title>
          <div class="red--text">
            <span class="pr-2">Пользователи</span>
          </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-if="selected.length==1" class="blue--text" flat><span class="caption">Редактировать</span></v-btn>
          <v-btn v-if="selected.length>=1" class="red--text" flat><span class="caption">Удалить</span></v-btn>
          <v-btn class="green--text" flat><span class="caption">Создать</span></v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>

    <div class="app__content overflowAuto " id="scroll-target">
      <div  class="app__content_center overflowClear">
        <v-layout v-scroll:#scroll-target="onScroll" column align-center justify-center class="positionRelative">

          <!--FAKE HEAD-->
          <transition name="fade">
            <div
              class="elevation-15 headFake"
              v-if="showFakeHead"
              :style="{top: offsetTop + 'px'}"
              ref="theadApps"
            >
              <div></div>
              <div v-for="itemHeader in headers">{{ itemHeader.text }}</div>
            </div>
          </transition>

          <!--TABLE-->
          <v-data-table
            :headers="headers"
            :items="data"
            :loading="loading"
            :pagination.sync="pagination"
            hide-actions
            v-model="selected"
          >
            <template slot="headers" slot-scope="props">
              <tr ref="thead">
                <td></td>
                <td v-for="itemHeader in headers" class="positionRelative">
                  <div style="white-space:nowrap;">{{ itemHeader.text }}</div>
                </td>
              </tr>
            </template>
            <template slot="items" slot-scope="props">
              <td>
                <v-checkbox
                  v-model="props.selected"
                  primary
                  hide-details
                ></v-checkbox>
              </td>
              <td v-for="itemHeader in headers" style="white-space:nowrap;">

                <template v-if="itemHeader.type === 'boolean'">
                  {{ props.item[itemHeader.id] ? "Да": "Нет" }}
                </template>
                <template v-else-if="itemHeader.type === 'date'">
                  {{ convertTimeToDate(props.item[itemHeader.id], "DD/MM/YYYY") }}
                </template>
                <template v-else>
                  {{ props.item[itemHeader.id] }}
                </template>

              </td>
            </template>
          </v-data-table>

        </v-layout>
      </div>
    </div>

    <div class="app__subHeader ">

      <v-toolbar class="elevation-1" height="40">
        <v-toolbar-title>
          <div class="caption  teal--text">
            Страница <span class="body-2">{{pagination.page}}</span> из <span class="body-2">{{pages}}</span> / Всего записей: <span class="body-2">{{pagination.totalItems}}</span>
          </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>
          <div class="caption teal--text">записей на странице:</div>
        </v-toolbar-title>
        <v-toolbar-items >
          <v-menu transition="slide-x-transition">
            <v-btn slot="activator" icon flat color="teal">{{pagination.rowsPerPage}}</v-btn>
            <v-list dense>
              <v-list-tile @click="_pagination_change_rowsPerPage(5)"><v-list-tile-title>5</v-list-tile-title></v-list-tile>
              <v-list-tile @click="_pagination_change_rowsPerPage(10)"><v-list-tile-title>10</v-list-tile-title></v-list-tile>
              <v-list-tile @click="_pagination_change_rowsPerPage(25)"><v-list-tile-title>25</v-list-tile-title></v-list-tile>
              <v-list-tile @click="_pagination_change_rowsPerPage(50)"><v-list-tile-title>50</v-list-tile-title></v-list-tile>
              <v-list-tile @click="_pagination_change_rowsPerPage(100)"><v-list-tile-title>100</v-list-tile-title></v-list-tile>
            </v-list>
          </v-menu>
          <v-btn icon flat small color="teal" @click="_pagination_change_page('down')"><v-icon small color="teal">arrow_back_ios</v-icon></v-btn>
          <v-btn icon flat small color="teal" @click="_pagination_change_page('up')"><v-icon small color="teal">arrow_forward_ios</v-icon></v-btn>


        </v-toolbar-items>
      </v-toolbar>


    </div>

  </div>
</template>

<script>
  import { TableBooleanType } from './../directives/TableBooleanType';
  import {convertDate} from "@/mixins/date"
export default {
  name: 'adminUsers-page',
  mixins: [convertDate],
  directives: {
    TableBooleanType
  },
  data () {
    return {
      selected: [],
      pagination: {
        rowsPerPage: 25,
        page: 1
      },
      offsetTop: 0,
      // showFilters: false,
      loading: false,
      headers: [
        {id: 'email', text: this.$t('TABLE.USERS.email')},
        {id: 'name', text: this.$t('TABLE.USERS.name') },
        {id: 'position', text: this.$t('TABLE.USERS.position') },
        {id: 'businessAlias', text: this.$t('TABLE.USERS.businessAlias') },
        {id: 'countryAlias', text: this.$t('TABLE.USERS.countryAlias') },
        {id: 'departmentAlias', text: this.$t('TABLE.USERS.departmentAlias')},
        {id: 'regionAlias', text: this.$t('TABLE.USERS.regionAlias') },
        {id: 'shopAlias', text: this.$t('TABLE.USERS.shopAlias') },
        {id: 'shopNumber', text: this.$t('TABLE.USERS.shopNumber') },
        {id: 'lastVisited', text: this.$t('TABLE.USERS.lastVisited'), type: "date" },
        {id: 'created', text: this.$t('TABLE.USERS.created'), type: "date"},
        { id: 'activated',  text: this.$t('TABLE.USERS.activated') , type: "boolean"}

        // {text: 'alias', id: 'alias'},
        // {text: 'businessId', id: 'businessId'},
        // {text: 'countryId', id: 'countryId'},
        // {text: 'id', id: 'id'},
        // {text: 'departmentId', id: 'departmentId'},
        // {text: 'id', id: 'id'},
        // {text: 'regionId', id: 'regionId'},
        // {text: 'roleId', id: 'roleId'},
        // {text: 'shopId', id: 'shopId'},
        // {text: 'password', id: 'password'},
        // {text: 'name_en', id: 'name_en'},

      ],
      data: []
    }
  },
  mounted: function(){
    this.get_data()
  },
  updated: function(){
    if (this.showFakeHead){
      let
        thead = this.$refs.thead.children,
        theadApps = this.$refs.theadApps.children
      for (let i=0; i<=thead.length-1;i++ ){
        theadApps[i].style.width = thead[i].clientWidth + "px"
      }
    }
  },
  methods: {
    onScroll (e) {
      this.offsetTop = this.offsetTop = e.target.scrollTop
    },
    get_data: function(){
      this.$store.dispatch("api/post_request", {
          url: "user.list",
          data: {
            page: 1,
            start: 0,
            limit: 100,
            sort: [
              {property:"email",direction:"DESC"}
            ]
          }
      }).then((res) => {
        this.pagination = Object.assign({},this.pagination, {
          totalItems: res.data.length
        })
        this.data = res.data
      })
    },
    _pagination_change_rowsPerPage(page){
      this.pagination = Object.assign({},this.pagination, {
        rowsPerPage: page,
        page: 1
      })
    },
    _pagination_change_page(type){
      let number = this.pagination.page;
      switch (type) {
        case "down" :
          number = number - 1
          if (number < 1)
            number = 1
        break
        case "up" :
          number = number + 1
          let countPage = this.pages
          if (number > countPage)
            number = countPage
        break
      }
      this.pagination = Object.assign({},this.pagination, {
        page: number
      })
    }
  },
  computed: {
    showFakeHead: function(){
      return this.offsetTop > 48
    },
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  }
}
</script>
