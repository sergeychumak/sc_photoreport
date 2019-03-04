<template>
  <div>
    <v-card class="pa-2 mb-2" v-for="(item,index) in points">
      <template v-if="item.editType">
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
        <v-btn @click="savePoint(index)" class="ml-0" small color="primary">{{$t('BTN.SAVE')}}</v-btn>
        <v-btn @click="cancelEditPoint(index)" class="ml-0" small color="error">{{$t('BTN.CANCEL')}}</v-btn>
      </template>
      <template v-else>
        <v-card-actions>
          <v-btn @click="dialog_delete=true, dialog_delete_index=index" small color="error" class="white--text mr-2">{{index+1}}<v-icon right dark>close</v-icon></v-btn>
          <v-btn @click="editPoint(index)" icon small color="white"><v-icon small>edit</v-icon></v-btn>
          <v-spacer></v-spacer>
          <h5>
            {{item.creator.alias}}<br/>
            {{ convertTimeToDate(item.createdTimestamp, "DD/MM/YYYY") }}
          </h5>
        </v-card-actions>
        <div class="pl-2 pr-2 pt-0 pb-0">
          <div><h4 class="mb-0">{{item.type.alias}}</h4></div>
          <div>{{item.text}}</div>
        </div>
      </template>
    </v-card>

    <v-dialog
      v-model="dialog_delete"
      width="300"
    >
      <v-card>
        <v-card-title class="headline red--text">Вы действительно хотите удалить точку?</v-card-title>
        <v-card-actions>
          <v-btn color="green darken-1" dark @click="deletePoint(dialog_delete_index)">Да</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" dark @click="dialog_delete=false, dialog_delete_index=null">Нет</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import {convertDate} from "@/mixins/date"
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'images-points-list',
    props: ["points"],
    mixins: [convertDate],
    data () {
      return {
        dialog_delete: false,
        dialog_delete_index: null,
        list_problem: [],
        form:{
          problemId: null,
          comment: null
        }
      }
    },
    watch: {
      "$route.query.photoId": function(){
        this._get_list_problem()
      },
      "points": function(){
        // this._get_list_problem()
        //console.log(99)
      }
    },
    mounted: function(){
      this._get_list_problem()
    },
    methods: {
      ...mapActions("points", {
        get_list_problem: "get_list_problem"
      }),

      _get_list_problem: function(){
        this
          .get_list_problem({
            photoId: this.$route.query.photoId
          })
          .then((res)=>{
            this.list_problem = res
          })
      },

      savePoint: function(index){
        if (this.points[index].id){
          this.$emit("update-point",{
            point: this.points[index],
            form: this.form
          })
          // this.$set(this.points[index],"editType", false)
        }else{
          this.$emit("save-point",{
            index: index,
            form: this.form
          })
        }
        this.clearForm()
      },

      cancelEditPoint: function(index){
        if (this.points[index].id){
          this.$set(this.points[index],"editType", false)
        }else{
          this.$emit("cancel-add-point",index)
        }
        this.clearForm()
      },

      editPoint: function(index){
        this.form = Object.assign({},{
          problemId: this.points[index].type.id,
          comment: this.points[index].text
        })
        this.$set(this.points[index],"editType", true)
      },

      deletePoint: function(index){
        this.$emit("delete-point",index)
        this.dialog_delete = false
        this.dialog_delete_index = null
      },

      clearForm: function(){
        this.form = Object.assign({},{problemId: null, comment: null})
      }

    }
  }
</script>
