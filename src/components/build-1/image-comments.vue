<template >

  <v-layout>
    <v-flex class="blue lighten-5 pa-2">

      <v-layout columns v-for="item in list">
        <v-flex class="pa-2 mr-2"><v-icon>sms</v-icon></v-flex>
        <v-flex  class="pa-2" style="width: 100%">
          <div class="body-2">{{item.authorName}}</div>
          <div class="body-1">{{item.text}}</div>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex>
          <v-textarea class="ml-2 mr-2" solo v-model="newComment" hide-details></v-textarea>
          <v-btn small color="primary" @click="_add_new_comment">{{$t('BTN.ADD_COMMENT')}}</v-btn>
        </v-flex>
      </v-layout>

    </v-flex>
  </v-layout>



</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'images-list',
    data () {
      return {
        // comment
        list:[
          {authorName: "Admin", text: "asdadsasdas"},
          {authorName: "Admin", text: "asdadsasdas"},
        ],
        newComment: ""
      }
    },
    mounted: function(){
      this._get_list_comments(this.$route.query.photoId)
    },
    watch: {
      "$route.query.photoId": function(photoId){
        this._get_list_comments(photoId)
      }
    },
    methods:{

      ...mapActions( "master", {
        get_list_comments: "get_list_comments",
        add_new_comment: "add_new_comment"
      }),

      _get_list_comments: function(photoId){
        this.get_list_comments(parseInt(photoId)).then(res=>{this.list = res.data})
      },

      _add_new_comment: function(){
        if (this.newComment === "")
          return false
        var photoId = this.$route.query.photoId
        this.add_new_comment({
          photoId: photoId,
          text: this.newComment
        })
        .then(()=>{
          this.newComment = ""
          this._get_list_comments(photoId)
        })
      }
    }
  }
</script>
