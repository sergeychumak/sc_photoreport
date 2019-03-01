<template>
  <div>

    <!--ONLY O`STIN-->
    <!--********************************************************-->
    <span class="caption grey-text" v-if="linesList.length>0">{{$t(CURRENT_BUSINESS_TEXT + '.LINES')}}</span>
    <v-autocomplete
      v-if="linesList.length>0"
      :items="linesList"
      :loading="linesLoading"
      v-model="linesCurrentSelected"
      item-text="alias"
      item-value="id"
      class="mb-1"
      solo dense hide-details clearable></v-autocomplete>
    <!--********************************************************-->

    <span class="caption grey-text">{{$tc(CURRENT_BUSINESS_TEXT + '.CATEGORY',2)}}</span>
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
    >{{$t('BTN.APPLY')}} 1</v-btn>
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
      shopsCurrentSelected: null

    }
  },
  watch:{
    linesCurrentSelected: function(){
      this.categoriesCurrentSelected = null
      this.fillCategories()
    },
    regionsCurrentSelected: function(){
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
      this.shopsCurrentSelected = null
      this.fillShops()
    }
  },
  mounted: function(){
      this.fillLines(),
      this.fillCategories(),
      this.fillRegions(),
      this.fillDepartments(),
      this.fillShops()
  },
  methods: {
    ...mapActions( "lines",       { LINES_GET_LIST:       "get_list" }),
    ...mapActions( "categories",  { CATEGORIES_GET_LIST:  "get_list" }),
    ...mapActions( "shops",       { SHOPS_GET_LIST:       "get_list" }),
    ...mapActions( "departments", { DEPARTMENTS_GET_LIST: "get_list" }),
    ...mapActions( "regions",     { REGIONS_GET_LIST:     "get_list" }),
    fillLines: function(){
      this.linesLoading = true
      this.LINES_GET_LIST().then( res => {
        this.linesList = res.data
        this.linesLoading = false
      })
    },
    fillCategories: function(){
      let current_lines = this.linesCurrentSelected === undefined ? null : this.linesCurrentSelected
      this.categoriesLoading = true
      this.CATEGORIES_GET_LIST({
        current_lines: current_lines,
      }).then( res => {
        this.categoriesList = res.data
        this.categoriesLoading = false
      })
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
    apply: function(){
      this.$emit('apply',this.resultData)
      console.log(this.resultData)
      this.$router.push({
        name: "show-photoreport"
      })
    }
  },
  computed: {
    ...mapGetters( "base", {
      CURRENT_BUSINESS_TEXT: "current_business_text"
    }),
    ...mapGetters( "facets", {
      loading: "loading"
    }),
    resultData: function(){
      return {
        line: this.linesCurrentSelected === undefined ? null : this.linesCurrentSelected,
        category: this.categoriesCurrentSelected === undefined ? null : this.categoriesCurrentSelected,
        region: this.regionsCurrentSelected === undefined ? null : this.regionsCurrentSelected,
        department: this.departmentsCurrentSelected === undefined ? null : this.departmentsCurrentSelected,
        shop: this.shopsCurrentSelected === undefined ? null : this.shopsCurrentSelected
      }
    }
  }
}
</script>
