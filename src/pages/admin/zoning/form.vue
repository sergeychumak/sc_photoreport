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

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.ZONING.name')}}</v-subheader></v-flex>
          <template v-if="type == 'CREATE'">
            <v-flex xs9>
              <input type="file" ref="file"/>
            </v-flex>
          </template>
          <template v-else>

            <v-flex xs9>
              <v-text-field solo v-model="form.name" hide-details></v-text-field>
            </v-flex>
          </template>


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
          fileId: null,
          fileName: null,
          id: null,
          name: null,
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
          this.form.fileId = this.selected[0].fileId
          this.form.fileName = this.selected[0].fileName
          this.form.id = this.selected[0].id
          this.form.name = this.selected[0].name
          this.form.shopId = this.selected[0].shopId

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

    methods:{
      ...mapActions( "regions",     { REGIONS_GET_LIST:     "get_list" }),
      ...mapActions( "departments", { DEPARTMENTS_GET_LIST: "get_list" }),
      ...mapActions( "shops",       { SHOPS_GET_LIST:       "get_list" }),

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
          current_region: current_region
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
          current_region: current_region,
          current_department: current_department
        }).then( res => {
          this.shopsList = res.data
          this.shopsLoading = false
        })
      },
      
      save: function() {
        if (this.dialog_addNewForm){
          this.$emit('success-dialog', {
            shopId: this.shopsCurrentSelected === undefined ? null : this.shopsCurrentSelected,
            file: this.$refs.file
          })
        }else{
          this.$emit('success-dialog', Object.assign(this.form, {
            shopId: this.shopsCurrentSelected === undefined ? null : this.shopsCurrentSelected
          }) )  
        }
          
        
      }
    }
  }
</script>
