<template>
  <v-card class="mb-1" v-if="list.length > 0">
    <v-card-title class="pa-2 ma-0 light-green white--text">
      Витрина
      <v-spacer></v-spacer>
      <v-progress-circular :size="20" :width="1" color="white" indeterminate v-if="isLoading" ></v-progress-circular>
      <v-btn icon small @click="showContent=!showContent">
        <v-icon v-if="showContent" color="white">expand_less</v-icon>
        <v-icon v-else color="white">expand_more</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text v-if="showContent">
      <div v-for="item in list" class="pb-2">
        <v-icon>save_alt</v-icon>
        <a href="">{{item.name}}</a>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'facets-photo',
    data: function(){
      return {
        isLoading: false,
        showContent: false,
        list: []
      }
    },
    mounted: function(){
      this.load_data()
    },
    methods: {
      ...mapActions('vitrinaPhoto', {get_list: 'get_list'}),
      load_data: function () {
        this.isLoading = true
        this.get_list().then((res) => {
          this.list = res
          setTimeout(()=>{
            this.isLoading = false
          },1000)
        })
      }
    }
  }
</script>
