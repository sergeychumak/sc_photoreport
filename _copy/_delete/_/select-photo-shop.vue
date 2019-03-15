<template>
  <v-autocomplete
    v-model="VModel"
    solo
    dense
    class="mb-1"
    item-text="alias"
    item-value="id"
    hide-details
    clearable
    :items="list"
    :label="$t('SHOP')"
    :loading="isLoading"
    :disabled="isLoading"
  ></v-autocomplete>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'select-shop-photo',
    data: function(){
      return {
        isLoading: false
      }
    },
    mounted: function(){
      this.load_data()
    },
    watch: {
      currentId: function(){
        console.log('asd')
      },
      currentId_region: function(){ this.VModel = -1; this.load_data() },
      currentId_department: function(){ this.VModel = -1; this.load_data() }
    },

    computed: {
      ...mapGetters( 'shopPhoto' , { list: 'list', currentId: 'currentId' } ),
      ...mapGetters( 'regionPhoto' , { currentId_region: 'currentId' } ),
      ...mapGetters( 'departmentPhoto' , { currentId_department: 'currentId' } ),
      VModel: {
        get: function () {return this.currentId},
        set: function (value) {this.set_current(value)}
      }
    },
    methods: {
      ...mapActions( 'shopPhoto', { set_current: 'set_current', get_list: 'get_list' } ),
      load_data: function(){
        this.isLoading = true
        this.disabled = true
        this.get_list().then(() =>{
          this.isLoading = false;
          this.disabled = false

          // console.log(this.currentId);
          // console.log(parseInt(this.$route.params.id));
          // if (this.currentId === -1 && this.$route.params.id){
          //   this.set_current(parseInt(this.$route.params.id))
          // }

        })
      }
    }
  }
</script>
