<template>
  <div>redirect</div>
</template>
<script>
import { mapGetters, mapActions  } from 'vuex'
export default {
  name: 'LayoutMainBefore',
  mounted: function(){
    if ( !this.$cookies.isKey(this.langCookieName)  ){
      this.$cookies.set(this.langCookieName, this.langDefault)
    }
    this.$router.push({
      name: "main",
      params: {
        lang: this.$cookies.get(this.langCookieName)
      }
    })
  },
  computed: {
    ...mapGetters('lang' , {
      langDefault : 'langDefault',
      langCookieName : 'cookieName'
    })
  }
}
</script>
