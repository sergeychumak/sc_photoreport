<template>
  <div class="app__page">

    <div class="app__subHeader">
      <v-toolbar height="40" color="white" class="elevation-1">
        <v-icon color="red">{{ico}}</v-icon>
        <v-toolbar-title>
          <div class="red--text">
            <span class="pr-2">{{$t('TABLE._name_.' + key.toUpperCase())}}</span>
          </div>

        </v-toolbar-title>
        <v-progress-circular v-show="loading" :size="20" :width="1" color="red" class="pl-2" indeterminate></v-progress-circular>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-if="selected.length==1" class="blue--text" flat @click="__openDialog_editForm"><span class="caption">{{$t('BTN.EDIT')}}</span></v-btn>
          <v-btn v-if="selected.length>=1" class="red--text" flat @click="__openDialog_deleteForm"><span class="caption">{{$t('BTN.DELETE')}}</span></v-btn>
          <v-btn class="green--text" flat @click="__openDialog_addNewForm"><span class="caption">{{$t('BTN.CREATE')}}</span></v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>

    <div class="app__content overflowAuto " id="scroll-target">
      <div  class="app__content_center overflowClear">
        <v-layout v-scroll:#scroll-target="onScroll" column align-center justify-center class="positionRelative wrapTable">

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
            hide-actions
            v-model="selected"
            item-key="id"
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
              <tr>
                <td>
                  <v-checkbox
                    v-model="props.selected"
                    primary
                    hide-details
                  ></v-checkbox>
                </td>
                <td v-for="itemHeader in headers" style="white-space:nowrap;">
                  <template v-if="itemHeader.type === 'boolean'">
                    {{ props.item[itemHeader.id] ? $t('YES'): $t('NO') }}
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

    <div class="app__subHeader ">
      <v-toolbar class="elevation-1" height="40">
        <v-toolbar-title>
          <div class="caption  teal--text">
            {{$t('PAGINATION.PAGE')}} <span class="body-2">{{pagination.page}}</span> {{$t('PAGINATION.OF')}} <span class="body-2">{{pages}}</span> / {{$t('PAGINATION.TOTAL_RECORDS')}}: <span class="body-2">{{pagination.totalItems}}</span>
          </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>
          <div class="caption teal--text">{{$t('PAGINATION.RECORDS_ON_PAGE')}}:</div>
        </v-toolbar-title>
        <v-toolbar-items >
          <v-menu transition="slide-x-transition">
            <v-btn slot="activator" icon flat color="teal">{{pagination.rowsPerPage}}</v-btn>
            <v-list dense>
              <v-list-tile @click="__pagination_change_rowsPerPage(5)"><v-list-tile-title>5</v-list-tile-title></v-list-tile>
              <v-list-tile @click="__pagination_change_rowsPerPage(10)"><v-list-tile-title>10</v-list-tile-title></v-list-tile>
              <v-list-tile @click="__pagination_change_rowsPerPage(25)"><v-list-tile-title>25</v-list-tile-title></v-list-tile>
              <v-list-tile @click="__pagination_change_rowsPerPage(50)"><v-list-tile-title>50</v-list-tile-title></v-list-tile>
            </v-list>
          </v-menu>
          <v-btn icon flat small color="teal" @click="__pagination_change_page('down')"><v-icon small color="teal">arrow_back_ios</v-icon></v-btn>
          <v-btn icon flat small color="teal" @click="__pagination_change_page('up')"><v-icon small color="teal">arrow_forward_ios</v-icon></v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>

    <!--EDIT FORM-->
    <v-dialog v-model="dialog_editForm" persistent scrollable max-width="600">
      <editForm
        v-on:close-dialog="__closeDialog_editForm"
        v-on:success-dialog="__successDialog_editForm"
        :selected="selected"
        :type = "'EDIT'"
      ></editForm>
    </v-dialog>
    <!--DELETE FORM-->
    <v-dialog v-model="dialog_deleteForm" persistent scrollable max-width="350">
      <v-card>
        <v-card-title class="headline red--text">Вы действительно хотите удалить запись?</v-card-title>
        <v-card-actions>
          <v-btn color="green darken-1" dark @click="__closeDialog_deleteForm">{{$t('BTN.CLOSE')}}</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" dark @click="__successDialog_deleteForm">{{$t('YES')}} {{$t('BTN.DELETE')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--ADD FORM-->
    <v-dialog v-model="dialog_addNewForm" persistent scrollable max-width="600">
      <editForm
        v-on:close-dialog="__closeDialog_addNewForm"
        v-on:success-dialog="__successDialog_addNewForm"
        :type = "'CREATE'"
      ></editForm>
    </v-dialog>

  </div>
</template>


<script>
  import editForm from './form'
  import { listMixin } from './../listMixin'
  export default {
    name: 'admin-document-types-page',
    mixins: [listMixin],
    components: {
      editForm: editForm
    },
    data () {
      const key = "document_types"
      return {
        key: key,
        ico: "loyalty",
        headers: [
          {id: 'name', text: this.$t('TABLE.' + key.toUpperCase()            + '.name' )},
          {id: 'name_en', text: this.$t('TABLE.' + key.toUpperCase()         + '.name_en' )},
          {id: 'name_zh', text: this.$t('TABLE.' + key.toUpperCase()         + '.name_zh' )}
        ]
      }
    }
  }
</script>
