<template>
  <v-layout column>

    <!--NAME-->
    <div class="isHook">
      <div ref="isHook__Name" class="blue--text">
        / {{$t('PAGE_TITLE.UPLOAD_PHOTO_REPORT')}}
      </div>
    </div>

    <!--ACTION-->
    <div class="isHook">
      <div ref="isHook__Actions">

      <template>
        <v-btn v-if="shopSaveBtn" @click="savePhotoreport" outline small dark color="green" ><span class="caption">{{$t('BTN.SAVE')}}</span></v-btn>
      </template>

      <template v-if="Object.keys(this.files).length !== 0">
        <v-btn @click="uploadFiles" flat small dark color="green" ><span class="caption">{{$t('BTN.DOWNLOAD')}} [ {{fileUploadIndex}} / {{filesCount}} ]</span></v-btn>
      </template>

      <template v-if="Object.keys(this.files).length !== 0 || files_tmp.length !== 0">
        <v-btn @click="clearFiles(true)" flat small dark color="red" ><span class="caption">{{$t('BTN.CLEAR')}}</span></v-btn>
      </template>

      <template v-if="Object.keys(this.files).length === 0 && files_tmp.length === 0">
        <v-btn @click="addFiles" color="blue" flat small dark><span class="caption">{{$t('BTN.SELECT_PHOTOS')}}</span></v-btn>
      </template>

      <v-menu transition="slide-x-transition">
        <v-btn slot="activator" icon flat color="teal">
          <v-icon v-if="countPhotoInRow==4">filter_4</v-icon>
          <v-icon v-else>filter_6</v-icon>
        </v-btn>
        <v-list dense>
          <v-list-tile @click="countPhotoInRow=4">
            <v-list-tile-title><v-icon >filter_4</v-icon></v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="countPhotoInRow=6">
            <v-list-tile-title><v-icon >filter_6</v-icon></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

    </div>
    </div>

    <v-flex>
      <v-alert :value="alert" type="success" transition="scale-transition">
        Фотоотчет успешно загружен
      </v-alert>
    </v-flex>

    <v-flex class="vhHeight overflowAuto">

      <v-layout row wrap justify-center>
        <v-layout
          v-for="(file,key) in files_tmp"
          :key="key"
          class="wrapCard isCard" column>
            <v-flex class="isCard__image" :style="_styleImage(photo_url + '/tmp/' + USER_INFO.id + '/tn/' + file.fileName + '.jpg')"></v-flex>
            <v-flex >

              <v-select
                :items="list_photo_category"
                :label="$t('LINES')"
                solo
                hide-details
                item-text="alias"
                item-value="id"
                @change="selectCategory(file.fileName,$event)"
              ></v-select>

            </v-flex>
            <v-flex >
              <v-select
                :items="mapImageCategory[file.fileName] ? mapImageCategory[file.fileName].subCategory : []"
                :label="$tc('CATEGORY')"
                solo
                hide-details
                item-text="alias"
                item-value="id"
                @change="selectSubCategory(file.fileName,$event)">
              </v-select>


            </v-flex>
        </v-layout>
      </v-layout>

    </v-flex>

    <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload" />

   <!-- <v-flex
      v-for="(file,key) in files_tmp"
      :key="key"
      d-flex
      :class="countPhotoInRow__class"
    >
      &lt;!&ndash;<v-card flat tile class="pa-1 ma-1 mb-3">&ndash;&gt;

        &lt;!&ndash;<v-card flat tile class="d-flex">&ndash;&gt;
          &lt;!&ndash;<v-img&ndash;&gt;
            &lt;!&ndash;:src="`${photo_url}/tmp/${USER_INFO.id}/tn/${file.fileName}.jpg`"&ndash;&gt;
            &lt;!&ndash;:lazy-src="``"&ndash;&gt;
            &lt;!&ndash;aspect-ratio="1"&ndash;&gt;
            &lt;!&ndash;class="grey lighten-2"&ndash;&gt;
          &lt;!&ndash;&gt;&ndash;&gt;
            &lt;!&ndash;<v-layout&ndash;&gt;
              &lt;!&ndash;slot="placeholder"&ndash;&gt;
              &lt;!&ndash;fill-height&ndash;&gt;
              &lt;!&ndash;align-center&ndash;&gt;
              &lt;!&ndash;justify-center&ndash;&gt;
              &lt;!&ndash;ma-0&ndash;&gt;
            &lt;!&ndash;&gt;&ndash;&gt;
              &lt;!&ndash;<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>&ndash;&gt;
            &lt;!&ndash;</v-layout>&ndash;&gt;
          &lt;!&ndash;</v-img>&ndash;&gt;
        &lt;!&ndash;</v-card>&ndash;&gt;
        &lt;!&ndash;<v-select&ndash;&gt;
          &lt;!&ndash;:items="list_photo_category"&ndash;&gt;
          &lt;!&ndash;:label="$t(CURRENT_BUSINESS_TEXT + '.LINES')"&ndash;&gt;
          &lt;!&ndash;solo&ndash;&gt;
          &lt;!&ndash;hide-details&ndash;&gt;
          &lt;!&ndash;item-text="alias"&ndash;&gt;
          &lt;!&ndash;item-value="id"&ndash;&gt;
          &lt;!&ndash;@change="selectCategory(file.fileName,$event)"&ndash;&gt;
        &lt;!&ndash;&gt;</v-select>&ndash;&gt;
        &lt;!&ndash;<v-select&ndash;&gt;
          &lt;!&ndash;:items="mapImageCategory[file.fileName] ? mapImageCategory[file.fileName].subCategory : []"&ndash;&gt;
          &lt;!&ndash;:label="$tc(CURRENT_BUSINESS_TEXT + '.CATEGORY')"&ndash;&gt;
          &lt;!&ndash;solo&ndash;&gt;
          &lt;!&ndash;hide-details&ndash;&gt;
          &lt;!&ndash;item-text="alias"&ndash;&gt;
          &lt;!&ndash;item-value="id"&ndash;&gt;
          &lt;!&ndash;@change="selectSubCategory(file.fileName,$event)"&ndash;&gt;
        &lt;!&ndash;&gt;</v-select>&ndash;&gt;

      &lt;!&ndash;</v-card>&ndash;&gt;
    </v-flex>
-->



  </v-layout>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {

    name: 'PhotoUploadPage',

    data(){
      return {

        alert: false,

        photo_url: window.photo_url, // todo: убрать из window

        countPhotoInRow: 4,

        files: {},

        files_tmp: [],

        fileUploadIndex: 0,

        mapImageCategory: {},

        shopSaveBtn: false

      }
    },

    watch: {
      "mapImageCategory": function (newValue) {

        let res = true

        // выбраны все категории
        if (this.files_tmp.length !== Object.keys(newValue).length || Object.keys(newValue).length === 0){
          res = false
        }else{
          // выбраны все под группы
          let objKeys = Object.keys(newValue)
          for(var i =0; i <= objKeys.length - 1; i++){
            if (!newValue[objKeys[i]].idCategory || !newValue[objKeys[i]].idSubcategory ){
              res = false
            }
          }
        }

        this.shopSaveBtn = res

      }
    },

    mounted: function(){
      this.photo_category().then((res) => {
        this.list_photo_category = res.data
      })
    },

    methods: {

      ...mapActions( "master", {
        photo_category: "receive_lines_list",
        photo_subcategory: "receive_category_list",
        clear_user_dir: 'images_clear_user_dir',
        upload_file: 'images_upload',
        get_tmp_list: 'images_receive_tmp_list',
        save_photoreport: "images_save_photoreport"
      } ),

      addFiles(){
        this.$refs.files.click()
      },

      clearFiles(gloabalClear){
        if (gloabalClear){
          this.clear_user_dir().then(()=>{
            this.files_tmp = []
          })
        }
        this.fileUploadIndex = 0
        this.files = Object.assign({})
        this.files_tmp = []
        this.$refs.files.value = ""
        this.mapImageCategory = Object.assign({})
      },

      handleFilesUpload(evt){
        this.files = evt.target.files
      },

      removeFile( key ){
        this.files.splice( key, 1 )
      },

      uploadFiles_(i) {
        var file = this.files[i]
        var fileName = this.files[i].name
        var reader = new FileReader();
        reader.onload = (e) => {
          this.upload_file({
            imageValue: e.target.result,
            name: fileName
          }).then(()=>{
            if ( this.fileUploadIndex !== this.filesCount - 1){
              this.fileUploadIndex = this.fileUploadIndex + 1
              this.uploadFiles_(this.fileUploadIndex)
            }else{
              this.clearFiles()
              this.get_tmp_list().then((res)=>{
                this.files_tmp = res.data
              })
            }
          })
        }
        reader.readAsDataURL(file)
      },

      uploadFiles() {
        this.clear_user_dir().then(()=>{
          this.fileUploadIndex = 0;
          this.uploadFiles_(this.fileUploadIndex)
        })
      },

      selectCategory: function (fileName,idCategory) {
        this.mapImageCategory[fileName] = {
          idCategory: idCategory,
          subCategory: []
        }
        this.photo_subcategory(idCategory).then((res)=>{
          this.$set(this.mapImageCategory[fileName], "subCategory", res.data )
          this.mapImageCategory = Object.assign({}, this.mapImageCategory)
        })
      },

      selectSubCategory: function (fileName,idSubcategory) {
        this.$set(this.mapImageCategory[fileName], "idSubcategory", idSubcategory )
        this.mapImageCategory = Object.assign({}, this.mapImageCategory)
      },

      savePhotoreport: function () {
        this.save_photoreport(this.mapImageCategory).then(()=>{
          this.clearFiles()
          this.alert = true
          setTimeout(()=>{
            this.alert = false
          },2000)
        })
      },


      _styleImage: function(image){
        return {
          backgroundImage: 'url(' + image + ')'
        }
      }

    },

    computed: {

      ...mapGetters("master", {
        USER_INFO: "user_info"
      }),

      countPhotoInRow__class: function(){
        return this.countPhotoInRow === 4 ? "xs3" : "xs2"
      },

      filesIsEmpty: function () {
        return Object.keys(this.files).length === 0
      },

      filesTmpIsEmpty: function () {
        return this.files_tmp.length === 0
      },

      filesCount: function () {
        return Object.keys(this.files).length
      },



    }

  }
</script>


<style scoped lang="scss">
  input[type="file"]{
    position: absolute;
    top: -500px;
  }

  .wrapCard {
    min-width: 210px;
    max-width: 210px;
    overflow: hidden;
  }

  .card {
    border:1px dashed #aaa;
    background: #fff;
  }

  .isCard {
    border:1px dashed #aaa;
    min-height: 240px;
    margin: 10px;
    &__image {
      width: 96%;
      height: 150px;
      margin: 2%;
      /*border: 1px dashed #eee;*/
      background-size: contain;
      background-position: 50% 50%;
    }
    &__buttons {
      padding: 0 2%;
    }
    &__info {
      margin: 2% 5%;
      font-size: 11px;
      color: #909090;
    }
  }
</style>


<!--<style scoped lang="scss">-->
  <!--.wrapCard {-->
    <!--min-width: 210px;-->
    <!--max-width: 210px;-->
    <!--overflow: hidden;-->
  <!--}-->

  <!--.card {-->
    <!--border:1px dashed #aaa;-->
    <!--background: #fff;-->
  <!--}-->

  <!--.nonePerspective{-->
    <!--border: 1px solid #f00;-->
    <!-- -webkit-box-shadow: inset 0px 0px 26px 0px rgba(255,0,0,0.1);-->
    <!-- -moz-box-shadow: inset 0px 0px 26px 0px rgba(255,0,0,0.1);-->
    <!--box-shadow: inset 0px 0px 26px 0px rgba(255,0,0,0.1);-->
  <!--}-->
  <!--.isChecked{-->
    <!--border: 1px solid #3357ff!important;-->
    <!--background: #ebf8ff;-->
  <!--}-->

<!--</style>-->

