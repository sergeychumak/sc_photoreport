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
    :label="$t('REGION')"
    :loading="isLoading"
    :disabled="isLoading"
  ></v-autocomplete>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'select-region-photo',
    data: function(){
      return {
        isLoading: true
      }
    },
    mounted: function(){
      this.load_data()
    },
    computed: {
      ...mapGetters( 'regionPhoto' , { list: 'list', currentId: 'currentId' } ),
      VModel: {
        get: function () {return this.currentId},
        set: function (value) {this.set_current(value)}
      }
    },
    methods: {
      ...mapActions('regionPhoto', {set_current: 'set_current', get_list: 'get_list'}),
      load_data: function(){
        this.isLoading = true;
        this.get_list().then(() =>{ this.isLoading = false; })
      }
    }
  }
</script>
