<template>

  <v-card>
    <v-card-title class="pa-0" style="z-index: 10">
      <v-toolbar height="50" light>
        <v-toolbar-title>
          <div class="title pb-0">{{$t('TITLE.' + type)}}</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn @click="$emit('close-dialog')" flat icon color="red">
            <v-icon color="blue">close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-xl text-xs-left class="pr-0">
        <v-layout row wrap >

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.DOCUMENT.gomName')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-autocomplete
              v-on:focus="__getGomList"
              v-model="form.gomId"
              :label="gomNameDefault"
              solo
              dense
              class="mb-1"
              item-text="alias"
              item-value="id"
              hide-details
              :loading="gomList_loading"
              :items="gomList"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.DOCUMENT.categoryName')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-autocomplete
              v-on:focus="__getCategoryList"
              v-model="form.categoryId"
              :label="categoryNameDefault"
              solo
              dense
              class="mb-1"
              item-text="alias"
              item-value="id"
              hide-details
              :loading="categoryList_loading"
              :items="categoryList"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.DOCUMENT.typeName')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-autocomplete
              v-on:focus="__getTypeList"
              v-model="form.typeId"
              :label="typeNameDefault"
              solo
              dense
              class="mb-1"
              item-text="alias"
              item-value="id"
              hide-details
              :loading="typeList_loading"
              :items="typeList"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.DOCUMENT.seasonName')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-autocomplete
              v-on:focus="__getSeasonList"
              v-model="form.seasonId"
              :label="seasonNameDefault"
              solo
              dense
              class="mb-1"
              item-text="alias"
              item-value="id"
              hide-details
              :loading="seasonList_loading"
              :items="seasonList"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.DOCUMENT.langName')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-autocomplete
              v-on:focus="__getLangList"
              v-model="form.langId"
              :label="langNameDefault"
              solo
              dense
              class="mb-1"
              item-text="alias"
              item-value="id"
              hide-details
              :loading="langList_loading"
              :items="langList"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.DOCUMENT.name')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.name" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.DOCUMENT.businessAlias')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-select
              solo
              v-model="form.businessId"
              :items="businessList"
              item-text="alias"
              item-value="id"
              hide-details
            ></v-select>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.DOCUMENT.countryAlias')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-select
              solo
              v-model="form.countryId"
              :items="countriesList"
              item-text="alias"
              item-value="id"
              hide-details
            ></v-select>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.DOCUMENT.expireDate')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                solo
                slot="activator"
                v-model="date"
                readonly
                hide-details
              ></v-text-field>
              <v-date-picker v-model="date" scrollable locale="ru">
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
            <v-checkbox
              :label="`Хранить вечно`"
            ></v-checkbox>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions class="pa-0">
      <v-toolbar height="50" light class="pa-2">
        <v-btn @click="$emit('close-dialog')" dark  color="red">{{$t('BTN.CLOSE')}}</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="save" dark color="green">{{$t('BTN.' + type)}}</v-btn>
      </v-toolbar>
    </v-card-actions>
  </v-card>

</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'admin-document-page-edit',
    props:["selected","type"],
    watch: {
      selected: function(newVal){
        if (newVal.length === 1){
          console.log(newVal )

          this.form.gomId = newVal[0].gomId
               this.gomNameDefault = String(newVal[0].gomName)

          this.form.categoryId = newVal[0].categoryId
            this.categoryNameDefault = String(newVal[0].categoryName)

          this.form.typeId = newVal[0].typeId
            this.typeNameDefault = String(newVal[0].typeName)

          this.form.seasonId = newVal[0].seasonId
            this.seasonNameDefault = String(newVal[0].seasonName)

          this.form.langId = newVal[0].langId
            this.langNameDefault = String(newVal[0].langName)

          this.form.countryId = newVal[0].countryId
          this.form.businessId = newVal[0].businessId

          this.form.name = String(newVal[0].name)
          this.form.id = String(newVal[0].id)

        }
      }
    },
    data: function(){
      return {
        form: {
          id: null,
          gomId: null,
          categoryId: null,
          typeId: null,
          seasonId: null,
          langId: null,
          name: null,
          businessId: null,
          countryId: null
        },
        modal: false,
        date: new Date().toISOString().substr(0, 10),

        gomNameDefault: "", gomList: [], gomList_loading: false,
        categoryNameDefault: "", categoryList: [], categoryList_loading: false,
        typeNameDefault: "", typeList: [], typeList_loading: false,
        seasonNameDefault: "", seasonList: [], seasonList_loading: false,
        langNameDefault: "", langList: [], langList_loading: false
      }
    },
    computed: {
      ...mapGetters('business', {businessList: 'list'}),
      ...mapGetters('countries', {countriesList: 'list'})
    },
    methods:{
      save: function(){
        this.$emit('success-dialog', this.$data.form)

        /*
businessId: null
categoryId: 203592
countryId: null
expireDate: ""
gomId: 203568
id: "204099"
langId: 203585
name: "Cупер_ЗВС_AW1415_осень_жен.zip"
seasonId: 203581
typeId: 203576
        * */


      },
      __getGomList: function(){
        if (this.gomList.length > 0) return false;
        this.gomList_loading = true
        this.$store.dispatch('documentationFilters/get_list_', { type: "gom"}).then( (res) => {
          this.gomList = res
          this.gomList_loading = false
        })
      },
      __getCategoryList: function(){
        if (this.categoryList.length > 0) return false;
        this.categoryList_loading = true
        this.$store.dispatch('documentationFilters/get_list_', { type: "category"}).then( (res) => {
          this.categoryList = res
          this.categoryList_loading = false
        })
      },
      __getTypeList: function(){
        if (this.typeList.length > 0) return false;
        this.typeList_loading = true
        this.$store.dispatch('documentationFilters/get_list_', { type: "types"}).then( (res) => {
          this.typeList = res
          this.typeList_loading = false
        })
      },
      __getSeasonList: function(){
        if (this.seasonList.length > 0) return false;
        this.seasonList_loading = true
        this.$store.dispatch('documentationFilters/get_list_', { type: "seasons"}).then( (res) => {
          this.seasonList = res
          this.seasonList_loading = false
        })
      },
      __getLangList: function(){
        if (this.langList.length > 0) return false;
        this.langList_loading = true
        this.$store.dispatch('documentationFilters/get_list_', { type: "lang"}).then( (res) => {
          this.langList = res
          this.langList_loading = false
        })
      }

    }
  }
  /*
alias: "upload_7892288798803700025.tmp"
businessAlias: "Спортмастер"
businessId: 10000299
categoryId: 203589
categoryName: "Все"
countryAlias: "Россия"
countryId: 17458520011
expireDate: null
fileId: 15068
fileName: "upload_7892288798803700025.tmp"
gomId: 203660
gomName: "Все"
id: 15069
langId: 203585
langName: "Русский"
lastModified: 1428414205773
name: "Оформление тамбуров для палаток.pdf"
seasonId: 203578
seasonName: "Всесезонный"
typeId: 203574
typeName: "Правила презентации (стандарты)"
  * */

</script>
