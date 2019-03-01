<template>
  <v-content class="vhHeight white">
    <v-container fluid fill-height class="ma-0 pa-0">
      <router-view ref="rView"></router-view>

      <!-- in router used v-layout... example -->
      <!--<v-layout>
        <v-flex shrink class="overflowAuto">
          <v-navigation-drawer permanent></v-navigation-drawer>
        </v-flex>
        <v-flex class="overflowAuto"></v-flex>
      </v-layout>-->

    </v-container>
  </v-content>
</template>

<script>
  export default {
  name: 'content-components'
}
</script>
