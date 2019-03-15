<template>
  <v-card class="mb-1" >
    <v-card-title class="pa-2 ma-0 light-blue white--text">
      {{$t('SELECT_REPORTING_DATE')}}
      <v-spacer></v-spacer>
      <v-progress-circular :size="20" :width="1" color="white" indeterminate v-if="isLoading" ></v-progress-circular>
      <v-btn icon small @click="showContent=!showContent">
        <v-icon v-if="showContent" color="white">expand_less</v-icon>
        <v-icon v-else color="white">expand_more</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text v-if="showContent && list.length > 0">
      <div class="pl-2" v-for="item in list">
        <v-btn
          outline
          class="blue"
          :class="{'v-btn--active' : item.alias==$route.params.date }"
          @click="showPhotoPackage(item.date)">{{item.alias}}</v-btn>
        <span class="caption blue-grey--text">{{$t('FOUND')}}:</span> {{item.amount}}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'facets-photo',
    data: function(){
      return {
        isLoading: false,
        showContent: true,
        list: []
      }
    },
    watch: {
      currentId_shop: function(value){
        if (value !== -1){
          this.load_data()
        }else{
          this.list = [];
        }
      },
    },
    computed: {
      ...mapGetters('shopPhoto', { currentId_shop: 'currentId'})
    },
    methods: {
      ...mapActions('facetPhoto', {get_list: 'get_list'}),
      load_data: function () {
       this.isLoading = true
       this.get_list().then((res) => {
          this.list = [...res].reverse()
          setTimeout(()=>{
            this.isLoading = false
            this.showContent = true
          },1000)
        })
      },
      showPhotoPackage: function(date){
        this.$router.push({
          name: "showPackage",
          params: {
            id: this.currentId_shop,
            date: date
          }
        })
      }
    }
  }
</script>
