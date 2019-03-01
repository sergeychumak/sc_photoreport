<!--
<YesOrNo
  :dialogYesOrNo.sync="dialogYesOrNo_delete"
  :title="title2dialogYesOrNo_delete"
  v-on:click-yes="__dialogYesOrNo_delete_Y"
></YesOrNo>
-->

<template>
  <v-card>
    <v-card-title class="headline red--text">{{title}}</v-card-title>
    <v-card-actions>
      <v-btn color="green darken-1" dark @click="N">{{$t('BTN.NO')}}</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="red darken-1" dark @click="Y">{{$t('BTN.YES')}}
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
export default {
  name: 'dialog-yes-or-no',
  props: {
    "dialogYesOrNo": {
      type: Boolean,
      default() { return false }
    },
    "title": {
      type: String,
      default() { return this.$t('YES_OR_NO_DELETE') }
    },
  },
  methods:{

    Y: function(){
      this.$emit("click-yes")
      this.N()
    },
    N: function(){
      this.$emit("update:dialogYesOrNo", false)
    }
  }
}
</script>
