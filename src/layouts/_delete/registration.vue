<template>
  <v-app >
    <v-content class="vhHeight white ">
      <v-container fluid fill-height class="1ma-2 pa-2 overflowAuto">
        <v-layout>
          <v-flex md6 style1="overflow: auto;    height: 100%;">

            <h2 class="mb-2">{{$t("LABEL.USER_REGISTRATION")}}</h2>

            <div>{{$t("FIELDS.EMAIL")}} *</div>
            <v-text-field
              v-model="form.email"
              solo
              :rules="[rules.required, rules.email]"
            ></v-text-field>

            <div>{{$t("FIELDS.NAME")}} *</div>
            <v-text-field
              v-model="form.name"
              solo
              :rules="[rules.required]"
            ></v-text-field>

            <div>{{$t("FIELDS.NAME_ENG")}}</div>
            <v-text-field
              v-model="form.name_en"
              solo
            ></v-text-field>

            <div>{{$t("FIELDS.BUSINESS")}} *</div>
            <v-select
              :items="LIST_BUSINESS"
              v-model="form.business"
              item-text="alias"
              item-value="id"
              solo
              :rules="[rules.required]"
            ></v-select>

            <div>{{$t("FIELDS.COUNTRIES")}} *</div>
            <v-select
              :items="LIST_COUNTRIES"
              v-model="form.countries"
              item-text="alias"
              item-value="id"
              solo
              :rules="[rules.required]"
            ></v-select>

            <div>{{$t("FIELDS.POSITION")}}</div>
            <v-text-field
              v-model="form.position"
              solo
            ></v-text-field>

            <div>{{$t("FIELDS.ROLE")}}</div>
            <v-select
              :items="list_roles"
              v-model="form.role"
              item-text="alias"
              item-value="id"
              solo
              :rules="[rules.required]"
            ></v-select>

            <template v-if="typeView==='SHOP'">

              <div>{{$tc('FIELDS.REGION',2)}}</div>
              <v-autocomplete
                :items="regionsList"
                :loading="regionsLoading"
                v-model="regionsCurrentSelected"
                item-text="alias"
                item-value="id"
                class="mb-1"
                solo dense clearable></v-autocomplete>

              <div>{{$tc('FIELDS.DEPARTMENT',2)}}</div>
              <v-autocomplete
                :items="departmentsList"
                :loading="departmentsLoading"
                v-model="departmentsCurrentSelected"
                item-text="alias"
                item-value="id"
                class="mb-1"
                solo dense clearable></v-autocomplete>

              <div>{{$tc('FIELDS.SHOP',2)}}</div>
              <v-autocomplete
                :items="shopsList"
                :loading="shopsLoading"
                v-model="shopsCurrentSelected"
                item-text="alias"
                item-value="id"
                class="mb-1"
                solo dense clearable></v-autocomplete>

            </template>

            <template v-if="typeView==='REGMERCH'">

              <div>{{$tc('FIELDS.REGION',2)}}</div>
              <v-autocomplete
                :items="regionsList"
                :loading="regionsLoading"
                v-model="regionsCurrentSelected"
                item-text="alias"
                item-value="id"
                class="mb-1"
                solo dense clearable></v-autocomplete>

            </template>

            <template v-if="typeView==='DEPDIR'">

              <div>{{$tc('FIELDS.REGION',2)}}</div>
              <v-autocomplete
                :items="regionsList"
                :loading="regionsLoading"
                v-model="regionsCurrentSelected"
                item-text="alias"
                item-value="id"
                class="mb-1"
                solo dense clearable></v-autocomplete>

              <div>{{$tc('FIELDS.DEPARTMENT',2)}}</div>
              <v-autocomplete
                :items="departmentsList"
                :loading="departmentsLoading"
                v-model="departmentsCurrentSelected"
                item-text="alias"
                item-value="id"
                class="mb-1"
                solo dense clearable></v-autocomplete>

            </template>

            <div>{{$t("FIELDS.PASSWORD")}}</div>
            <v-text-field
              v-model="form.password"
              type="password"
              solo
            ></v-text-field>
            <v-btn color="primary" @click="clk_registration">{{$t('BTN.TO_REG')}}</v-btn>
            <v-btn color="info" @click="$router.push( { name:'main' } )">{{$t('BTN.TO_MAIN')}}</v-btn>

            <v-alert :value="errorFlag" type="error">
              <div v-for="(item,key) in errors">
                {{key}} : {{item}}
              </div>
            </v-alert>

          </v-flex>



        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {mapActions ,mapGetters} from 'vuex'
  import FormSelectShop from "@/components/elements/form-select-shop"
  export default {
    name: "user-registration-layout",
    components: {
      FormSelectShop: FormSelectShop
    },
    data: function(){
      return {
        typeView: "",
        list_roles:[],
        form: {
          email: null,
          name: null,
          name_en: null,
          business: null,
          countries: null,
          position: null,
          role: null,
          password: null
        },
        rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        },

        regionsList: [],
        regionsLoading: false,
        regionsCurrentSelected: null,

        departmentsList: [],
        departmentsLoading: false,
        departmentsCurrentSelected: null,

        shopsList: [],
        shopsLoading: false,
        shopsCurrentSelected: null,

        errors: {},
        errorFlag: false

      }
    },
    watch: {
      "form.role": function(newValue){
        let obj = this.list_roles.filter(el=>{
          return el.id === newValue
        })
        this.typeView = obj[0].name
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
       this.ROLES_GET_LIST().then(res => {
          this.list_roles = res.data.filter(el=>{
           return el.description !== null
         })
       })

        this.fillRegions()
        this.fillDepartments()
        this.fillShops()

    },
    methods:{
      ...mapActions('roles',{
        ROLES_GET_LIST: "get_list"
      }),
      ...mapActions( "auth", { REGISTRATION: "registration" }),
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
      clk_registration: function () {
        this.REGISTRATION(this.resultData).then((res)=>{
          if (!res.success){
            this.errorFlag = true
            this.errors = res.errors
          }
          else{
            this.errorFlag = false
            this.errors = {}
            this.$router.push({ name: 'main'})
          }
        })
      }
    },
    computed: {
      ...mapGetters('base', {
        LIST_BUSINESS: 'list_business',
        LIST_COUNTRIES: 'list_countries'
      }),
      resultData: function(){
        return {
          businessId: this.form.business,
          countryId: this.form.countries,
          email: this.form.email,
          name: this.form.name,
          name_en: this.form.name_en,
          password: this.form.password,
          position: this.form.position,
          regionId: this.regionsCurrentSelected,
          roleId: this.form.role,
          shopId: this.shopsCurrentSelected
        }
      }
    }
  }
</script>
