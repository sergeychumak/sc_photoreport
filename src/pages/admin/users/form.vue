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

          <!--<v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.businessAlias')}}</v-subheader></v-flex>-->
          <!--<v-flex xs9>-->
            <!--<v-select-->
              <!--solo-->
              <!--v-model="form.businessId"-->
              <!--:items="list_business"-->
              <!--item-text="alias"-->
              <!--item-value="id"-->
              <!--hide-details-->
            <!--&gt;</v-select>-->
          <!--</v-flex>-->

          <!--<v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.countryAlias')}}</v-subheader></v-flex>-->
          <!--<v-flex xs9>-->
            <!--<v-select-->
              <!--solo-->
              <!--v-model="form.countryId"-->
              <!--:items="list_countries"-->
              <!--item-text="alias"-->
              <!--item-value="id"-->
              <!--hide-details-->
            <!--&gt;</v-select>-->
          <!--</v-flex>-->

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.password')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.password" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.regionAlias')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-autocomplete
              :items="regionsList"
              :loading="regionsLoading"
              v-model="regionsCurrentSelected"
              item-text="alias"
              item-value="id"
              class="mb-1"
              solo dense hide-details clearable></v-autocomplete>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.departmentAlias')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-autocomplete
              :items="departmentsList"
              :loading="departmentsLoading"
              v-model="departmentsCurrentSelected"
              item-text="alias"
              item-value="id"
              class="mb-1"
              solo dense hide-details clearable></v-autocomplete>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.shopNumber')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-autocomplete
              :items="shopsList"
              :loading="shopsLoading"
              v-model="shopsCurrentSelected"
              item-text="alias"
              item-value="id"
              class="mb-1"
              solo dense hide-details clearable></v-autocomplete>
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
    data: function(){
      return {

        regionsList: [],
        regionsLoading: false,
        regionsCurrentSelected: null,

        departmentsList: [],
        departmentsLoading: false,
        departmentsCurrentSelected: null,

        shopsList: [],
        shopsLoading: false,
        shopsCurrentSelected: null,

        enableCalculation: false,

        loading: false,

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
      }
    },
    watch: {
      dialog_addNewForm: function(newVal){
        if (newVal) {
          this.fillRegions()
          this.fillDepartments()
          this.fillShops()
        }
      },
      dialog_editForm: function(newVal){
        if (newVal){
          this.form.id = this.selected[0].id
          this.form.email = this.selected[0].email
          this.form.name = this.selected[0].name
          this.form.name_en = this.selected[0].name_en
          this.form.position = this.selected[0].position
          this.form.businessId = parseInt(this.selected[0].businessId)
          this.form.countryId = parseInt(this.selected[0].countryId)
          this.form.password = this.selected[0].password
          this.form.activated = this.selected[0].activated

          // this.regionsCurrentSelected = this.selected[0].regionId
          // this.departmentsCurrentSelected = this.selected[0].departmentId
          // this.shopsCurrentSelected = this.selected[0].shopId


          this.enableCalculation = false

          this.regionsLoading = true
          this.REGIONS_GET_LIST().then( res => {
            this.regionsList = res.data
            this.regionsLoading = false
            this.regionsCurrentSelected = this.selected[0].regionId

            let current_region = this.regionsCurrentSelected === undefined ? null : this.regionsCurrentSelected
            this.departmentsLoading = true
            this.DEPARTMENTS_GET_LIST({
              current_region: current_region
            }).then( res => {
              this.departmentsList = res.data
              this.departmentsLoading = false
              this.departmentsCurrentSelected = this.selected[0].departmentId

              let current_department = this.departmentsCurrentSelected === undefined ? null : this.departmentsCurrentSelected
              this.shopsLoading = true
              this.SHOPS_GET_LIST({
                current_region: current_region,
                current_department: current_department
              }).then( res => {
                this.shopsList = res.data
                this.shopsLoading = false
                this.shopsCurrentSelected = this.selected[0].shopId

                this.enableCalculation = true

              })

            })


          })

          // this.fillRegions()
          // this.fillDepartments()
          // this.fillShops()

        }else{
          let obj = {};
          for (var prop in this.form) { obj[prop] = null }
          this.form = obj
          this.enableCalculation = false
        }
      },
      dialog_addNewForm_ERRORS: function(objectError){
        if ( Object.keys(objectError).length > 0){
          this.errorForm = true
        }else{
          this.errorForm = false
        }
      },
      regionsCurrentSelected: function(){
        if ( this.enableCalculation === false)
          return false;
        if (this.departmentsCurrentSelected !== null){
          this.departmentsCurrentSelected = null
          this.fillDepartments()
        }else{
          this.shopsCurrentSelected = null
          this.fillDepartments()
          this.fillShops()
        }
      },
      departmentsCurrentSelected: function(){
        if ( this.enableCalculation === false)
          return false;

        this.shopsCurrentSelected = null
        this.fillShops()
      }
    },

    computed: {
      ...mapGetters( "master", {
        list_business: "current_business",
        list_countries: "current_countries"
      })
    },
    methods:{

      ...mapActions("master", {
        REGIONS_GET_LIST:     "receive_regions_list",
        DEPARTMENTS_GET_LIST: "receive_departments_list",
        SHOPS_GET_LIST:       "receive_shops_list"
      }),

      save: function(){
        this.$emit( 'success-dialog', Object.assign( this.form, {
          regionId: this.regionsCurrentSelected === undefined ? null : this.regionsCurrentSelected,
          departmentId: this.departmentsCurrentSelected === undefined ? null : this.departmentsCurrentSelected,
          shopId: this.shopsCurrentSelected === undefined ? null : this.shopsCurrentSelected,
          roleId: 100
        } ) )
      },

      fillRegions: function(){
        this.regionsLoading = true
        this.REGIONS_GET_LIST().then( res => {
          this.regionsList = res.data
          this.regionsLoading = false
        })
      },

      fillDepartments: function(){
        let current_region = this.regionsCurrentSelected === undefined ? null : this.regionsCurrentSelected
        this.departmentsLoading = true
        this.DEPARTMENTS_GET_LIST({
          regionId: current_region
        }).then( res => {
          this.departmentsList = res.data
          this.departmentsLoading = false
        })
      },

      fillShops: function(){
        let current_region = this.regionsCurrentSelected === undefined ? null : this.regionsCurrentSelected
        let current_department = this.departmentsCurrentSelected === undefined ? null : this.departmentsCurrentSelected
        this.shopsLoading = true
        this.SHOPS_GET_LIST({
          regionId: current_region,
          departmentId: current_department
        }).then( res => {
          this.shopsList = res.data
          this.shopsLoading = false
        })
      },
      
    }
  }
</script>
