<template>
  <div>

    <span class="caption grey-text">{{$t('LINES')}}</span>
    <v-autocomplete
      v-if="linesList.length>0"
      :items="linesList"
      :loading="linesLoading"
      v-model="linesCurrentSelected"
      item-text="alias"
      item-value="id"
      class="mb-1"
      solo dense hide-details clearable></v-autocomplete>

    <span class="caption grey-text">{{$tc('CATEGORY',2)}}</span>
    <v-autocomplete
      :items="categoriesList"
      :loading="categoriesLoading"
      v-model="categoriesCurrentSelected"
      item-text="alias"
      item-value="id"
      class="mb-1"
      solo dense hide-details clearable></v-autocomplete>

    <span class="caption grey-text">{{$tc('REGION',2)}}</span>
    <v-autocomplete
      :items="regionsList"
      :loading="regionsLoading"
      v-model="regionsCurrentSelected"
      item-text="alias"
      item-value="id"
      class="mb-1"
      solo dense hide-details clearable></v-autocomplete>

    <span class="caption grey-text">{{$tc('DEPARTMENT',2)}}</span>
    <v-autocomplete
      :items="departmentsList"
      :loading="departmentsLoading"
      v-model="departmentsCurrentSelected"
      item-text="alias"
      item-value="id"
      class="mb-1"
      solo dense hide-details clearable></v-autocomplete>

    <span class="caption grey-text">{{$tc('SHOP',2)}}</span>
    <v-autocomplete
      :items="shopsList"
      :loading="shopsLoading"
      v-model="shopsCurrentSelected"
      item-text="alias"
      item-value="id"
      class="mb-1"
      solo dense hide-details clearable></v-autocomplete>

    <v-btn
      class="mt-2"
      color="primary"
      block @click="apply"
      :loading="loading"
      :disabled="loading"
    >{{$t('BTN.APPLY')}}</v-btn>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  name: 'filter-view-photo-reports',
  data: function(){
    return {

      linesList: [],
      linesLoading: false,
      linesCurrentSelected: null,

      categoriesList: [],
      categoriesLoading: false,
      categoriesCurrentSelected: null,

      regionsList: [],
      regionsLoading: false,
      regionsCurrentSelected: null,

      departmentsList: [],
      departmentsLoading: false,
      departmentsCurrentSelected: null,

      shopsList: [],
      shopsLoading: false,
      shopsCurrentSelected: null,


      watchEnabled: true

    }
  },
  watch:{
    linesCurrentSelected: function(){

      if (!this.watchEnabled)
        return false

      this.categoriesCurrentSelected = null
      this.fillCategories()
    },
    regionsCurrentSelected: function(){

      if (!this.watchEnabled)
        return false

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

      if (!this.watchEnabled)
        return false

      this.shopsCurrentSelected = null
      this.fillShops()
    }
  },
  mounted: function(){

    Promise.all([
      this.fillLines(),
      this.fillCategories(),
      this.fillRegions(),
      this.fillDepartments(),
      this.fillShops()
    ]).then(()=>{

      this.watchEnabled = false
      this.linesCurrentSelected = parseInt(this.$route.params.line)
      this.categoriesCurrentSelected = parseInt(this.$route.params.category)
      this.regionsCurrentSelected = parseInt(this.$route.params.region)
      this.departmentsCurrentSelected = parseInt(this.$route.params.department)
      this.shopsCurrentSelected = parseInt(this.$route.params.shop)
      var runApply = false
      Object.keys(this.$route.params).map((el)=>{
        var value = this.$route.params[el]
        if (!isNaN(parseFloat(value)) && isFinite(value))
          runApply = true
      })
      this.$nextTick(function () {
        this.watchEnabled = true
        if (runApply){
          if (this.$route.params.date){
            this.SET_CURRENT_DATE(this.$route.params.date).then(()=>{
              this.FASETS_GET_LIST(Object.assign({}, this.$route.params, this.resultData))
              this.set_images_list([])
            })
          }else{
            this.apply()
          }
        }
      })
    })
  },
  methods: {
    ...mapActions( "master",     {
      REGIONS_GET_LIST:     "receive_regions_list",
      DEPARTMENTS_GET_LIST: "receive_departments_list",
      SHOPS_GET_LIST:       "receive_shops_list",
      LINES_GET_LIST:       "receive_lines_list",
      CATEGORIES_GET_LIST:  "receive_category_list",
      FASETS_GET_LIST:      "receive_facets_list",
      SET_CURRENT_DATE: "facets_set_current_date",
      set_images_list: "set_images_list"
    }),


    __isInt: function(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    },
    fillLines: function(){
      return new Promise(resolve =>{
        this.linesLoading = true
        this.LINES_GET_LIST().then( res => {
          this.linesList = res.data
          this.linesLoading = false
          resolve()
        })
      })
    },
    fillCategories: function(){
      return new Promise(resolve =>{
        let current_lines = this.__isInt(this.linesCurrentSelected) ? this.linesCurrentSelected : null
        this.categoriesLoading = true
        this.CATEGORIES_GET_LIST(current_lines).then( res => {
          this.categoriesList = res.data
          this.categoriesLoading = false
          resolve()
        })
      })
    },
    fillRegions: function(){
      return new Promise(resolve => {
        this.regionsLoading = true
        this.REGIONS_GET_LIST().then(res => {
          this.regionsList = res.data
          this.regionsLoading = false
          resolve()
        })
      })
    },
    fillDepartments: function(){
      return new Promise(resolve => {
        let current_region = this.__isInt(this.regionsCurrentSelected) ? this.regionsCurrentSelected : null
        this.departmentsLoading = true
        this.DEPARTMENTS_GET_LIST({
          regionId: current_region
        }).then(res => {
          this.departmentsList = res.data
          this.departmentsLoading = false
          resolve()
        })
      })
    },
    fillShops: function(){
      return new Promise(resolve => {
        let current_region = this.__isInt(this.regionsCurrentSelected) ? this.regionsCurrentSelected : null
        let current_department = this.__isInt(this.departmentsCurrentSelected)? this.departmentsCurrentSelected : null
        this.shopsLoading = true
        this.SHOPS_GET_LIST({
          regionId: current_region,
          departmentId: current_department
        }).then( res => {
          this.shopsList = res.data
          this.shopsLoading = false
          resolve()
        })
      })
    },
    apply: function(){

      if (this.$route.name === "showPhotoreport"){
        this.$router.push({
          name: "showPhotoreport",
          params: Object.assign({}, this.resultData)
        })
      }

      this.SET_CURRENT_DATE(null).then(()=>{
        this.FASETS_GET_LIST(Object.assign({}, this.$route.params, this.resultData))
        this.set_images_list([])
      })

    }
  },
  computed: {
    ...mapGetters( "master", { loading: "facets_loading" }),
    resultData: function(){
      var q = '!' 
      return {
        line:       !this.linesCurrentSelected ?        q : this.linesCurrentSelected,
        category:   !this.categoriesCurrentSelected ?   q : this.categoriesCurrentSelected,
        region:     !this.regionsCurrentSelected ?      q : this.regionsCurrentSelected,
        department: !this.departmentsCurrentSelected ?  q : this.departmentsCurrentSelected,
        shop:       !this.shopsCurrentSelected ?        q : this.shopsCurrentSelected
      }
    }
  }
}
</script>
