<template>
  <v-app >
    <div style="height: 100%; overflow: hidden">
      <v-container fluid fill-height >
        <v-layout>
          <v-flex md6 style="overflow: auto;    height: 100%;">

            <h2 class="mb-2">{{$t("LABEL.USER_INFO")}}</h2>

  <!--{{USER_INFO}}-->
            <!--<code>-->
              <!--activated: true-->
              <!--businessId: 10000299-->
              <!--countryId: 17458520011-->
              <!--email: "admin@admin"-->
              <!--id: "1000"-->
              <!--name: "Admin"-->
              <!--name_en: "Admin"-->
              <!--password: "admin123"-->
              <!--position: "Администратор системы "-->
              <!--roleId: "1"-->
              <!--shopId: 887-->

            <!--</code>-->


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

            <div>{{$t("FIELDS.PASSWORD")}}</div>
            <v-text-field
              v-model="form.password"
              solo
            ></v-text-field>
            <v-btn color="primary" @click="clk_edit">{{$t('BTN.EDIT')}}</v-btn>
            <v-btn color="info" @click="$router.push( { name:'main' } )">{{$t('BTN.TO_MAIN')}}</v-btn>

            <v-alert :value="errorFlag" type="error">
              <div v-for="(item,key) in errors">
                {{key}} : {{item}}
              </div>
            </v-alert>

          </v-flex>



        </v-layout>
      </v-container>
    </div>

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

        errors: {},
        errorFlag: false,
        
        roleLise:[]

      }
    },
    mounted: function(){
        this.form = Object.assign({},this.form,{
          email: this.USER_INFO.email,
          name: this.USER_INFO.name,
          name_en: this.USER_INFO.name_en,
          business: this.USER_INFO.businessId,
          countries: this.USER_INFO.countryId,
          position: this.USER_INFO.position,
          password: this.USER_INFO.password
        })
      
        this.GET_LIST_ROLES().then((res)=>{
          this.roleList = res.data
        })
      
    },
    methods: {

      ...mapActions('roles', {
        GET_LIST_ROLES: 'get_list'
      }),

      clk_edit: function(){

        let a = this.roleList.filter(el=>{
          return el.name = this.USER_INFO.rolesCodes[0]
        })

        var data = Object.assign({},{
          activated: true,
          businessId: this.form.business,
          countryId: this.form.countries,
          email: this.form.email,
          id: this.USER_INFO.id,
          name: this.form.name,
          name_en: this.form.name_en,
          password: this.form.password,
          position: this.form.position,
          shopId: this.USER_INFO.shopNumber,
          roleId: a[0].id
        })
        
           this.$store.dispatch("api/post_request_clear", {
             url: "users.update",
             data: data
           }).then((res) => {

           })

      }
    },
    computed: {

      ...mapGetters('auth', {
        USER_INFO: "user_info"
      }),
      ...mapGetters('base', {
        LIST_BUSINESS: 'list_business',
        LIST_COUNTRIES: 'list_countries'
      }),


    }
  }
</script>
