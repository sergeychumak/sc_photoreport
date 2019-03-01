<template>

  <v-card>
    <v-card-title class="pa-0" style="z-index: 10">
      <v-toolbar height="50" light>
        <v-toolbar-title>
          <div class="title pb-0">{{$t('TITLE.' + type)}}</div>
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

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.RULER.name')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.name" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.RULER.name_en')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.name_en" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.RULER.name_zh')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.name_zh" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.RULER.businessAlias')}}</v-subheader></v-flex>
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

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.RULER.countryAlias')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-select
              solo
              v-model="form.countryId"
              :items="countriesList"
              item-text="alias"
              item-value="id"
              hide-details
            ></v-select>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions class="pa-0">
      <v-toolbar height="50" light class="pa-2">
        <v-btn @click="$emit('close-dialog')" dark  color="red">{{$t('BTN.CLOSE')}}</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="save" dark color="green">{{$t('BTN.' + type)}}</v-btn>
      </v-toolbar>
    </v-card-actions>
  </v-card>

</template>

<script>
  import selectRegion from '@/components/select-photo-region'
  import departmentRegion from '@/components/select-photo-department'
  import { mapGetters } from 'vuex'
  export default {
    name: 'admin-ruler-page-edit',
    props:["selected","type"],
    watch: {
      selected: function(newVal){
        if (newVal.length === 1){
          this.form.id = newVal[0].id
          this.form.name = newVal[0].name
          this.form.name_en = newVal[0].name_en
          this.form.name_zh = newVal[0].name_zh
          this.form.businessId = parseInt(newVal[0].businessId)
          this.form.countryId = parseInt(newVal[0].countryId)
        }
      }
    },
    data: function(){
      return {
        form: {
          id: null,
          name: null,
          name_en: null,
          name_zh: null,
          businessId: null,
          countryId: null
        }
      }
    },
    components: {
      selectRegion: selectRegion,
      departmentRegion: departmentRegion
    },
    computed: {
      ...mapGetters('business' , {businessList: 'list'}),
      ...mapGetters('countries' , {countriesList: 'list'}),
    },
    methods:{
      save: function(){
         this.$emit('success-dialog', this.$data.form)
      }
    }
  }
</script>
