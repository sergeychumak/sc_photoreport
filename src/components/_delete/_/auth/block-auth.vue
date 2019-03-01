<template>
  <v-layout>
    <v-flex>
      <div class="pl-4 pr-4">
        <v-text-field label="Е-mail" v-model="email" clearable outline></v-text-field>
        <v-text-field label="Password" v-model="password" clearable outline type="password" autocomplete="off"></v-text-field>
      </div>
      <v-toolbar flat height="40" class="white">
        <v-btn color="red darken-1" flat1 dark @click="$emit('close-dialog')">Закрыть</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="orange darken-1" dark @click="enter">Вход</v-btn>
      </v-toolbar>

    </v-flex>
  </v-layout>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'block-auth',
    data: () => ({
      email: null,
      password: null
    }),
    methods: {
      ...mapActions( 'auth' , { 'authEnter': "enter" } ),
      enter: function () {
        this.authEnter(this.$data)
      }
    }
  }
</script>
