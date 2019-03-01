export const listMixin = {
  data: function () {
    return {
      dialog_editForm: true,

      dialog_addNewForm: false,
    }
  },

  methods: {

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
      this.$store.dispatch("api/post_request_clear", {
        url: this.key + ".update",
        data: data
      }).then(() => {
        this.get_data();
      })
    },
    // __successDialog_deleteForm: function () {
    //   this.dialog_deleteForm = false
    //   this.loading = true
    //   this.$store.dispatch("api/post_request_clear", {
    //     url: this.key + ".delete",
    //     data: this.selected[0]
    //   }).then(() => {
    //     this.selected = []
    //     this.get_data();
    //   })
    // },
    __successDialog_addNewForm: function (data) {
      this.dialog_addNewForm = false
      this.loading = true
      this.$store.dispatch("api/post_request_clear", {
        url: this.key + ".create",
        data: data
      }).then(() => {
        this.get_data();
      })
    }

  }
}
