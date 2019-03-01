<template>
  <v-menu transition="slide-x-transition">
    <v-btn slot="activator" icon flat color="blue"><v-icon>help_outline</v-icon></v-btn>
    <v-list dense>

      <v-list-tile @click="dialog = true">
        <v-icon class="pr-2">photo_camera</v-icon>
        <v-list-tile-title >{{ $t('ABOUT.ABOUT_THE_PROGRAM') }}</v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="openUrl(list[0])">
        <v-icon class="pr-2">lock_open</v-icon>
        <v-list-tile-title>{{ $t('ABOUT.PHOTO_REPORT_PREPARATION_RULES') }}</v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="openUrl(list[1])">
        <v-icon class="pr-2">help_outline</v-icon>
        <v-list-tile-title>{{ $t('ABOUT.USER_GUIDE') }}</v-list-tile-title>
      </v-list-tile>

    </v-list>

    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-title class="headline pa-3">
          {{$t('ABOUT.LABEL')}}
          <v-spacer></v-spacer>
          <v-btn icon @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pl-3 pr-3 pt-0 pb-3">
          {{$t('ABOUT.TEXT')}}
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-menu>
</template>

<script>
export default {
  name: 'select-reference',
  data: () => ({
    dialog: false,
    list: [
      "http://localhost:8080/fosm2/resources/instructions/rules_ru.pdf",
      "http://localhost:8080/fosm2/resources/instructions/user_manual__ru.pdf"
    ]
  }),
  methods: {
    openUrl: function(url){
      let win = window.open(url, '_blank');
      win.focus();
    }
  }

}
</script>

