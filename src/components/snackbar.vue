<template>
  <v-snackbar
    v-model="SNACKBAR"
    :color="COLOR"
    :timeout="TIMEOUT"
    right
  >
    {{ TEXT }}
    <v-btn dark flat @click="close">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'SnackbarComponents',
    computed: {
      ...mapGetters( "main", {
        SNACKBAR: "snackbar",
        TEXT: "text",
        COLOR: "color",
        TIMEOUT: "timeout"
      })
    },
    methods: {
      ...mapActions( "main", {
        CLOSE: "snackbar_close"
      }),
      close: function(){
        this.CLOSE()
      }
    }
  }
</script>
