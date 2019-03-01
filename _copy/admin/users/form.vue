<template>

  <v-card>
    <v-card-title class="pa-0" style="z-index: 10">
      <v-toolbar height="50" light>
        <v-toolbar-title>
          <div class="title pb-0">
            {{$t('TITLE.' + type)}}
            <v-progress-circular v-if="loading" :size="25" :width="2" color="blue" indeterminate></v-progress-circular>
          </div>
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

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.email')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.email" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.name')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.name" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.name_en')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.name_en" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.position')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.position" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.businessAlias')}}</v-subheader></v-flex>
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

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.countryAlias')}}</v-subheader></v-flex>
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

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.password')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.password" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.regionAlias')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-autocomplete
              v-model="form.regionId"
              solo
              dense
              class="mb-1"
              item-text="alias"
              item-value="id"
              hide-details
              clearable
              :items="regionList"
              :label="$t('TABLE.USERS.regionAlias')"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.departmentAlias')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-autocomplete
              v-model="form.departmentId"
              solo
              dense
              class="mb-1"
              item-text="alias"
              item-value="id"
              hide-details
              clearable
              :items="departmentList"
              :label="$t('TABLE.USERS.departmentAlias')"
              :no-data-text="$t('ERR.ATTEMPT_TO_CHOOSE_DEPARTMENT')"
              :loading="loadingDepartment"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.shopNumber')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-autocomplete
              v-model="form.shopId"
              solo
              dense
              class="mb-1"
              item-text="alias"
              item-value="id"
              hide-details
              clearable
              :items="shopList"
              :label="$t('TABLE.USERS.shopNumber')"
              :no-data-text="noDataTextShop"
              :loading="loadingShop"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.activated')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-checkbox primary hide-details v-model="form.activated"></v-checkbox>
          </v-flex>

          <v-flex xs12>
            <div v-for="item in dialog_addNewForm_ERRORS">
              {{item}}
            </div>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions class="pa-0">
      <v-toolbar height="50" light class="pa-2">
        <v-btn @click="$emit('close-dialog')" dark  color="red">{{$t('BTN.CLOSE')}}</v-btn>
        <v-spacer></v-spacer>
        <template v-if="errorForm">
          <v-btn @click="save" dark color="red">{{$t('BTN.' + type)}}</v-btn>
        </template>
        <template v-else>
          <v-btn @click="save" dark color="green">{{$t('BTN.' + type)}}</v-btn>
        </template>

      </v-toolbar>
    </v-card-actions>
  </v-card>

</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'admin-ruler-page-edit',
    props:["selected","type","dialog_editForm","dialog_addNewForm","dialog_addNewForm_ERRORS"],
    watch: {
      dialog_addNewForm: function(newVal){
        this.fill_list_region().then(()=>{
          this.loading = false
          this.enableCalculation = true
        })
      },
      dialog_editForm: function(newVal){
        if (newVal){
          this.loading = true
          this.form.id = this.selected[0].id
          this.form.email = this.selected[0].email
          this.form.name = this.selected[0].name
          this.form.name_en = this.selected[0].name_en
          this.form.position = this.selected[0].position
          this.form.businessId = parseInt(this.selected[0].businessId)
          this.form.countryId = parseInt(this.selected[0].countryId)
          this.form.password = this.selected[0].password
          this.form.activated = this.selected[0].activated
          this.form.regionId = this.selected[0].regionId
          this.form.departmentId = this.selected[0].departmentId
          this.form.shopId = this.selected[0].shopId

          this.fill_list_region().then(()=>{
            this.loadingDepartment = true
            this.fill_list_department({
              regionId: this.form.regionId
            }).then(()=>{
              this.loadingDepartment = false
              this.loadingShop = true
              this.fill_list_shop({
                regionId: this.form.regionId,
                departmentId: this.form.departmentId
              }).then(()=>{
                this.loadingShop = false
                this.enableCalculation = true
                setTimeout(()=>{
                  this.loading = false
                },1000)
              })
            })
          })
        }else{
          let obj = {};
          for (var prop in this.form) { obj[prop] = null }
          this.form = obj
          this.enableCalculation = false
        }
      },
      "form.regionId": function (value, oldValue) {

        if (!this.enableCalculation) return false

        this.loading = true
        this.form.departmentId = null
        this.form.shopId = null

        this.loadingDepartment = true
        this.fill_list_department({
          regionId: this.form.regionId
        }).then(() => {
          this.loadingDepartment = false
          this.loadingShop = true
          this.fill_list_shop({
            regionId: this.form.regionId,
            departmentId: this.form.departmentId
          }).then(() => {
            this.loadingShop = false
            setTimeout(() => {
              this.loading = false
            }, 1000)
          })
        })

      },
      "form.departmentId": function (value, oldValue) {

        if (!this.enableCalculation)
          return false

        this.loading = true
        this.form.shopId = null

        this.loadingShop = true
        this.fill_list_shop({
          regionId: this.form.regionId,
          departmentId: this.form.departmentId
        }).then(() => {
          this.loadingShop = false
          setTimeout(() => {
            this.loading = false
          }, 1000)
        })

      },
      dialog_addNewForm_ERRORS: function(objectError){
        if ( Object.keys(objectError).length > 0){
          this.errorForm = true
        }else{
          this.errorForm = false
        }
      }
    },
    data: function(){
      return {

        enableCalculation: false,

        loading: true,
        loadingDepartment: false,
        loadingShop: false,

        form: {
          id: null,
          email: null,
          name: null,
          name_en: null,
          position: null,
          businessId: null,
          countryId: null,
          password: null,
          activated: null,
          regionId: null,
          departmentId: null,
          shopId: null
        }
        ,
        errorForm : false
        // showDepartment : false,
        // showShop: false
      }
    },
    computed: {
      ...mapGetters('business' ,      {businessList: 'list'}),
      ...mapGetters('countries' ,     {countriesList: 'list'}),
      ...mapGetters( 'region' ,       {regionList: 'list' } ),
      ...mapGetters( 'department' ,   {departmentList: 'list' } ),
      ...mapGetters( 'shop' ,         {shopList: 'list' } ),
      noDataTextShop: function () {
        if (this.form.departmentId !== null)
          return this.$t('ERR.NO_VALUE_TO_SELECT')
        else
          return this.$t('ERR.ATTEMPT_TO_CHOOSE_SHOP')
      }
    },
    methods:{
      ...mapActions( 'region',      { fill_list_region: 'FILL_LIST' } ),
      ...mapActions( 'department',  { fill_list_department: 'FILL_LIST' } ),
      ...mapActions( 'shop',        { fill_list_shop: 'FILL_LIST' } ),
      save: function(){
        this.$emit( 'success-dialog', Object.assign( this.form, { roleId: 100 } ) )
      }
    }
  }
</script>
