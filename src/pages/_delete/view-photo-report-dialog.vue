<template>
  <v-card>

    <v-toolbar
      color="darken-3"
      app1
      fixed1
      dense
      >
      <v-btn icon da1rk @click="$emit('close-dialog')">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>{{dialog_category}} / {{dialog_subcategory}} / {{dialog_index + 1}} [ {{dialog_list.length}} ]</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>

        <v-btn flat @click="dialogAddPointToImage=true" color="blue">
          <v-icon >control_point</v-icon>
        </v-btn>

        <v-btn flat @click="$emit('image-show-back')">
          <v-icon >arrow_back_ios</v-icon>
        </v-btn>

        <v-btn flat @click="$emit('image-show-up')">
          <v-icon >arrow_forward_ios</v-icon>
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>

      <v-layout row style="max-width: 1200px; margin: 0 auto;margin-top: 10px; padding: 10px;border: 1px dashed #aaa;" v-if="dialog_list.length>0">
        <v-flex style="max-width: 800px">

          <annotations

            :key="'annotations_' + dialog_list[dialog_index].id"

            @select="selected"
            @unselect="unselect"
            @move-end="detectedChange"
            @resize-end="detectedChange"
            mouse-select="left"

            :drawing="false"
            width="800"
            height="700"
            :minSize="minSize"

            class="pa-1 ma-1"
            style="border: 1px dashed #aaa;"
            ref="svgContainer"
            :delete.sync="deleting"
          >
            <img
              style="max-height: 700px;max-width: 800px;"
              draggable="false"
              :src="getUrlImage"
            />
            <template v-for="item in list_circles">
              <circle
                :key="item.id"
                class="stroke"
                slot="annotation"
                :id="item.id"
                :cx="item.x"
                :cy="item.y"
                :r="item.radius"
              ></circle>
            </template>
          </annotations>

        </v-flex>
        <v-flex style="max-width: 400px" class="ml-3 mt-1">

          <v-card v-for="(item,index) in list_circles" class="elevation-5 mb-3"
            :color="item.id===list_circles_currentId ? 'green lighten-5': 'red lighten-5' "
          >

            <v-layout columns>
              <v-flex class="pt-2 pl-1 xs1">
                <v-icon color="red" v-if="item.id===list_circles_currentId">radio_button_checked</v-icon>
                <v-icon color="red" v-else>radio_button_unchecked</v-icon>
              </v-flex>
              <v-flex  class="pa-2 xs10" >
                <div class="body-1 pt-1" v-if="item.createdTimestamp">
                  {{ convertTimeToDate(item.createdTimestamp, "DD/MM/YYYY H:M:S") }}
                </div>
                <div class="body-1 pt-1" v-if="item.creator && item.creator.alias">
                  {{item.creator.alias}}
                </div>

                <div class="body-1 pt-1" v-if="item.type && item.type.alias">
                  <b>{{item.type.alias}}</b>
                </div>
                <div class="body-1 pt-1" v-if="item.problemType && item.problemType.alias">
                  {{item.problemType.alias}}
                </div>
                <div class="body-1 pt-1">{{item.text}}</div>
              </v-flex>
              <v-flex class="xs1" v-if="item.id===list_circles_currentId">
                <v-btn small icon flat color="primary" @click="dialogEditPointToImage=true" class="ma-0 mt-1"><v-icon small>edit</v-icon></v-btn>
                <v-btn small icon flat
                       color="error"
                       @click="flyData2dialogYesOrNo_delete=item.id; dialogYesOrNo_delete = true" class="ma-0"><v-icon small>close</v-icon></v-btn>
              </v-flex>
            </v-layout>

            <!--<v-card-actions class="mt-0 pt-0">-->
              <!--<v-btn small icon flat color="primary" @click="editSvgElement(index)"><v-icon small>edit</v-icon></v-btn>-->
              <!--<v-spacer></v-spacer>-->
              <!--<v-btn small icon flat color="error" @click="deleteSvgElement(index)"><v-icon small>close</v-icon></v-btn>-->
            <!--</v-card-actions>-->

          </v-card>

          <v-card v-for="item in listComments" class="elevation-5 mb-3">
            <v-layout columns>
              <v-flex class="pa-2 mr-2"><v-icon>sms</v-icon></v-flex>
              <v-flex  class="pa-2" style="width: 100%">
                <div class="body-2">{{item.authorName}}</div>
                <div class="body-1">{{item.text}}</div>
              </v-flex>
            </v-layout>
          </v-card>
          <v-textarea solo v-model="formNewComment" hide-details></v-textarea>
          <v-btn small color="error" @click="clk_addNewComment">{{$t('BTN.ADD_COMMENT')}}</v-btn>

        </v-flex>
      </v-layout>

    <v-dialog v-model="dialogAddPointToImage" width="500">
      <AddPointToImage
        :dialogAddPointToImage.sync="dialogAddPointToImage"
        :photoId="this.dialog_list[this.dialog_index].id"
        v-on:click-add-save="createPoint"
      ></AddPointToImage>
    </v-dialog>

    <v-dialog v-model="dialogEditPointToImage" width="500">
      <EditPointToImage
        :dialogEditPointToImage.sync="dialogEditPointToImage"
        v-on:click-edit-save="editPoint"
        :id="data2dialogEditPointToImage.id"
        :problemId="data2dialogEditPointToImage.problemId"
        :comment="data2dialogEditPointToImage.comment"
        :photoId="this.dialog_list[this.dialog_index].id"
      ></EditPointToImage>
    </v-dialog>

    <v-dialog v-model="dialogYesOrNo_delete" width="390">
      <YesOrNo
        :dialogYesOrNo.sync="dialogYesOrNo_delete"
        :title="title2dialogYesOrNo_delete"
        v-on:click-yes="__dialogYesOrNo_delete_Y"
      ></YesOrNo>
    </v-dialog>

  </v-card>
</template>

<script>
  import {mapActions} from 'vuex'
  import {convertDate} from "@/mixins/date"

  import Annotator from '@/components/Annotator'
  //dialog
  import AddPointToImage from '@/components/dialogs/add-point-to-image'
  import EditPointToImage from '@/components/dialogs/edit-point-to-image'
  import YesOrNo from '@/components/dialogs/yes-or-no'



  export default {
    name: 'ViewPhotoReportPageDialog',
    mixins: [ convertDate ],
    props:[
      "dialog_category",
      "dialog_subcategory",
      "dialog_index",
      "dialog_list"
    ],
    components: {
      annotations: Annotator,
      AddPointToImage: AddPointToImage,
      EditPointToImage: EditPointToImage,
      YesOrNo: YesOrNo
    },
    data() {
      return {

        dialogAddPointToImage: false,
        dialogEditPointToImage: false,
          data2dialogEditPointToImage: {},
        dialogYesOrNo_delete: false,
          title2dialogYesOrNo_delete: this.$t('YES_OR_NO_DELETE'),
          flyData2dialogYesOrNo_delete: null,


        list_circles: [],

        deleting: false,
        list_circles_currentId: null,

        listComments: [],
        formNewComment: null,

        photo_url: window.photo_url, // todo: убрать из window
        minSize: 50

      }
    },
    watch: {
      //todo: переделать
      dialog_category: function(newValue){
        this.getListComments()
        this.get_list_problem_point()
      },
      dialog_subcategory: function(newValue){
        this.getListComments()
        this.get_list_problem_point()
      },
      dialog_index: function(newValue){
        if (newValue + 1){
          this.getListComments()
          this.get_list_problem_point()
        }



      }
    },
    methods: {


      
      ...mapActions( "points" , {
        CREATE_PROBLEM_POINT: "CREATE_PROBLEM_POINT",
        GET_LIST_PROBLEM_POINT: "GET_LIST_PROBLEM_POINT",
        UPDATE_PROBLEM_POINT: "UPDATE_PROBLEM_POINT",
        DELETE_PROBLEM_POINT: "DELETE_PROBLEM_POINT"
      }),

      /** Создаем точку*/
      createPoint: function(form){
        //console.log(1)
        this.CREATE_PROBLEM_POINT({
          "photoId": this.dialog_list[this.dialog_index].id,
          "problemTypeId": form.problemId,
          "radius": 50,
          "text": form.comment,
          "x": 100,
          "y": 100
        }).then( () => {
          this.get_list_problem_point()
        })
      },

      /** Редактируем точку*/
      editPoint: function(form){
       // console.log(2)
        // console.log(form)
        // console.log(this.data2dialogEditPointToImage)
        this.UPDATE_PROBLEM_POINT({
          "id":  this.data2dialogEditPointToImage.id,
          "photoId":  this.dialog_list[this.dialog_index].id,
          "problemTypeId":  form.problemId_,
          "radius": this.data2dialogEditPointToImage.radius,
          "text": form.comment_,
          "x": this.data2dialogEditPointToImage.x,
          "y": this.data2dialogEditPointToImage.y
        }).then( () => {

          this.get_list_problem_point()
          //   .then(()=>{
          //   this._dataPreparation2dialogEditPointToImage(this.data2dialogEditPointToImage.id)
          // })
        })
      },

      /** GET*/
      get_list_problem_point: function(){
       // console.log(3)
        this.GET_LIST_PROBLEM_POINT({
          photoId: this.dialog_list[this.dialog_index].id
        }).then(res => {
          this.$set(this, 'list_circles', res)
        })
      },


      // Подготавливаем данные для редактирование точки
      _dataPreparation2dialogEditPointToImage: function(id){
       // console.log(10)
        let res = {}
        let obj = this.list_circles.filter(el=>{
          return el.id === id
        })
        if (obj.length > 0){
          res = Object.assign({},{
            id: obj[0].id,
            problemId: obj[0].type.id,
            comment: obj[0].text,
            x: obj[0].x,
            y: obj[0].y,
            radius: obj[0].radius
          })
        }
        this.$set(this,'data2dialogEditPointToImage',res)
        // console.log(this.data2dialogEditPointToImage)
      },

      selected (element) {
       // console.log(11)
        this.$nextTick(()=>{

          this.list_circles_currentId = parseInt(element.node.id)
          let id = parseInt(element.node.id)
          this._dataPreparation2dialogEditPointToImage(id)
        })

      },
      unselect () {
       // console.log(12)
        this.list_circles_currentId = null
        this.$set( this, 'data2dialogEditPointToImage', {} )
      },
      detectedChange(element){
       // console.log(13)
        let a = this.list_circles.filter(el=>{
          return el.id === parseInt(element.node.attributes.id.value)
        })
        this.UPDATE_PROBLEM_POINT({
            "id":  a[0].id,
            "photoId":  a[0].photo.id,
            "problemTypeId":  a[0].type.id,
            "radius": parseInt(element.node.attributes.r.value),
            "text": a[0].text,
            "x": parseInt(element.node.attributes.cx.value),
            "y": parseInt(element.node.attributes.cy.value)
        })
      },

      /* COMMENTS */
      getListComments: function(){
        // console.log(14)
        // console.log(this.dialog_list)
        console.log(this.dialog_index)
        // if (this.dialog_list[this.dialog_index].numOfComments){

        if (this.dialog_index+1){
          console.log( this.dialog_list[this.dialog_index].id)
          console.log( this.dialog_list)
          this.$store.dispatch("photo/getListComments",{
            idImage: this.dialog_list[this.dialog_index].id
          }).then((res)=>{
            console.log(res)
            this.listComments = res
          })
        }

        // }
      },
      clk_addNewComment: function(){
        if (this.formNewComment){
          this.$store.dispatch("photo/addNewComment",{
            photoId: this.dialog_list[this.dialog_index].id,
            text: this.formNewComment
          }).then(()=>{
            this.formNewComment = null
            this.getListComments()
          })
        }
      },

      deletePoint: function(id){
       // console.log(15)
        // console.log('Delete')
        // console.log(id)
        let deleteObj = {}
        let new_list_circles = this.list_circles.filter(el => {
          if (el.id === id) {
            deleteObj = el
            return false
          }
          return true
        })
        this.DELETE_PROBLEM_POINT({
          id: deleteObj.id
        }).then(res => {
          this.$set(this, 'new_list_circles', res)
          this.deleting = true
          this.get_list_problem_point()
        })
      },
      __dialogYesOrNo_delete_Y: function(){
        this.deletePoint(this.flyData2dialogYesOrNo_delete)
      },
      uuidv4: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
    },
    computed:{
      getUrlImage: function () {
       // console.log('test')

        if (this.dialog_list.length > 0){

          // console.log(
          //   this.photo_url + "/" + this.dialog_list[this.dialog_index].date + "/" + this.dialog_list[this.dialog_index].shopId + "/" + this.dialog_list[this.dialog_index].fileName + ".jpg"
          // )

          return this.photo_url + "/" + this.dialog_list[this.dialog_index].date + "/" + this.dialog_list[this.dialog_index].shopId + "/" + this.dialog_list[this.dialog_index].fileName + ".jpg"
        }
        return ""
      },
      annotationsId: function(){
        let res = "annotations_" + this.uuidv4()
       // console.log( res)
        return res
      }
    }
  }
</script>


<style scoped>
  svg {
    /*background: whitesmoke;*/
  }

  #annotation {
    width: 100%;
    height: 100%;
    /*background: url(https://avatars.mds.yandex.net/get-pdb/245485/3fac0bbd-8aaa-44d2-ad80-e59ce4745452/s1200);*/
    /*background-repeat: no-repeat;*/
  }

  .stroke {
    stroke: red;
    stroke-width: 6px;
  }

  .stroke:hover {
    stroke: orange;
    stroke-width: 6px;
  }
</style>

