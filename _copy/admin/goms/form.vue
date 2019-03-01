<template>

  <v-card>
    <v-card-title class="pa-0" style="z-index: 10">
      <v-toolbar height="50" light>
        <v-toolbar-title>
          <div class="title pb-0">{{$t('TITLE.' + type)}}</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn @click="$emit('close-dialog')" flat icon color="red">
            <v-icon color="blue">close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-xl text-xs-left class="pr-0">
        <v-layout row wrap >

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.CATEGORY_PHOTO.name')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.name" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.CATEGORY_PHOTO.name_en')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.name_en" hide-details></v-text-field>
          </v-flex>

          <v-flex xs3 class="pl-0"><v-subheader class="pl-0">{{$t('TABLE.CATEGORY_PHOTO.name_zh')}}</v-subheader></v-flex>
          <v-flex xs9>
            <v-text-field solo v-model="form.name_zh" hide-details></v-text-field>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions class="pa-0">
      <v-toolbar height="50" light class="pa-2">
        <v-btn @click="$emit('close-dialog')" dark  color="red">{{$t('BTN.CLOSE')}}</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="save" dark color="green">{{$t('BTN.' + type)}}</v-btn>
      </v-toolbar>
    </v-card-actions>
  </v-card>

</template>

<script>
  export default {
    name: 'admin-goms-page-edit',
    props:["selected","type"],
    watch: {
      selected: function(newVal){
        if (newVal.length === 1){
          this.form.id = String(newVal[0].id)
          this.form.name = newVal[0].name
          this.form.name_en = newVal[0].name_en
          this.form.name_zh = newVal[0].name_zh
        }
      }
    },
    data: function(){
      return {
        form: {
          id: null,
          name: null,
          name_en: null,
          name_zh: null,
        }
      }
    },
    methods:{
      save: function(){
        this.$emit('success-dialog', this.$data.form)
      }
    }
  }
</script>
