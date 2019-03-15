<template>
  <div class="c">
    <svg
      @mouseleave="onMouseLeave"
      @mouseenter="onMouseEnter"
      class="svgWrap"
      ref="svgWrap"
      viewBox="0 0 500 500"
      :width="500"
      :height="500"
      :style="style"
    >
      <image
        xlink:href="https://www.motonews.ru/imgs/new_13311_0b.jpg"
        width="100%"
        height="100%"
        x="0"
        y="0"
      />
      <g class="group" v-for="(item, index) in g" :key="index">
        <circle
          v-show="index == zoomCurrentIndex"
          :cx="g_fake.x"
          :cy="g_fake.y"
          :r="g_fake.r"
          class="group__circle_fake"
          :style="styleStrokeWidth"
        ></circle>

        <circle
          v-show="index != zoomCurrentIndex"
          @mousedown="startDragElement"
          :data-id="index"
          :cx="item.x"
          :cy="item.y"
          :r="item.r"
          class="group__circle"
          :style="styleStrokeWidth"
        ></circle>
        <circle
          v-show="!(index == currentIndex) && index != zoomCurrentIndex"
          :ref="'c' + index"
          :cx="item.x - item.r"
          :cy="item.y"
          :r="circleTextRadius"
          class="group__circleNumber"
        ></circle>
        <text
          v-show="!(index == currentIndex) && index != zoomCurrentIndex"
          :ref="'t' + index"
          :x="item.x - item.r"
          :y="item.y"
          style="fill:white"
          text-anchor="middle"
          dy="0.4em"
          font-size="13"
        >
          {{ index }}
        </text>
        <circle
          v-show="!(index == currentIndex) && index != zoomCurrentIndex"
          :data-zoomId="index"
          :cx="item.x + item.r"
          :cy="item.y"
          :r="circleZoomRadius"
          class="group__circleNumber"
          @mousedown="startDragElement"
        ></circle>
      </g>
    </svg>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        g: [{ x: 250, y: 250, r: 50 }, { x: 70, y: 120, r: 30 }], // go to props
        g_fake: {x:0, y:0, r:0},

        // данные для элементов
        svgWrap: null,
        selectedElement: null,
        offset: null,
        transform: null,
        currentIndex: null,
        zoomCurrentIndex: null,
        isZoomDragElement: false,

        //данные для картинки
        transformX:0,
        transformY:0,
        tmpX:0,
        tmpY:0,
        dragging: false,
        zoomImage: 1

      };
    },
    methods: {

      //Обнудение данных
      zeroingData: function() {
        this.svgWrap = null
        this.selectedElement = null
        this.offset = null
        this.transform = null
        this.currentIndex = null
        this.zoomCurrentIndex = null
        this.isZoomDragElement = false
        this.g_fake = Object.assign({},{ x:0, y:0, r:0 })
      },

      //Получение CTM координат
      getMousePosition: function(event) {
        var CTM = this.svgWrap.getScreenCTM();
        if (event.touches) {
          event = event.touches[0];
        }
        return {
          x: (event.clientX - CTM.e) / CTM.a,
          y: (event.clientY - CTM.f) / CTM.d
        };
      },

      //Start ELEMENT
      startDragElement: function(event) {

        this.svgWrap = this.$refs.svgWrap;
        this.selectedElement = event.target;

        if ( this.selectedElement.getAttribute('data-zoomId') )
          this.isZoomDragElement = true

        if ( this.isZoomDragElement ){
          this.zoomCurrentIndex = this.selectedElement.getAttribute('data-zoomId');
        }else{
          this.currentIndex = this.selectedElement.getAttribute('data-id');
        }

        this.offset = this.getMousePosition(event);
        var transforms = this.selectedElement.transform.baseVal;
        var translate = this.svgWrap.createSVGTransform();

        translate.setTranslate(0, 0);
        this.selectedElement.transform.baseVal.insertItemBefore(translate, 0);
        this.transform = transforms.getItem(0);
        this.offset.x -= this.transform.matrix.e;
        this.offset.y -= this.transform.matrix.f;

        if ( this.isZoomDragElement ){
          this.$set(this.g_fake, "x", this.g[this.zoomCurrentIndex].x);
          this.$set(this.g_fake, "y", this.g[this.zoomCurrentIndex].y);
          this.$set(this.g_fake, "r", this.g[this.zoomCurrentIndex].r);
          this.transform.setTranslate(0, 0);
        }

        this.svgWrap.addEventListener("mousemove", this.dragElement);
        this.svgWrap.addEventListener("mouseup", this.endDragElement);
      },

      //Drag ELEMENT
      dragElement: function(event) {
        event.preventDefault();
        var coord = this.getMousePosition(event);
        if ( this.isZoomDragElement ){
          this.transform.setTranslate(coord.x - this.offset.x, 0);
          this.$set(this.g_fake, "r", this.g[this.zoomCurrentIndex].r + coord.x - this.offset.x);
          this.transform.setTranslate(0, 0);
        }else{
          this.transform.setTranslate(coord.x - this.offset.x, coord.y - this.offset.y);
        }
      },

      //End ELEMENT
      endDragElement: function() {
        if (!this.svgWrap)
          return false
        this.svgWrap.removeEventListener("mousemove", this.dragElement);
        this.svgWrap.removeEventListener("mouseup", this.endDragElement);
        if ( this.isZoomDragElement ){
          this.$set(
            this.g[this.zoomCurrentIndex],
            "r",
            Number((this.g_fake.r).toFixed(0))
          );
          this.transform.setTranslate(0, 0);
        }else{
          this.$set(
            this.g[this.currentIndex],
            "x",
            Number((this.g[this.currentIndex].x + this.transform.matrix.e).toFixed(0))
          );
          this.$set(
            this.g[this.currentIndex],
            "y",
            Number((this.g[this.currentIndex].y + this.transform.matrix.f).toFixed(0))
          );
          this.transform.setTranslate(0, 0);
        }
        this.zeroingData()
      },


      onMouseLeave: function(){
        this.endDragElement()
        this.$refs.svgWrap.removeEventListener("mousedown", this.onMouseDown);
        this.$refs.svgWrap.removeEventListener("mousemove", this.onMouseMove);
        this.$refs.svgWrap.removeEventListener('mouseup', this.onMouseUp);
        this.$refs.svgWrap.removeEventListener('wheel', this.onMouseWheels);
        this.dragging = false
      },
      onMouseEnter: function(){
        this.$refs.svgWrap.addEventListener("mousedown", this.onMouseDown);
        this.$refs.svgWrap.addEventListener("mousemove", this.onMouseMove);
        this.$refs.svgWrap.addEventListener('mouseup', this.onMouseUp);
        this.$refs.svgWrap.addEventListener('wheel', this.onMouseWheels);
      },
      onMouseDown: function(event){
        event.preventDefault();
        this.dragging = true
        this.tmpX = event.clientX
        this.tmpY = event.clientY
      },
      onMouseMove: function(event){
        event.preventDefault();
        if (this.dragging && !this.svgWrap) {
          this.transformX = this.transformX + this.tmpX - event.clientX
          this.transformY =  this.transformY + event.clientY - this.tmpY
          this.tmpX = event.clientX;
          this.tmpY = event.clientY;
        }
      },
      onMouseUp: function(){
        this.dragging = false
      },
      onMouseWheels: function(event){
        var step = 0.25
        var res = this.zoomImage - ( event.deltaY > 0 ? step : -step)
        this.zoomImage = res < 1 ? 1:res
      },

    },
    computed: {
      style() {
        return {
          transition: 'all 0s ease 0s',
          transform: 'translate3d( ' + -this.transformX + 'px, ' + this.transformY + 'px, 0px) scale('+this.zoomImage+')'
        }
      },
      circleZoomRadius: function(){
        if (this.zoomImage > 10){
          return 1
        }
        else if (this.zoomImage > 5){
          return 1.5
        }
        else if (this.zoomImage > 4){
          return 2
        }
        else if (this.zoomImage > 3){
          return 3
        }
        else if (this.zoomImage > 2){
          return 4
        }
        else{
          return 5
        }
      },
      circleTextRadius: function(){
        if (this.zoomImage > 10){
          return 5
        }
        else if (this.zoomImage > 5){
          return 8
        }
        else if (this.zoomImage > 4){
          return 9
        }
        else if (this.zoomImage > 3){
          return 11
        }
        else if (this.zoomImage > 2){
          return 13
        }
        else{
          return 15
        }
      },

      styleStrokeWidth() {
        let res = 2
        if (this.zoomImage > 10){
          res = 0.75
        }
        else if (this.zoomImage > 5){
          res = 1
        }
        else if (this.zoomImage > 4){
          res = 1.25
        }
        else if (this.zoomImage > 3){
          res = 1.5
        }
        else if (this.zoomImage > 2){
          res = 1.75
        }

        return {
          strokeWidth: res
        }
      }


    }
  };
</script>


<style lang="scss">

  .c{
    border: 1px dashed #eee;
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    margin: auto;
    overflow: hidden;
  }

  .svgWrap {
    border: 1px dashed #555;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .group {
    &__circle {
      stroke: #f00;
      /*stroke-width: 2;*/
      stroke-linecap: round;
      fill-opacity: 0.3;
      fill: #fff;
      -webkit-transition: fill-opacity 0.2s ease;
      -moz-transition: fill-opacity 0.2s ease;
      transition: fill-opacity 0.2s ease;
      &:hover {
        fill-opacity: 0.7;
      }
      &_fake {
        stroke-width: 2;
        fill-opacity: 0.5;
        stroke: #f00;
        fill: #fff;
      }
    }
    &__circleNumber {
      fill: #f00;
      color: #ffffff;
    }
  }
</style>

