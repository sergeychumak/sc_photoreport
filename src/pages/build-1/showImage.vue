<template>

  <v-layout justify-center class="overflowAuto">

    <!--NAME-->
    <div ref="isHook__Name">
      / <span class="brown--text text--lighten-3">{{$t('TITLE_PAGE.SHOW_IMAGES')}} </span>
      / <span class="brown--text text--lighten-3">{{shopNumber}}</span>
      / <span class="brown--text text--lighten-3">{{FACETS_CURRENT_DATE}}</span>
      / <span class="brown--text text--lighten-3">{{lines}}</span>
      / <span class="brown--text text--lighten-3">{{category}}</span>
    </div>

    <!--ACTION-->
    <div ref="isHook__Actions">
      <v-btn outline color="error" @click="addPoint"><v-icon color="error">add</v-icon></v-btn>
      <v-btn outline color="primary" @click="left"><v-icon color="primary">arrow_left</v-icon></v-btn>
      <v-btn outline color="primary" @click="right"><v-icon color="primary">arrow_right</v-icon></v-btn>
      <v-btn small icon @click="resetSvgImage=true"><v-icon>center_focus_weak</v-icon></v-btn>
      <v-btn small icon @click="back"><v-icon>close</v-icon></v-btn>
    </div>

    <v-flex  style="max-width: 1200px">

      <v-layout class="percentHeight">
        <v-flex  style="position: relative;max-width: 800px">
          <SvgImage
            :reset.sync="resetSvgImage"
            :image = "currentImages"
            :width="sizeSvgImage"
            :height="sizeSvgImage"
            :viewBox="'0 0 ' + sizeSvgImage + ' ' + sizeSvgImage"
            :points="pointsSvgImage"
            v-on:has-changed="hasChanged"
          ></SvgImage>
        </v-flex>
        <v-flex style="max-width: 400px; margin:10px 0;">
          <div class="mb-2">
            <ImagePointsList
              :points="pointsSvgImage"
              v-on:cancel-add-point="cancelAddNewPoint"
              v-on:delete-point="deletePoint"
              v-on:save-point="savePoint"
              v-on:update-point="updatePoint"
            ></ImagePointsList>
          </div>
          <ImageComments></ImageComments>
        </v-flex>
      </v-layout>

    </v-flex>
  </v-layout>

</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import SvgImage from '@/components/build-1/svg-image'
  import ImageComments from '@/components/build-1/image-comments'
  import ImagePointsList from '@/components/build-1/image-points-list'
  export default {
    name: 'ViewPhotoImagePage',
    data(){
      return {

        resetSvgImage: false,
        pointsSvgImage: [],
        sizeSvgImage: 750,

        shopId: "",
        shopNumber: "",
        lines : "",
        category: "",
        index: null,
        currentImages: "",

      }
    },
    components: {
      SvgImage: SvgImage,
      ImageComments: ImageComments,
      ImagePointsList: ImagePointsList
    },
    watch: {
      "$route.query.photoId": function(){
        this._get_list_problem_point()
      }
    },
    mounted: function(){
      if (this.FACETS_CURRENT_DATE === null){
        if (this.$route.params.date && this.$route.params.date!=="!"){
          this.set_current_date(this.$route.params.date)
          this.set_current_filter(this.$route.params)
          this.get_list_based_on_facet().then(()=>{
            this.setNewDataByPhotoId(this.$route.query.photoId)
          })
        }
      }else{
        this.setNewDataByPhotoId(this.$route.query.photoId)
      }
      document.addEventListener("keydown", this.keyDownPress)

      this._get_list_problem_point()
    },
    destroyed: function(){
      document.removeEventListener("keydown", this.keyDownPress)
    },
    methods: {
      ...mapActions( "master", {
        get_list_based_on_facet: "images_receive_list",
        set_current_date: "facets_set_current_date",
        set_current_filter: "facets_set_current_filter"
      }),

      ...mapActions( "points", {
        create_point: "create_point",
        delete_problem_point: "delete_problem_point",
        get_list_problem_point: "get_list_problem_point",
        update_problem_point: "update_problem_point"
      }),

      left: function(){
        var res = this.index - 1
        if ( res < 0 )
          res = 0
        this.index = res
        this.reloadData()
      },
      right: function(){
        var res = this.index + 1

        var lengthArr = this.IMAGES_LIST.length - 1

        if ( res > lengthArr ){
          res = lengthArr
        }

        this.index = res
        this.reloadData()
      },
      back: function(){
        this.$router.push({name:"showPhotoreport", params: Object.assign({},this.$route.params)})
      },
      reloadData: function(){
        var photoId = this.IMAGES_LIST[this.index].id
        this.$router.push({
          name: "showImage",
          params: Object.assign( {}, this.$route.params),
          query: {
            photoId: photoId
          }
        })
        this.setNewDataByPhotoId(photoId)
      },
      setNewDataByPhotoId: function(photoId){

        this.IMAGES_LIST.map((el,index)=>{
          if (el.id === parseInt(photoId)){
            this.shopId = el.shopId
            this.shopNumber = el.shopNumber
            this.lines = el.categoryName0
            this.category = el.categoryName
            this.index = index
          }
        })

        this.currentImages = ""
          + window.photo_url
          + "/" + this.$route.params.date
          + "/" + this.shopId
          + "/" + this.IMAGES_LIST[this.index].fileName + ".jpg"

        this.resetSvgImage = true
      },

      keyDownPress : function(e){
        if( e.keyCode == 37 ) { this.left() } else if ( e.keyCode == 39 ) { this.right() }
      },

      /** ********************************************************** */
      /** ********************************************************** */
      /** ********************************************************** */
      /** POINT */
      /** ********************************************************** */
      /** ********************************************************** */
      /** ********************************************************** */

      //Добавление точки без сохранения
      addPoint: function(){
        this.pointsSvgImage.push({ x: this.sizeSvgImage/2, y: this.sizeSvgImage/2, radius: 100, editType: true })
      },

      //Отменить добавление точки
      cancelAddNewPoint: function(index){
        this.pointsSvgImage = this.pointsSvgImage.filter((el,indexEl)=>{
          return index!==indexEl
        })
      },

      //Сохранение точки в БД
      savePoint: function(data){
        this.create_point({
          "photoId": this.$route.query.photoId,
          "problemTypeId": data.form.problemId,
          "radius": this.pointsSvgImage[data.index].radius,
          "text": data.form.comment,
          "x": this.pointsSvgImage[data.index].x,
          "y": this.pointsSvgImage[data.index].y
        }).then( () => {
          this._get_list_problem_point()
        })
      },

      //Удаление точки
      deletePoint: function(index){
        this.delete_problem_point({
          id: this.pointsSvgImage[index].id
        }).then(() => {
          this._get_list_problem_point()
        })
      },

      updatePoint: function(data){
        this.update_problem_point({
          "id":  data.point.id,
          "photoId":  data.point.photo.id,
          "problemTypeId":  data.form.problemId,
          "radius": data.point.radius,
          "text": data.form.comment,
          "x": data.point.x,
          "y": data.point.y
        }).then(()=>{
          this._get_list_problem_point()
        })
      },
      
      //Получение списка точек
      _get_list_problem_point: function(){
        this.get_list_problem_point({
          photoId: this.$route.query.photoId
        }).then(res => {
          this.$set(this, 'pointsSvgImage', res)
        })
      },

      hasChanged: function(index){
        if ( !this.pointsSvgImage[index].type )
          return false
        this.updatePoint({
          point: this.pointsSvgImage[index],
          form: {
            problemId: this.pointsSvgImage[index].type.id,
            comment: this.pointsSvgImage[index].text
          }
        })
      }

    },
    computed: {
      ...mapGetters( "master", {
        FACETS_CURRENT_DATE: "facets_current_date",
        IMAGES_LIST: "images_list",
      }),
      // ...mapGetters( "images", {
      //   IMAGES_REMADE_LIST: "remade_list",
      // })
    },
    updated: function(){
     //this.$emit('sync-content')
    }
  }
</script>
