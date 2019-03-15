<template>
  <v-app>

    <svg
      id="svgWrap"
      viewBox="0 0 500 500"
      :width="500"
      :height="500"
    >

      <image
        xlink:href="https://avatars.mds.yandex.net/get-pdb/69339/b53888a9-aefb-4b33-8668-51528269f56c/s1200"
        width="100%"
        height="100%"
        x="0"
        y="0"
      />

        <g class="group">
        <circle cx="250" cy="250" r="50" class="group__circle"></circle>
        <circle cx="200" cy="250" r="20" class="circle_color_red"></circle>
        <text x="200" y="250" class="group__text">1</text>
        </g>


    </svg>



  </v-app>
</template>

<script>

  export default {
    name: 'Layout_V1',
    data: function(){
      return {
      }
    },
    mounted: function(){
    },
    created () {
    },
    methods:{
    },
    computed: {
    }
  }
</script>

<style lang="scss">
#svgWrap{
  border: 1px solid #555;
  margin: 10px;
}

 .circle{
    stroke: #F00;
    stroke-width: 2;
    stroke-linecap: round;
    fill-opacity:0.5;
    fill: #FFF;
    &:hover {
      fill-opacity:0.7;
      cursor: pointer;
    }
    &_color{
      &_red {
        fill: #F00;
      }
    }
  }


/*.group {*/
  /*&__text {*/
    /*color: #FFF;*/
  /*}*/
  /*&__circle {*/
    /*stroke: #F00;*/
    /*stroke-width: 2;*/
    /*stroke-linecap: round;*/
    /*fill-opacity:0.5;*/
    /*fill: #FFF;*/
  /*}*/
/*}*/


</style>

