<template>
  <v-toolbar app absolute dense class="elevation-0" color="grey lighten-5" >
    <v-toolbar-title class="caption">{{$t('NAME')}}</v-toolbar-title>
    <v-toolbar-title ref="isHook__Name" class="caption ml-1"></v-toolbar-title>
    <v-spacer></v-spacer>
    <div ref="isHook__Actions"></div>
  </v-toolbar>
</template>

<script>
  export default {
  name: 'toolbar-components',
}
</script>
