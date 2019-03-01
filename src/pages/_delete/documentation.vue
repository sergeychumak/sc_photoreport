<template>
  <div class="vApplication__page">

    <!--NAME-->
    <div ref="isHook__Name">
      / {{$t('LABEL.LIST_OF_DOCUMENTS')}}
    </div>

    <!--ACTION-->
    <div ref="isHook__Actions">
      <v-btn flat small color="error" @click="reset_filters">
        <span class="caption">{{$t('RESET_FILTERS')}}</span>
      </v-btn>
      <v-menu transition="slide-x-transition" v-for="header in headers" v-if="header.inFilter" max-height="300">
        <v-btn flat small slot="activator" class='blue--text' :class="{'green--text': filtersUsed[header.value]}">
          <span class="caption">{{header.text}}</span>
          <v-icon small>arrow_drop_down</v-icon>
        </v-btn>
        <v-list dense>
          <v-list-tile
            v-for="item in filters[header.value]"
            :key="item.id"
            @click="changeFilter(header.value, item.id)"
            :class="{'green--text' : item.id === filtersUsed[header.value]}"
          >
            <v-list-tile-title>{{ item.alias }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

    </div>

    <div class="isTable">
      <div class="isTable__content" id="scroll-target">
        <div class="isTable__contentWrap">

          <v-layout
            v-scroll:#scroll-target="onScroll"
            column
            align-center
            justify-center
            class="isTable__contentLayout"
          >
            <!--FAKE HEAD-->
            <transition name="fade">
              <div
                class="isTable__fakeHeads elevation-15"
                v-if="showFakeHead"
                :style="{top: offsetTop + 'px'}"
                ref="theadApps"
              >
                <div v-for="itemHeader in headers">{{ itemHeader.text }}</div>
              </div>
            </transition>

            <!--TABLE-->
            <v-data-table
              :headers="headers"
              :items="realData"
              hide-actions
              item-key="id"
              :loading="loading"
            >
              <template slot="headers" slot-scope="props">
                <tr ref="thead">
                  <td v-for="itemHeader in headers">
                    <div style="white-space:nowrap;">{{ itemHeader.text }}</div>
                  </td>
                </tr>
              </template>
              <template slot="items" slot-scope="props">
                <tr>
                  <td v-for="itemHeader in headers" style="white-space:nowrap;">
                    <template v-if="itemHeader.type === 'boolean'">
                      {{ props.item[itemHeader.id] ? $t('BTN.YES'): $t('BTN.NO') }}
                    </template>
                    <template v-else-if="itemHeader.type === 'date'">
                      {{ convertTimeToDate(props.item[itemHeader.id], "DD/MM/YYYY") }}
                    </template>
                    <template v-else-if="itemHeader.type === 'file'">
                      <a :href="'/file/download/' + props.item.fileId">{{ props.item[itemHeader.id] }}</a>
                    </template>
                    <template v-else>
                      {{ props.item[itemHeader.id] }}
                    </template>

                  </td>
                </tr>
              </template>
            </v-data-table>

          </v-layout>

        </div>
      </div>
    </div>

    <!--<v-data-table-->
      <!--:headers="headers"-->
      <!--:items="realData"-->
      <!--hide-actions-->
      <!--class="elevation-1"-->
      <!--:loading="loading"-->
    <!--&gt;-->
      <!--<template slot="items" slot-scope="props">-->
        <!--<td><a :href="'/file/download/' + props.item.fileId">{{ props.item.name }}</a></td>-->
        <!--<td>{{ props.item.gomName }}</td>-->
        <!--<td>{{ props.item.categoryName }}</td>-->
        <!--<td>{{ props.item.typeName }}</td>-->
        <!--<td>{{ props.item.seasonName }}</td>-->
        <!--<td>{{ props.item.langName }}</td>-->
        <!--<td>{{ props.item.lastModified_good_view }}</td>-->
        <!--<td>{{ props.item.expireDate }}</td>-->
      <!--</template>-->
    <!--</v-data-table>-->

  </div>
</template>

<template1>
  <div class="app__page">
    <div class="app__subHeader">
      <v-toolbar height="40" color="white" class="elevation-1">
        <v-icon color="blue">local_library</v-icon>
        <v-toolbar-title>
          <div class="blue--text">
            <span class="subheadi1ng pr-2">{{$t('DOCUMENTATION')}}</span>
          </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <template v-if="showFilters" transition="slide-x-transition">
            <v-btn flat color="error" @click="reset_filters"><span class="caption">{{$t('RESET_FILTERS')}}</span>
            </v-btn>
            <v-menu transition="slide-x-transition" v-for="header in headers" v-if="header.inFilter" max-height="300">
              <v-btn flat slot="activator" class='blue--text' :class="{'green--text': filtersUsed[header.value]}">
                <span class="caption">{{header.text}}</span>
                <v-icon small>arrow_drop_down</v-icon>
              </v-btn>
              <v-list dense>
                <v-list-tile
                  v-for="item in filters[header.value]"
                  :key="item.id"
                  @click="changeFilter(header.value, item.id)"
                  :class="{'green--text' : item.id === filtersUsed[header.value]}"
                >
                  <v-list-tile-title>{{ item.alias }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </template>
          <v-btn :class="{'red--text': showFilters, 'blue--text': !showFilters }" icon flat
                 @click="showFilters=!showFilters">
            <!-- Если есть актиыне фильтры когда закрыли фильтр то подсказываем -->
            <v-tooltip bottom v-if="!showFilters && Object.keys(filtersUsed).length>0">
              <span slot="activator"><v-icon color="red">warning</v-icon></span>
              <span>Есть активные фильтры</span>
            </v-tooltip>
            <v-icon v-else>filter_list</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <div class="app__content">
      <!--<div class="app__content_left">1</div>-->
      <div class="app__content_center">

        <v-data-table
          :headers="headers"
          :items="realData"
          hide-actions
          class="elevation-1"
          :loading="loading"
        >
          <template slot="items" slot-scope="props">
            <td><a :href="'/file/download/' + props.item.fileId">{{ props.item.name }}</a></td>
            <td>{{ props.item.gomName }}</td>
            <td>{{ props.item.categoryName }}</td>
            <td>{{ props.item.typeName }}</td>
            <td>{{ props.item.seasonName }}</td>
            <td>{{ props.item.langName }}</td>
            <td>{{ props.item.lastModified_good_view }}</td>
            <td>{{ props.item.expireDate }}</td>
          </template>
        </v-data-table>

      </div>
      <!--<div class="app__content_right">3</div>-->
    </div>
  </div>
</template1>

<script>

import {mapActions ,mapGetters} from 'vuex'

export default {
  name: 'documentation-page',
  data () {
    return {

      showFilters: false,
      loading: true,
      headers: [
        {id: "name", text: this.$t('TABLE_KEY.DOCUMENTATION.NAME_FILE'), type:"file", value: 'name', align: 'left'},
        {id: "gomName", text: this.$t('TABLE_KEY.DOCUMENTATION.GOM'), value: 'gom', align: 'left', inFilter: true},
        {id: "categoryName", text: this.$t('TABLE_KEY.DOCUMENTATION.CATEGORY'), value: 'category', align: 'left', inFilter: true},
        {id: "typeName", text: this.$t('TABLE_KEY.DOCUMENTATION.DOCUMENT_TYPE'), value: 'type', align: 'left', inFilter: true},
        // {id: "seasonName", text: this.$t('TABLE_KEY.DOCUMENTATION.SEASON'), value: 'seasons', align: 'left', inFilter: true},
        {id: "langName", text: this.$t('TABLE_KEY.DOCUMENTATION.LANGUAGE'), value: 'lang', align: 'left', inFilter: true},
        {id: "lastModified_good_view", text: this.$t('TABLE_KEY.DOCUMENTATION.LAST_CHANGE'), value: 'lastModified', align: 'left'},
        {id: "expireDate", text: this.$t('TABLE_KEY.DOCUMENTATION.KEEP_IT_UP'), value: 'expireDate', align: 'left'}
      ],
      data: [],
      data_filter:[],
      filters: {},
      filtersUsed: {},
      offsetTop: 0
    }
  },
  mounted: function(){
    this.get_data()
  },
  methods: {
    get_data: function(){
      Promise.all([
        this.$store.dispatch('documentationFilters/get_list_', { type: "gom"}).then( (res) => {this.filters['gom'] = res}),
        this.$store.dispatch('documentationFilters/get_list_', { type: "category"}).then( (res) => {this.filters['category'] = res}),
        this.$store.dispatch('documentationFilters/get_list_', { type: "types"}).then( (res) => {this.filters['type'] = res}),
        // this.$store.dispatch('documentationFilters/get_list_', { type: "seasons"}).then( (res) => {this.filters['seasons'] = res}),
        this.$store.dispatch('documentationFilters/get_list_', { type: "lang"}).then( (res) => {this.filters['lang'] = res})
      ]).then(() => {

        // console.log( this.CURRENT_LANGUAGE)
        
        //находим id языка
        var idLang = -1;
        this.filters.lang.forEach((el) => {
          if ( el.default_locale ===  this.CURRENT_LANGUAGE ){
            idLang = el.id
          }
        })
        if (idLang !== -1){
           this.$store.dispatch(
             'documentation/get_list',
             { idLang: idLang }
           ).then((res) => {
             this.data = res;
             this.loading = false
           })
        }else{
          console.error("documentation idLang = -1")
        }
      });
    },
    changeFilter: function(nameAttr,valueAttr){
      // меняем массив с фильтрами
      var tmpFilter = this.filtersUsed
      tmpFilter[nameAttr] = valueAttr
      this.filtersUse = Object.assign({}, tmpFilter)
      var key =  Object.keys(this.filtersUsed)

      console.log(this.filtersUsed)
      
      var value = Object.values(this.filtersUsed)
      var i
      var tmpData = this.data.filter((el)=>{

        
        var inFulterCount = 0
        for (i = 0; i <=  key.length-1; i++){

           console.log(el, el[key[i] + 'Id'], value[i])

          if (el[key[i] + 'Id'] === value[i]) inFulterCount++
        }
        return inFulterCount ===  key.length
      })
      this.data_filter = tmpData
    },
    reset_filters: function(){
      this.data_filter = []
      this.filtersUsed = {}
    },
    onScroll (e) {
      this.offsetTop = this.offsetTop = e.target.scrollTop
    }
  },
  computed: {

    ...mapGetters('base', {
      CURRENT_LANGUAGE: 'current_language'
    }),

    ...mapGetters('lang', {
      lang_cookieName: 'cookieName'
    }),
    realData: function(){
      if ( this.data_filter.length > 0 ){
        return this.data_filter
      }
      else {
        if ( Object.keys(this.filtersUsed).length > 0 ) {
          return []
        }else{
          return this.data
        }
      }
    },
    showFakeHead: function () {
      return this.offsetTop > 48
    }
  },
  updated: function(){

    if (this.showFakeHead){
      let
        thead = this.$refs.thead.children,
        theadApps = this.$refs.theadApps.children
      for (let i=0; i<=thead.length-1;i++ ){
        theadApps[i].style.width = thead[i].offsetWidth + "px"
      }
    }

    this.$emit('sync-content')

  },
}
</script>
