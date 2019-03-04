<template>
  <v-layout column>

    <!--NAME-->
    <div class="isHook">
      <div ref="isHook__Name" class="blue--text">
        / {{$t('PAGE_TITLE.USER_REGISTRATION')}}
      </div>
    </div>

    <!--ACTION-->
    <div class="isHook">
      <div ref="isHook__Actions">
        <v-btn small flat color="primary" @click="userRregistration">{{$t('BTN.TO_REG')}}</v-btn>
      </div>
    </div>

    <v-flex shrink>
      <v-alert :value="alert.error" type="error" transition="scale-transition">
        <div>{{$t('ERROR.USERRREGISTRATION')}}</div>
        <template v-if="Object.keys(errorObj).length > 0">
          <div class="caption" v-for="item in errorObj">{{item}}</div>
        </template>
      </v-alert>
    </v-flex>


    <v-flex class="overflowAuto" >

      <v-card width="500" flat class="ma-4">

        <div>{{$t("FIELDS.EMAIL")}} *</div>
        <v-text-field
          v-model="fieldEmail"
          solo
          :rules="[rules.required, rules.email]"
        ></v-text-field>

        <div>{{$t("FIELDS.NAME")}} *</div>
        <v-text-field
          :rules="[rules.required]"
          v-model="fieldName" solo></v-text-field>

        <div>{{$t("FIELDS.NAME_ENG")}} *</div>
        <v-text-field
          :rules="[rules.required]"
          v-model="fieldNameEn" solo></v-text-field>

        <div>{{$t("FIELDS.POSITION")}}</div>
        <v-text-field v-model="fieldPosition" solo></v-text-field>

        <div>{{$t("FIELDS.PASSWORD")}} *</div>
        <v-text-field
          type="password"
          :rules="[rules.required]"
          hint="Пароль должен содержать не менее восьми знаков, включать заглавные, прописные буквы и цифры"
          persistent-hint
          v-model="fieldPassword" solo></v-text-field>

        <div>{{$t("FIELDS.REPEAT_PASSWORD")}} *</div>
        <v-text-field
          type="password"
          :rules="[rules.required, rules.repeat]"
          v-model="fieldRepeatPassword" solo></v-text-field>

        <div>{{$t("FIELDS.ROLE")}} *</div>
        <v-select
          :items="list.roles"
          v-model="fieldRole"
          item-text="alias"
          item-value="id"
          solo
          :rules="[rules.required]"
        ></v-select>

        <template v-if="fieldRole_name==='SHOP'">
          <div>{{$tc('FIELDS.REGION',2)}}</div>
          <v-autocomplete
            :items="list.regions"
            :loading="loading.regions"
            v-model="fieldRegion"
            item-text="alias"
            item-value="id"
            class="mb-1"
            solo dense clearable></v-autocomplete>
          <template v-if="fieldRegion">
            <div>{{$tc('FIELDS.DEPARTMENT',2)}}</div>
            <v-autocomplete
              :items="list.departments"
              :loading="loading.departments"
              v-model="fieldDepartment"
              item-text="alias"
              item-value="id"
              class="mb-1"
              solo dense clearable></v-autocomplete>
            <template v-if="fieldDepartment">
              <div>{{$tc('FIELDS.SHOP',2)}}</div>
              <v-autocomplete
                :items="list.shops"
                :loading="loading.shops"
                v-model="fieldShop"
                item-text="alias"
                item-value="id"
                class="mb-1"
                solo dense clearable></v-autocomplete>
            </template>
          </template>
        </template>
        <template v-if="fieldRole_name==='REGMERCH'">
          <div>{{$tc('FIELDS.REGION',2)}}</div>
          <v-autocomplete
            :items="list.regions"
            :loading="loading.regions"
            v-model="fieldRegion"
            item-text="alias"
            item-value="id"
            class="mb-1"
            solo dense clearable></v-autocomplete>
        </template>
        <template v-if="fieldRole_name==='DEPDIR'">
          <div>{{$tc('FIELDS.REGION',2)}}</div>
          <v-autocomplete
            :items="list.regions"
            :loading="loading.regions"
            v-model="fieldRegion"
            item-text="alias"
            item-value="id"
            class="mb-1"
            solo dense clearable></v-autocomplete>
          <template v-if="fieldRegion">
            <div>{{$tc('FIELDS.DEPARTMENT',2)}}</div>
            <v-autocomplete
              :items="list.departments"
              :loading="loading.departments"
              v-model="fieldDepartment"
              item-text="alias"
              item-value="id"
              class="mb-1"
              solo dense clearable></v-autocomplete>
          </template>
        </template>

      </v-card>


    </v-flex>

  </v-layout>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'user-registration',
    data(){
      return {

        alert: {
          error: false
        },
        errorObj: "",
        errorTimer: 0,

        fieldName: null,
        fieldEmail: null,
        fieldNameEn: null,
        fieldBusiness: null,
        fieldCountries: null,
        fieldPosition: null,
        fieldRole: null,
          fieldRole_name: null,
        fieldPassword: null,
        fieldRepeatPassword: null,
        fieldRegion: null,
        fieldDepartment: null,
        fieldShop: null,
        rules: {
          required: value => !!value || this.$t('ERROR.REQUIRED'),
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || this.$t('ERROR.INVALIDEMAIL')
          },
          repeat: v => {
            if (v){
              if (v !== this.fieldPassword){
                return this.$t('ERROR.INVALIDREPEATPASSWORD')
              }
            }
            return ''
          }
        },
        list: {
          roles: [],
          regions: [],
          departments: [],
          shops: []
        },
        loading: {
          regions: false,
          departments: false,
          shops: false
        }
      }
    },
    watch: {
      "fieldRole": function(newValue){
        let obj = this.list.roles.filter(el=>{
          return el.id === newValue
        })
        if (obj.length > 0)
          this.fieldRole_name = obj[0].name

        this.fieldRegion = null

      },
      "fieldRegion": function(){
        this.fieldDepartment = null
        this.receive_departments()
      },
      "fieldDepartment": function(){
        this.fieldShop = null
        this.receive_shops()
      }
    },
    mounted: function(){
      this.receive_roles_list().then((res)=>{
        this.list.roles = res.data
      })
      this.receive_regions()
      this.receive_departments()
      this.receive_shops()

      this.fieldBusiness = this.CURRENT_BUSINESS
      this.fieldCountries = this.CURRENT_COUNTRIES
    },
    methods: {
      ...mapActions( "master" , {
        receive_roles_list: "receive_roles_list",
        receive_regions_list: "receive_regions_list",
        receive_departments_list: "receive_departments_list",
        receive_shops_list: "receive_shops_list",
        user_registration: "user_registration"
      }),

      receive_regions: function(){
        this.loading.regions = true
        this.receive_regions_list().then((res)=>{
          this.list.regions = res.data
          this.loading.regions = false
        })
      },

      receive_departments: function(){
        this.loading.departments = true
        this.receive_departments_list(this.obj2receive).then((res)=>{
          this.list.departments = res.data
          this.loading.departments = false
        })
      },

      receive_shops: function(){
        this.loading.shops = true
        this.receive_shops_list(this.obj2receive).then((res)=>{
          this.list.shops = res.data
          this.loading.shops = false
        })
      },

      userRregistration: function(){
        this.user_registration(this.resultData).then((res)=>{
          if (res.success){
            this.$route.push({name: 'main'})
          }
          else{
            if (res.message){
              this.errorObj = {"err" : res.message}
            }else{
              this.errorObj = res.errors
            }

            this.alert.error = true
            // setTimeout(()=>{
            //   this.alert.error = false
            // },this.errorTimer)
          }
        })
      }
    },
    computed: {

      ...mapGetters( "master", {
        CURRENT_BUSINESS: "current_business",
        CURRENT_COUNTRIES: "current_countries"
      }),

      obj2receive : function(){
        return {
          regionId: this.fieldRegion,
          departmentId: this.fieldDepartment
        }
      },

      resultData: function(){
        return {
          businessId: this.fieldBusiness,
          countryId: this.fieldCountries,
          email: this.fieldEmail.toLowerCase(),
          name: this.fieldName,
          name_en: this.fieldNameEn,
          password: this.fieldPassword,
          position: this.fieldPosition,
          regionId: this.fieldRegion,
          departmentId: this.fieldDepartment,
          roleId: this.fieldRole,
          shopId: this.fieldShop
        }
      }

    }
  }
</script>

