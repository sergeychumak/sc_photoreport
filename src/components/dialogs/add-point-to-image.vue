<!--

<v-dialog v-model="dialogAddPointToImage" width="500">
  <AddPointToImage
    :dialogAddPointToImage.sync="dialogAddPointToImage"
    v-on:click-add-save="createPoint"
  ></AddPointToImage>
</v-dialog>

-->


<template>
  <v-card>
    <v-card-title class="headline grey lighten-4">{{$t('ADD_POINT_TO_IMAGE')}}</v-card-title>
    <v-card-text>

      <form ref="form">

        <input type="hidden" v-model="form.id">

        <!--<div class="body-2">{{$t('ERROR_LOCATION')}}</div>-->
          <!--<v-select-->
            <!--:items="list_problem_location"-->
            <!--v-model="form.locationId"-->
            <!--item-value="id"-->
            <!--item-text="alias"-->
            <!--solo hide-details></v-select>-->

        <div class="body-2 pt-2">{{$t('ERROR_LOCATION_ITEM')}}</div>
          <v-select
            :items="list_problem"
            v-model="form.problemId"
            item-value="id"
            item-text="alias"
            solo hide-details></v-select>

        <div class="body-2 pt-2">{{$t('COMMENTS')}}</div>
          <v-textarea
            v-model="form.comment"
            solo
            hide-details></v-textarea>

      </form>

    </v-card-text>

    <v-card-actions>
      <v-btn color="error" flat @click="close">{{$t('BTN.CLOSE')}}</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" flat @click="save">{{$t('BTN.SAVE')}}</v-btn>
    </v-card-actions>

  </v-card>

</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'dialog-add-point-to-image',
  props: {
    "photoId": {
      type: Number
    },
    "dialogAddPointToImage": {
      type: Boolean,
      default() { return false }
    }
  },
  data: function(){
    return {
      form:{
        problemId: null,
        comment: null
      },
      list_problem: []
    }
  },
  watch: {
    "dialogAddPointToImage": function(newValue, oldValue){
      if (newValue){
          this.fill_problem({
            photoId: this.photoId
          }).then( res => {
            this.list_problem = res
          })
      }else{
        let obj = {};
        for (var prop in this.form) { obj[prop] = null }
        this.form = obj
      }
    }
  },
  methods:{
    ...mapActions("points", {
      fill_problem: "GET_LIST_PROBLEM"
    }),

    save: function(){
      let res = Object.assign({},this.form)
      this.$emit("click-add-save", res)
      this.close()

    },
    close: function(){
      this.$emit("update:dialogAddPointToImage", false)
    }
  }
}
</script>
