<template>
  <div class="vApplication__page">

    <!--NAME-->
    <div ref="isHook__Name">
      / {{$t('CONTROL.LABEL').toUpperCase()}} / {{$t('CONTROL.USERS').toUpperCase()}}
    </div>

    <!--ACTION-->
    <div ref="isHook__Actions">
      <v-progress-circular v-if="loading" :size="25" :width="2" color="blue" indeterminate></v-progress-circular>
      <v-btn v-if="showControlElements" color="primary" small @click="__openDialog_editForm"><span class="caption">{{$t('BTN.EDIT')}}</span></v-btn>
      <v-btn v-if="showControlElements" class="red--text" flat small @click="__openDialog_deleteForm"><span class="caption">{{$t('BTN.DELETE')}}</span></v-btn>
      <v-btn class="green--text" flat small @click="__openDialog_addNewForm"><span class="caption">{{$t('BTN.CREATE')}}</span></v-btn>
    </div>


    <!--<div class="vApplication__page">-->
      <!--<v-container fluid fill-height class="ma-0 pa-0">-->
        <!--<v-layout row class="ma-0 pa-0" fluid wrap>-->
          <!--<v-flex style="width:100%; overflow: auto">-->
            <!--<v-card flat tile class="pa-0 ma-0">-->

            <!--</v-card>-->
          <!--</v-flex>-->
        <!--</v-layout>-->
      <!--</v-container>-->
    <!--</div>-->





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
                <div></div>
                <div v-for="itemHeader in headers">{{ itemHeader.text }}</div>
              </div>
            </transition>

            <!--TABLE-->
            <v-data-table
              :headers="headers"
              :items="data"
              hide-actions
              item-key="id"
            >
              <template slot="headers" slot-scope="props">
                <tr ref="thead">
                  <td></td>
                  <td v-for="itemHeader in headers">
                    <div style="white-space:nowrap;">{{ itemHeader.text }}</div>
                  </td>
                </tr>
              </template>
              <template slot="items" slot-scope="props">
                <tr>
                  <td>
                    <v-checkbox
                      @click.stop="add2selected(props.item[nameKeySelected], props.item)"
                      :input-value="inSelected(props.item[nameKeySelected])"
                      primary
                      hide-details
                    ></v-checkbox>
                  </td>
                  <td v-for="itemHeader in headers" style="white-space:nowrap;">
                    <template v-if="itemHeader.type === 'boolean'">
                      {{ props.item[itemHeader.id] ? $t('BTN.YES'): $t('BTN.NO') }}
                    </template>
                    <template v-else-if="itemHeader.type === 'date'">
                      {{ convertTimeToDate(props.item[itemHeader.id], "DD/MM/YYYY") }}
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

    <!--ADD FORM-->
      <v-dialog v-model="dialog_addNewForm" persistent scrollable max-width="600">
        <editForm
          v-on:close-dialog="__closeDialog_addNewForm"
          v-on:success-dialog="__successDialog_addNewForm"
          :dialog_addNewForm="dialog_addNewForm"
          :dialog_addNewForm_ERRORS="dialog_addNewForm_ERRORS"
          :type="'CREATE'"
        ></editForm>
      </v-dialog>

    <!--EDIT FORM-->
      <v-dialog v-model="dialog_editForm"  persistent scrollable max-width="600">
        <editForm
          v-on:close-dialog="__closeDialog_editForm"
          v-on:success-dialog="__successDialog_editForm"
          :selected="selectedItemsObj"
          :dialog_editForm="dialog_editForm"
          :type="'EDIT'"
        ></editForm>
      </v-dialog>

    <!--DELETE FORM-->
      <v-dialog v-model="dialog_deleteForm" persistent scrollable max-width="350">
        <v-card>
          <v-card-title class="headline red--text">Вы действительно хотите удалить запись?</v-card-title>
          <v-card-actions>
            <v-btn color="green darken-1" dark @click="__closeDialog_deleteForm">{{$t('BTN.CLOSE')}}</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" dark @click="__successDialog_deleteForm">{{$t('BTN.YES')}} {{$t('BTN.DELETE')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

  </div>

</template>


<script>
  import editForm from './form'
  import {convertDate} from "@/mixins/date"

  export default {
    name: 'admin-user-page',
    mounted: function(){
      this.get_data()
    },
    mixins: [ convertDate],
    components: {
      editForm: editForm
    },
    data () {
      const key = "users"
      return {
        key: key,
        nameKeySelected: 'id',
        headers: [
          {id: 'email', text: this.$t('TABLE.' + key.toUpperCase()  + '.email')},
          {id: 'name', text: this.$t('TABLE.' + key.toUpperCase()  + '.name') },
          {id: 'position', text: this.$t('TABLE.' + key.toUpperCase()  + '.position') },
          {id: 'businessAlias', text: this.$t('TABLE.' + key.toUpperCase()  + '.businessAlias') },
          {id: 'countryAlias', text: this.$t('TABLE.' + key.toUpperCase()  + '.countryAlias') },
          {id: 'departmentAlias', text: this.$t('TABLE.' + key.toUpperCase()  + '.departmentAlias')},
          {id: 'regionAlias', text: this.$t('TABLE.' + key.toUpperCase()  + '.regionAlias') },
          {id: 'shopAlias', text: this.$t('TABLE.' + key.toUpperCase()  + '.shopAlias') },
          {id: 'shopNumber', text: this.$t('TABLE.' + key.toUpperCase()  + '.shopNumber') },
          {id: 'lastVisited', text: this.$t('TABLE.' + key.toUpperCase()  + '.lastVisited'), type: "date" },
          {id: 'created', text: this.$t('TABLE.' + key.toUpperCase()  + '.created'), type: "date"},
          { id: 'activated',  text: this.$t('TABLE.' + key.toUpperCase()  + '.activated') , type: "boolean"}
        ],
        data: [],
        loading: false,
        pagination: {
          rowsPerPage: 25,
          page: 1
        },
        selectedItemsIds: [],
        selectedItemsObj: [],
        offsetTop: 0,
        showControlElements: false,

        dialog_editForm: false,
        dialog_deleteForm: false,
        dialog_addNewForm: false,

        dialog_addNewForm_ERRORS: {}

      }
    },
    methods: {

      get_data: function(){
          this.loading = true
          this.$store.dispatch("api/post_request", {
            url: this.key + ".list",
            data: {
              page: this.pagination.page,
              start: this.pagination.rowsPerPage * ( this.pagination.page - 1 ),
              limit: this.pagination.rowsPerPage
            }
          }).then((res) => {

            setTimeout(()=>{
              this.loading = false
            },1000)

            this.pagination = Object.assign({},this.pagination, {
              totalItems: res.total
            })
            this.data = res.data

          })
      },

      onScroll (e) {
        this.offsetTop = this.offsetTop = e.target.scrollTop
      },

      add2selected: function(id,obj){
        var index = this.selectedItemsIds.indexOf(id);
        if (index !== -1) {
          this.selectedItemsIds.splice(index, 1);
          this.selectedItemsObj.splice(index, 1);
        }else{
          if (this.multipleSelect){
            this.selectedItemsIds.push(id)
            this.selectedItemsObj.push(obj)
          }else{
            this.selectedItemsIds = [id]
            this.selectedItemsObj = [obj]
          }
        }
        this.showControlElements = this.selectedItemsIds.length > 0
      },

      inSelected: function(val){
        if (this.multipleSelect){
          return this.selectedItemsIds.includes(val)
        }else{
          return val === this.selectedItemsIds[0]
        }
      },

      // Закрытие диалогов
      __closeDialog_editForm: function ()   { this.dialog_editForm = false    },
      __closeDialog_deleteForm: function () { this.dialog_deleteForm = false  },
      __closeDialog_addNewForm: function () { this.dialog_addNewForm = false  },

      // Открытие диалогов
      __openDialog_editForm: function ()    { this.dialog_editForm = true     },
      __openDialog_deleteForm: function ()  { this.dialog_deleteForm = true   },
      __openDialog_addNewForm: function ()  { this.dialog_addNewForm = true   },

      // __openDialog: function(type,f){
      //   this['dialog_' + type + 'Form'] = f
      // },

      // Ответ от диалога
      __successDialog_editForm: function (data) {
        this.dialog_editForm = false
        this.loading = true
        this.$store.dispatch("api/post_request_clear", {
          url: this.key + ".update",
          data: data
        }).then(() => {
          this.get_data();
        })
      },
      __successDialog_deleteForm: function () {
        this.dialog_deleteForm = false
        this.loading = true
        this.$store.dispatch("api/post_request_clear", {
          url: this.key + ".delete",
          data: this.selectedItemsObj[0]
        }).then(() => {
          this.selectedItemsIds = []
          this.selectedItemsObj = []
          this.get_data();
        })
      },
      __successDialog_addNewForm: function (data) {

        this.dialog_addNewForm_ERRORS = {}
        this.$store.dispatch("api/post_request_clear", {
          url: this.key + ".create",
          data: data
        }).then(() => {
          this.dialog_addNewForm = false
          this.get_data();
        }).catch((res) => {
          this.dialog_addNewForm_ERRORS = res.errors
        })


      },

      __pagination_change_rowsPerPage(page){
        this.pagination = Object.assign({},this.pagination, {
          rowsPerPage: page,
          page: 1
        })
        this.get_data()
      },
      __pagination_change_page(type){
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
        this.get_data()
      }

    },
    computed: {
      showFakeHead: function () {
        return this.offsetTop > 48
      },
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
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
