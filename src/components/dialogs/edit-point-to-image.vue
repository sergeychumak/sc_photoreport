<!--
<v-dialog v-model="dialogEditPointToImage" width="500">
  <EditingPointToImage
    :dialogEditingPointToImage.sync="dialogEditPointToImage"
    v-on:click-edit-save="editPoint"
    :id="data2dialogEditPointToImage.id"
    :locationId="data2dialogEditPointToImage.locationId"
    :problemId="data2dialogEditPointToImage.problemId"
    :comment="data2dialogEditPointToImage.comment"
  ></EditingPointToImage>
-->

<template>
  <v-card>
    <v-card-title class="headline grey lighten-4">{{$t('EDIT_POINT_TO_IMAGE')}}</v-card-title>
    <v-card-text>

      <form ref="form">

        <input type="hidden" v-model="form.id">

        <!--<div class="body-2">{{$t('ERROR_LOCATION')}}</div>-->
          <!--<v-select-->
            <!--:items="list_problem_location"-->
            <!--v-model="form.locationId_"-->
            <!--item-value="id"-->
            <!--item-text="alias"-->
            <!--solo hide-details></v-select>-->

        <div class="body-2 pt-2">{{$t('ERROR_LOCATION_ITEM')}}</div>
          <v-select
            :items="list_problem"
            v-model="form.problemId_"
            item-value="id"
            item-text="alias"
            solo hide-details></v-select>

        <div class="body-2 pt-2">{{$t('COMMENTS')}}</div>
          <v-textarea
            v-model="form.comment_"
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
  name: 'dialog-edit-point-to-image',
  props: {
    "dialogEditPointToImage": {
      type: Boolean,
      default() { return false }
    },
    "id": {
      type: Number,
      default() { return 0 }
    },
    // "locationId": {
    //   type: Number,
    //   default() { return 0 }
    // },
    "problemId": {
      type: Number,
      default() { return 0 }
    },
    "comment": {
      type: String,
      default() { return "" }
    },
    "photoId": {
      type: Number
    }
  },
  data: function(){
    return {
      form:{
        // locationId_: null,
        problemId_: null,
        comment_: null
      },
      list_problem: [],
    }
  },
  watch: {
    "dialogEditPointToImage": function(newValue, oldValue){
      if (newValue){
        this.form = Object.assign({},{
          // locationId_ : this.locationId,
          problemId_ : this.problemId,
          comment_ : this.comment,
        })
        this.fill_problem({
          photoId: this.photoId
        }).then( res => {
          this.list_problem = res
        })
      }else{
        // clear
        // let obj = {};
        // for (var prop in this.form) { obj[prop] = null }
        // this.form = obj
      }
    },
    // "form.locationId_": function(newValue){
    //  this.__fill_problem_location_items(newValue)
    // }
  },
  methods:{
    ...mapActions("points", {
      // fill_list_problem_location: "GET_LIST_PROBLEM_LOCATION",
      fill_problem: "GET_LIST_PROBLEM"
    }),


    // __fill_list_problem_location: function(){
    //   this.fill_list_problem_location().then( res => {
    //     this.list_problem_location = res
    //     if (this.form.locationId_ !== 0){
    //       this.__fill_problem_location_items(this.form.locationId_)
    //     }
    //   })
    // },

    save: function(){
      let res = Object.assign({},this.form)
      this.$emit("click-edit-save", res)
      this.close()

    },
    close: function(){
      this.$emit("update:dialogEditPointToImage", false)
    }
  },
  computed: {
    // form: function(){
    //   return {
    //     locationId_: this.locationId,
    //     problemId_: this.problemId,
    //     comment_: this.comment
    //   }
    // }
  }
}
</script>
