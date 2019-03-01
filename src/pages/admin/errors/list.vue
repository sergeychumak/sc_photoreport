<template>
  <v-layout>

    <!--NAME-->
    <div class="isHook">
    <div ref="isHook__Name">
      / {{$t('CONTROL.LABEL').toUpperCase()}} / {{$t('CONTROL.ERRORS').toUpperCase()}}
    </div>
    </div>

    <!--ACTION-->
    <div class="isHook">
      <div ref="isHook__Actions">
        <v-progress-circular v-if="loading" :size="25" :width="2" color="blue" indeterminate></v-progress-circular>
        <v-btn v-if="showControlElements" color="primary" small @click="__openDialog_editForm"><span class="caption">{{$t('BTN.EDIT')}}</span></v-btn>
        <v-btn v-if="showControlElements" class="red--text" flat small @click="__openDialog_deleteForm"><span class="caption">{{$t('BTN.DELETE')}}</span></v-btn>
        <v-btn class="green--text" flat small @click="__openDialog_addNewForm"><span class="caption">{{$t('BTN.CREATE')}}</span></v-btn>
      </div>
     </div>


    <v-flex>
      <v-layout column fill-height>
        <v-flex class="overflowAuto">
          <v-data-table
            :headers="headers"
            :items="data"
            hide-actions
            item-key="id"
          >
            <template slot="headers" slot-scope="props">
              <tr ref="thead">
                <td></td>
                <td v-for="itemHeader in headers" @click="setSortBy(itemHeader)" style="cursor: pointer;">
                  <div style="white-space:nowrap;">
                    {{ itemHeader.text }}
                    <v-icon v-if="itemHeader.id===sort.property" flat small>
                      <template v-if="sort.direction==='ASC'">arrow_drop_down</template>
                      <template v-else>arrow_drop_up</template>
                    </v-icon>
                  </div>
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
                <td v-for="itemHeader in headers" style="max-width: 400px">
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
        </v-flex>
        <v-flex>
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
        </v-flex>
      </v-layout>
    </v-flex>

    <!--<div class="isTable">-->
      <!--<div class="isTable__content" id="scroll-target">-->

        <!--<div class="isTable__contentWrap">-->

          <!--<v-layout-->
            <!--v-scroll:#scroll-target="onScroll"-->
            <!--column-->
            <!--align-center-->
            <!--justify-center-->
            <!--class="isTable__contentLayout"-->
          <!--&gt;-->
            <!--&lt;!&ndash;FAKE HEAD&ndash;&gt;-->
            <!--<transition name="fade">-->
              <!--<div-->
                <!--class="isTable__fakeHeads elevation-15"-->
                <!--v-if="showFakeHead"-->
                <!--:style="{top: offsetTop + 'px'}"-->
                <!--ref="theadApps"-->
              <!--&gt;-->
                <!--<div></div>-->
                <!--<div v-for="itemHeader in headers">{{ itemHeader.text }}</div>-->
              <!--</div>-->
            <!--</transition>-->

            <!--&lt;!&ndash;TABLE&ndash;&gt;-->
            <!--<v-data-table-->
              <!--:headers="headers"-->
              <!--:items="data"-->
              <!--hide-actions-->
              <!--item-key="id"-->
            <!--&gt;-->
              <!--<template slot="headers" slot-scope="props">-->
                <!--<tr ref="thead">-->
                  <!--<td></td>-->
                  <!--<td v-for="itemHeader in headers" @click="setSortBy(itemHeader)" style="cursor: pointer;">-->
                    <!--<div style="white-space:nowrap;">-->
                      <!--{{ itemHeader.text }}-->
                      <!--<v-icon v-if="itemHeader.id===sort.property" flat small>-->
                        <!--<template v-if="sort.direction==='ASC'">arrow_drop_down</template>-->
                        <!--<template v-else>arrow_drop_up</template>-->
                      <!--</v-icon>-->
                    <!--</div>-->
                  <!--</td>-->
                <!--</tr>-->
              <!--</template>-->
              <!--<template slot="items" slot-scope="props">-->
                <!--<tr>-->
                  <!--<td>-->
                    <!--<v-checkbox-->
                      <!--@click.stop="add2selected(props.item[nameKeySelected], props.item)"-->
                      <!--:input-value="inSelected(props.item[nameKeySelected])"-->
                      <!--primary-->
                      <!--hide-details-->
                    <!--&gt;</v-checkbox>-->
                  <!--</td>-->
                  <!--<td v-for="itemHeader in headers" style="max-width: 400px">-->
                      <!--<template v-if="itemHeader.type === 'boolean'">-->
                        <!--{{ props.item[itemHeader.id] ? $t('BTN.YES'): $t('BTN.NO') }}-->
                      <!--</template>-->
                      <!--<template v-else-if="itemHeader.type === 'date'">-->
                        <!--{{ convertTimeToDate(props.item[itemHeader.id], "DD/MM/YYYY") }}-->
                      <!--</template>-->
                      <!--<template v-else>-->
                        <!--{{ props.item[itemHeader.id] }}-->
                      <!--</template>-->
                  <!--</td>-->
                <!--</tr>-->
              <!--</template>-->
            <!--</v-data-table>-->

          <!--</v-layout>-->

        <!--</div>-->

      <!--</div>-->

      <!--<v-toolbar class="elevation-1" height="40">-->
        <!--<v-toolbar-title>-->
          <!--<div class="caption  teal&#45;&#45;text"> {{$t('PAGINATION.PAGE')}} <span class="body-2"> {{pagination.page}} </span>-->
            <!--{{$t('PAGINATION.OF')}} <span class="body-2"> {{pages}} </span> / {{$t('PAGINATION.TOTAL_RECORDS')}} : <span-->
              <!--class="body-2"> {{pagination.totalItems}} </span></div>-->
        <!--</v-toolbar-title>-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-toolbar-title>-->
          <!--<div class="caption teal&#45;&#45;text">{{$t('PAGINATION.RECORDS_ON_PAGE')}}:</div>-->
        <!--</v-toolbar-title>-->
        <!--<v-toolbar-items>-->
          <!--<v-menu transition="slide-x-transition">-->
            <!--<v-btn slot="activator" icon flat color="teal">{{pagination.rowsPerPage}}</v-btn>-->
            <!--<v-list dense>-->
              <!--<v-list-tile @click="__pagination_change_rowsPerPage(5)">-->
                <!--<v-list-tile-title>5</v-list-tile-title>-->
              <!--</v-list-tile>-->
              <!--<v-list-tile @click="__pagination_change_rowsPerPage(10)">-->
                <!--<v-list-tile-title>10</v-list-tile-title>-->
              <!--</v-list-tile>-->
              <!--<v-list-tile @click="__pagination_change_rowsPerPage(25)">-->
                <!--<v-list-tile-title>25</v-list-tile-title>-->
              <!--</v-list-tile>-->
              <!--<v-list-tile @click="__pagination_change_rowsPerPage(50)">-->
                <!--<v-list-tile-title>50</v-list-tile-title>-->
              <!--</v-list-tile>-->
            <!--</v-list>-->
          <!--</v-menu>-->
          <!--<v-btn icon flat small color="teal" @click="__pagination_change_page('down')">-->
            <!--<v-icon small color="teal">arrow_back_ios</v-icon>-->
          <!--</v-btn>-->
          <!--<v-btn icon flat small color="teal" @click="__pagination_change_page('up')">-->
            <!--<v-icon small color="teal">arrow_forward_ios</v-icon>-->
          <!--</v-btn>-->
        <!--</v-toolbar-items>-->
      <!--</v-toolbar>-->

    <!--</div>-->

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
      <YesOrNo
        :dialogYesOrNo.sync="dialog_deleteForm"
        v-on:click-yes="__successDialog_deleteForm"
      ></YesOrNo>
    </v-dialog>

  </v-layout>

</template>


<script>
  import editForm from './form'
  import {convertDate} from "@/mixins/date"
  import {adminList} from '@/mixins/admin-list'
  import YesOrNo from '@/components/dialogs/yes-or-no'

  export default {
    name: 'admin-errors-page',
    mixins: [ convertDate, adminList ],
    components: {
      editForm: editForm,
      YesOrNo: YesOrNo
    },
    mounted: function(){
      this.get_data()
    },
    data () {
      const key = "errors"
      const keyLang = "errors"
      return {
        key: key,
        nameKeySelected: 'id',
        headers: [
          {id: 'id', text: this.$t('TABLE.' + keyLang.toUpperCase()          + '.id' )},
          {id: 'active', text: this.$t('TABLE.' + keyLang.toUpperCase()          + '.active' )},
          {
            id: 'labelRu',
            text: this.$t('TABLE.' + keyLang.toUpperCase()          + '.labelRu' ),
            maxWidth: 300
          },
          {id: 'labelEn', text: this.$t('TABLE.' + keyLang.toUpperCase()          + '.labelEn' )},
          {id: 'labelZh', text: this.$t('TABLE.' + keyLang.toUpperCase()          + '.labelZh' )},
          {id: 'equipmentText', text: this.$t('TABLE.' + keyLang.toUpperCase()         + '.equipmentId' )},
          // {id: 'locationText', text: this.$t('TABLE.' + keyLang.toUpperCase()         + '.locationId' )},
          {id: 'order', text: this.$t('TABLE.' + keyLang.toUpperCase()         + '.order' )}
        ],
        sort: {
          property: "order",
          direction: "ASC"
        }
      }
    }
  }
</script>
