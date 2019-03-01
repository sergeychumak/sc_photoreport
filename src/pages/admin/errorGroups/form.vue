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

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.ERROR_GROUPS.name')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.labelRu" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.ERROR_GROUPS.name_en')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.labelEn" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.ERROR_GROUPS.name_zh')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.labelZh" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.ERROR_GROUPS.business')}}</v-subheader></v-flex>
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

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.ERROR_GROUPS.order')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.order" hide-details></v-text-field>
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
      },
      dialog_editForm: function(newVal){
        if (newVal){

          this.form.id = this.selected[0].id

          this.form.labelRu = this.selected[0].labelRu
          this.form.labelEn = this.selected[0].labelEn
          this.form.labelZh = this.selected[0].labelZh
          this.form.order = this.selected[0].order
          this.form.businessId = parseInt(this.selected[0].businessId)

          console.log(this.form)
          
        }else{
          let obj = {};
          for (var prop in this.form) { obj[prop] = null }
          this.form = obj
          this.enableCalculation = false
        }
      },
      dialog_addNewForm_ERRORS: function(objectError){}
    },
    data: function(){
      return {

        enableCalculation: false,

        loading: false,

        form: {
          id: null,
          businessId: null,
          labelRu: null,
          labelEn: null,
          labelZh: null,
          order: null
        }
        ,
        errorForm : false
      }
    },
    computed: {
      ...mapGetters( "base", {
        businessList: "list_business"
      })
    },
    methods:{
      save: function(){
        console.log(this.form)
        this.$emit( 'success-dialog', this.form )
      }
    }
  }
</script>
