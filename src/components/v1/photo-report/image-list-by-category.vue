<template >

  <v-container fluid fill-height class="pa-0 ma-0">
    <v-layout column>

      <v-flex class="white" shrink>
        <v-card flat width="100%" class="elevation-5 grey lighten-4">
          <v-card-actions class="pr-3">
            <h4 class="headline mb-0 pl-3">ACC / ACC-M</h4>
            <v-spacer></v-spacer>
            <v-btn icon large1 @click="$emit('close-dialog')"><v-icon large1>close</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <div class="container pa-0 ma-0 fluid fill-height white" style="overflow: hidden">
        <v-layout>
          <v-flex shrink class="elevation-5 grey lighten-4" style="width: 300px; overflow: auto">

            <v-menu
              v-model="showMenu"
              :position-x="xMenu"
              :position-y="yMenu"
              absolute
              offset-y
            >
              <v-list>
                <v-list-tile
                  v-for="(item, index) in items"
                  :key="index"
                  @click=""
                >
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>

           808<br/>808<br/>808<br/>808<br/>808<br/>808<br/>
            808<br/>808<br/>808<br/>808<br/>808<br/>808<br/>
            808<br/>808<br/>808<br/>808<br/>808<br/>808<br/>
            808<br/>808<br/>808<br/>808<br/>808<br/>808<br/>
            808<br/>808<br/>808<br/>808<br/>808<br/>808<br/>
            808<br/>808<br/>808<br/>808<br/>808<br/>808<br/>
            808<br/>808<br/>808<br/>808<br/>808<br/>808<br/>
            808<br/>808<br/>808<br/>808<br/>808<br/>808<br/>
            808<br/>808<br/>808<br/>808<br/>808<br/>808<br/>
            808<br/>808<br/>808<br/>808<br/>808<br/>808<br/>
            808<br/>808<br/>808<br/>808<br/>808<br/>808<br/>
            808<br/>808<br/>808<br/>808<br/>808<br/>808<br/>
            808<br/>808<br/>808<br/>808<br/>808<br/>808<br/>
            808<br/>808<br/>808<br/>808<br/>808<br/>808<br/>
          </v-flex>
          <v-flex style="overflow: hidden;position: relative">

            <div>

            </div>

            <div class="slider__item slider__item_active">
              <div class="scalable-preview scalable-preview_active slider__preview">
                <div
                  class="scalable-preview__image"
                  :style="style"
                  id="isDragImages"
                  @mousedown="startDrag"
                  @mousemove="doDrag"
                  @mouseleave="mouseleave"
                  @mouseenter="mouseenter"
                >
                  <svg
                    class="graph"
                    id="svgWrap"
                    viewBox="0 0 300 300"
                    :width="svgWidth"
                    :height="svgHeight"
                  >
                    <image
                      xlink:href="https://avatars.mds.yandex.net/get-pdb/69339/b53888a9-aefb-4b33-8668-51528269f56c/s1200"
                      width="100%"
                      height="100%"
                      x="0"
                      y="0"
                      @contextmenu="show"
                    />
                    <circle
                      v-for="item in circleList"
                      :cx="item.cx"
                      :cy="item.cy"
                      :r="item.r"
                      class="pointer"
                      stroke="red"
                      stroke-width="2"
                      fill-opacity="0.30"
                      fill="red"
                      @mousedown="startDragElement"
                    ></circle>
                  </svg>
                </div>
              </div>
            </div>

          </v-flex>
        </v-layout>
      </div>

    </v-layout>
  </v-container>

</template>

<script>
  export default {
    name: 'images-list-by-category',
    data: function(){
      return {

        flag: false, // флаг для включения выключения event`s
        flagMoveElement: false,

        imageX:0,
        imageY:0,

        dragging: false,
        x: 0,
        y: 0,

        circleList: [
          {cx: 50, cy: 200, r: 20},
          {cx: 100, cy: 100, r: 30},
          {cx: 150, cy: 150, r: 10},
          {cx: 200, cy: 200, r: 20},
        ],

        // circlePos: {
        //   cx: 150,
        //   cy: 150,
        //   r: 50
        // },

        svgWidth: 800,
        svgHeight:800,

        showMenu: false,
        xMenu: 0,
        yMenu: 0,
        items: [
          { title: 'asdas' },
          { title: 'asdas' },
          { title: 'asdas' },
          { title: 'asdas' },
          { title: 'asdas' },
          { title: 'привет как дела все нормально' },
          { title: 'asdas' },
          { title: 'asdas' },
          { title: 'asdas' },
          { title: 'asdas' },
          { title: 'asdas' },
          { title: 'asdas' },
          { title: 'asdas' },
          { title: 'asdas' },
          { title: 'asdas' }
        ]

      }
    },
    mounted() {
      window.addEventListener('mousedown', this.mousedown);
      document.addEventListener('wheel', this.mousewheels);
      window.addEventListener('mouseup', this.stopDrag);
      document.getElementById('isDragImages').ondragstart = function() { return false; };
    },
    methods:{

      mouseleave: function(){
        this.flag = false
      },
      mouseenter: function(){
        this.flag = true
      },
      mousewheels: function(event){

        if (!this.flag) return false

        if (event.deltaY < 0 ){
          this.svgWidth = this.svgWidth + 25
          this.svgHeight = this.svgHeight + 25
        }else{
          this.svgWidth = this.svgWidth - 25
          this.svgHeight = this.svgHeight - 25
        }
      },
      mousedown: function(event){
        if (this.flagMoveElement) return false
        this.x = event.clientX;
        this.y = event.clientY;
      },

      show (e) {
        e.preventDefault()
        this.showMenu = false
        this.xMenu = e.clientX
        this.yMenu = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      },



      startDrag() {
        if (this.flagMoveElement) return false
        this.dragging = true;
        this.x = this.y = 0;
      },
      stopDrag() {
        if (this.flagMoveElement) return false
        this.dragging = false;
        this.x = this.y = 'no';
      },
      doDrag(event) {
        if (this.flagMoveElement) return false
        if (this.dragging) {
          this.imageX = this.imageX + this.x - event.clientX
          this.imageY =  this.imageY + event.clientY - this.y
          this.x = event.clientX;
          this.y = event.clientY;
        }
      },

      startDragElement: function(evt) {

        this.flagMoveElement = true
        var selectedElement, offset, transform;
        const svg = document.querySelector('#svgWrap')
        selectedElement = evt.target;
        offset = getMousePosition(evt);
        var transforms = selectedElement.transform.baseVal;
        //if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
          var translate = svg.createSVGTransform();
          translate.setTranslate(0, 0);
          selectedElement.transform.baseVal.insertItemBefore(translate, 0);
       // }
        transform = transforms.getItem(0);
        offset.x -= transform.matrix.e;
        offset.y -= transform.matrix.f;

        function getMousePosition(evt) {
          var CTM = svg.getScreenCTM();
          if (evt.touches) { evt = evt.touches[0]; }
          return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
          };
        }

        function drag(evt) {
           if (selectedElement) {
             evt.preventDefault();
             var coord = getMousePosition(evt);
             transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
           }
        }

        function endDrag(evt) {
          selectedElement = false;
          this.flagMoveElement = false
        }

        svg.addEventListener('mousemove', drag);
        svg.addEventListener('mouseup', endDrag.bind(this))

      }

    },
    computed: {
      style () {
        return {
          transition: 'all 0s ease 0s',
          transform: 'translate3d( ' + -this.imageX + 'px, ' + this.imageY + 'px, 0px)'
        }
      },
      viewBox(){
        return "0 0 " + this.viewBoxY1 + " " + this.viewBoxY2
      }
    }
  }
</script>


<style>
  .slider__item_active {
    opacity: 1;
    z-index: 1;
  }
  .slider__item {
    text-align: center;
  }
  .slider__item, .slider__items {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .scalable-preview {
    position: relative;
    max-width: 100%;
    height: 100%;
  }

  .scalable-preview__image {
    display: block;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }





  #appASD {
    //width: 300px;
    margin: 0 auto;
  }
  .graph {
    //background-color: #222;
    //width: 300px;
    //height: 300px;
  }
  .pointer {
    background: red;
    cursor: pointer;
  }




  .portrait.v-card{
    margin: 0 auto;
    max-width: 600px;
    width: 100%;
  }




</style>
