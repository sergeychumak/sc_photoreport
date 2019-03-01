import axios from "axios";
import qs from 'qs';
export const adminList = {

  data: function(){
    return {
      loading: false,
      offsetTop: 0,
      selectedItemsIds: [],
      selectedItemsObj: [],
      pagination: {
        rowsPerPage: 25,
        page: 1
      },
      showControlElements: false,
      data: [],
      dialog_editForm: false,
      dialog_deleteForm: false,
      dialog_addNewForm: false,
      dialog_addNewForm_ERRORS: {}
    }
  },
  mounted: function(){
    this.get_data()
  },
  methods: {

    get_data: function () {
      this.loading = true
      let sort = Object.assign(
        {"property":"name","direction":"ASC"},
        this.sort
      )

      this.$store.dispatch("master/get_url",  { url: this.key + ".list" })
        .then((url)=>{
          axios.post(
            url,
            qs.stringify({
              page: this.pagination.page,
              start: this.pagination.rowsPerPage * (this.pagination.page - 1),
              limit: this.pagination.rowsPerPage,
              sort: JSON.stringify([sort])
            }),
            {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
          ).then((res)=>{
            setTimeout(() => { this.loading = false }, 1000)
            this.pagination = Object.assign({}, this.pagination, { totalItems: res.data.total })
            this.data = res.data.data
          })
          
        })
    },

    onScroll (e) {
      this.offsetTop = this.offsetTop = e.target.scrollTop
    },

    add2selected: function(id,obj){
      var index = this.selectedItemsIds.indexOf(id);
      if (index !== -1) {
        this.selectedItemsIds.splice(index, 1);
        this.selectedItemsObj.splice(index, 1);
      }else{
        if (this.multipleSelect){
          this.selectedItemsIds.push(id)
          this.selectedItemsObj.push(obj)
        }else{
          this.selectedItemsIds = [id]
          this.selectedItemsObj = [obj]
        }
      }
      this.showControlElements = this.selectedItemsIds.length > 0
    },

    inSelected: function(val){
      if (this.multipleSelect){
        return this.selectedItemsIds.includes(val)
      }else{
        return val === this.selectedItemsIds[0]
      }
    },

    __pagination_change_rowsPerPage(page){
      this.pagination = Object.assign({},this.pagination, {
        rowsPerPage: page,
        page: 1
      })
      this.get_data()
    },
    __pagination_change_page(type){
      let number = this.pagination.page;
      switch (type) {
        case "down" :
          number = number - 1
          if (number < 1)
            number = 1
          break
        case "up" :
          number = number + 1
          let countPage = this.pages
          if (number > countPage)
            number = countPage
          break
      }
      this.pagination = Object.assign({},this.pagination, {
        page: number
      })
      this.get_data()
    },

    // Закрытие диалогов
    __closeDialog_editForm: function ()   { this.dialog_editForm = false    },
    __closeDialog_deleteForm: function () { this.dialog_deleteForm = false  },
    __closeDialog_addNewForm: function () { this.dialog_addNewForm = false  },

    // Открытие диалогов
    __openDialog_editForm: function ()    { this.dialog_editForm = true     },
    __openDialog_deleteForm: function ()  { this.dialog_deleteForm = true   },
    __openDialog_addNewForm: function ()  { this.dialog_addNewForm = true   },

    // Ответ от диалога
    __successDialog_editForm: function (data) {
      this.dialog_editForm = false
      this.loading = true

      this.$store.dispatch("master/get_url",  { url: this.key + ".update" })
        .then((url)=>{
          axios.post(url,data).then((res)=>{
            this.get_data();
          })
        })
    },
    __successDialog_deleteForm: function () {
      // console.log(909)
      this.dialog_deleteForm = false
      this.loading = true

      this.$store.dispatch("master/get_url",  { url: this.key + ".delete" })
        .then((url)=>{
          axios.post(url,this.selectedItemsObj[0]).then((res)=>{
            this.selectedItemsIds = []
            this.selectedItemsObj = []
            this.get_data();
          })
        })

      // this.$store.dispatch("api/post_request_clear", {
      //   url: this.key + ".delete",
      //   data: this.selectedItemsObj[0]
      // }).then(() => {
      //   this.selectedItemsIds = []
      //   this.selectedItemsObj = []
      //   this.get_data();
      // })
    },
    __successDialog_addNewForm: function (data) {

      this.dialog_addNewForm_ERRORS = {}

      this.$store.dispatch("master/get_url",  { url: this.key + ".create" })
        .then((url)=>{
          axios.post(url,data).then((res)=>{
            this.dialog_addNewForm = false
            this.get_data();
          })
        }).catch((res) => {
        this.dialog_addNewForm_ERRORS = res.errors
      })
      //
      // this.$store.dispatch("api/post_request_clear", {
      //   url: this.key + ".create",
      //   data: data
      // }).then(() => {
      //
      // }).catch((res) => {
      //   this.dialog_addNewForm_ERRORS = res.errors
      // })


    },

    setSortBy: function(payload){
      let idColumn = payload.id
      let direction = this.sort.direction
      if (idColumn === this.sort.property) {
        if (direction === "ASC") {
          direction = "DESC"
        }else{
          direction = "ASC"
        }
      }
      this.sort = Object.assign(this.sort, {
        property: idColumn,
        direction: direction
      })
      this.get_data()
    }

  },
  computed: {
    showFakeHead: function () {
      return this.offsetTop > 48
    },
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  updated: function(){
    if (this.showFakeHead){
      let
        thead = this.$refs.thead.children,
        theadApps = this.$refs.theadApps.children
      for (let i=0; i<=thead.length-1;i++ ){
        theadApps[i].style.width = thead[i].offsetWidth + "px"
      }
    }
    //this.$emit('sync-content')
  }

}
