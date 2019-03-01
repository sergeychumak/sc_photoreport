<template>
  <div>


    <template v-if="$slots.region">
      <slot name="region"></slot>
    </template>
    <template v-else>
      <span class="caption grey-text">{{$tc('REGION',2)}}</span>
    </template>
    <v-autocomplete
      :items="regionsList"
      :loading="regionsLoading"
      v-model="regionsCurrentSelected"
      item-text="alias"
      item-value="id"
      class="mb-1"
      solo dense hide-details clearable></v-autocomplete>

    <template v-if="middle">
      <span class="title grey-text">{{$tc('DEPARTMENT',2)}}</span>
    </template>
    <template v-else>
      <span class="caption grey-text">{{$tc('DEPARTMENT',2)}}</span>
    </template>
    <v-autocomplete
      :items="departmentsList"
      :loading="departmentsLoading"
      v-model="departmentsCurrentSelected"
      item-text="alias"
      item-value="id"
      class="mb-1"
      solo dense hide-details clearable></v-autocomplete>

    <template v-if="middle">
      <span class="title grey-text">{{$tc('SHOP',2)}}</span>
    </template>
    <template v-else>
      <span class="caption grey-text">{{$tc('SHOP',2)}}</span>
    </template>
    <v-autocomplete
      :items="shopsList"
      :loading="shopsLoading"
      v-model="shopsCurrentSelected"
      item-text="alias"
      item-value="id"
      class="mb-1"
      solo dense hide-details clearable></v-autocomplete>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'form-select-shop',
  props: {
    middle: {
      type: Boolean,
      default (){
        return false
      }
    }
  },
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
      shopsCurrentSelected: null

    }
  },
  watch:{

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

    console.log( this.$slots)
    
    this.fillRegions()
    this.fillDepartments()
    this.fillShops()
  },
  methods: {
    ...mapActions( "shops",       { SHOPS_GET_LIST:       "get_list" }),
    ...mapActions( "departments", { DEPARTMENTS_GET_LIST: "get_list" }),
    ...mapActions( "regions",     { REGIONS_GET_LIST:     "get_list" }),

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
    }

  },
  computed: {

    resultData: function(){
      return {
        region: this.regionsCurrentSelected === undefined ? null : this.regionsCurrentSelected,
        department: this.departmentsCurrentSelected === undefined ? null : this.departmentsCurrentSelected,
        shop: this.shopsCurrentSelected === undefined ? null : this.shopsCurrentSelected
      }
    }
  }
}
</script>
