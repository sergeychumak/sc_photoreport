<template>
    <v-autocomplete
      v-model="VModel"
      solo
      dense
      class="mb-1"
      item-text="nameForFilterPanel"
      item-value="id"
      hide-details
      clearable
      :items="list"
      :label="$t('DEPARTMENT')"
      :loading="isLoading"
      :disabled="disabled"
    ></v-autocomplete>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'select-department-photo',
    data: function(){
      return {
        isLoading: false,
        disabled: true
      }
    },
    watch: {
      currentId_region: function(value){
        if ( value !== -1 ){
          this.load_data()
        }else{
          this.disabled = true
          this.isLoading = false
          this.VModel = -1
        }
      }
    },
    computed: {
      ...mapGetters( 'departmentPhoto' , { list: 'list', currentId: 'currentId' } ),
      ...mapGetters( 'regionPhoto' , { currentId_region: 'currentId' } ),
      VModel: {
        get: function () {return this.currentId},
        set: function (value) {this.set_current(value)}
      }
    },
    methods: {
      ...mapActions( 'departmentPhoto', { set_current: 'set_current', get_list: 'get_list' } ),
      load_data: function(){
        this.isLoading = true
        this.disabled = true
        this.get_list().then(() =>{
          this.isLoading = false;
          this.disabled = false
        })
      }
    }
  }
</script>
