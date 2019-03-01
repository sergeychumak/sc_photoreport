<template>

  <v-card>
    <v-card-title class="pa-0" style="z-index: 10">
      <v-toolbar height="50" light>
        <v-toolbar-title>
          <div class="title pb-0">Создать пользователя</div>
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

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.businessAlias')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-select
              solo
              v-model="form.business"
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
              v-model="form.country"
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

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.position')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.position" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.regionAlias')}}</v-subheader></v-flex>
          <v-flex xs9><selectRegion></selectRegion></v-flex>
          <v-flex v-show="showDepartment" xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.departmentAlias')}}</v-subheader></v-flex>
          <v-flex v-show="showDepartment" xs9><departmentRegion></departmentRegion></v-flex>
          <v-flex v-show="showShop" xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.USERS.shopAlias')}}</v-subheader></v-flex>
          <v-flex v-show="showShop" xs9><shopRegion></shopRegion></v-flex>

          <v-flex xs3><v-subheader>{{$t('TABLE.USERS.activated')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-checkbox primary hide-details v-model="form.active"></v-checkbox>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions class="pa-0">
      <v-toolbar height="50" light class="pa-2">
        <v-btn @click="$emit('close-dialog')" dark  color="red">Закрыть</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="save" dark color="green">Создать</v-btn>
      </v-toolbar>
    </v-card-actions>
  </v-card>

</template>

<script>
  import selectRegion from '@/components/select-photo-region'
  import departmentRegion from '@/components/select-photo-department'
  import shopRegion from '@/components/select-photo-shop'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'AdminUsersAddPage',
    data: function(){
      return {
        form: {
          email: null,
          name: null,
          business: null,
          country: null,
          password: null,
          position: null,
          active: false
        },

        showDepartment : false,
        showShop: false
      }
    },
    components: {
      selectRegion: selectRegion,
      departmentRegion: departmentRegion,
      shopRegion: shopRegion
    },
    computed: {
      ...mapGetters('business' , {businessList: 'list'}),
      ...mapGetters('countries' , {countriesList: 'list'}),
      ...mapGetters( 'regionPhoto' , { currentId_region: 'currentId' } ),
      ...mapGetters( 'departmentPhoto' , { currentId_department: 'currentId' } ),
      ...mapGetters( 'shopPhoto' , { currentId_shop: 'currentId' } )
    },
    watch: {
      currentId_region: function(val){this.showDepartment = val!==-1},
      currentId_department: function(val){this.showShop = val!==-1}
    },
    methods:{
      save: function(){
        this.$emit('save-dialog', Object.assign(this.$data.form, {
          region: this.currentId_region,
          department: this.currentId_department,
          shop: this.currentId_shop
        }))
      }
    }
  }
</script>
