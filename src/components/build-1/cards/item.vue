<template>
    <div class="card" @click="$emit('click-card')">
      <div class="card__image">
        <!--<div class="card__imageLoading">Загрузка..</div>-->
        <div
          class="card__imageContent"
          :style="{ 'backgroundImage': 'url(' + image + ')' }"
        ></div>
      </div>
      <div class="card__hLine">
        <div>№ {{shopNumber}}</div>
        <div class="card__commentIsPresent" v-if="commentIsPresent">
          <div class="card__commentIsPresentIcon"></div>
        </div>
      </div>
      <div class="card__hLine">{{category}}</div>
      <div class="card__hLine">{{subCategory}}</div>
    </div>
</template>

<script>
  export default {
    name: 'cards-item-components',
    props: {
      shopNumber: {
        type: Number,
        required: true
      },
      category: {
        type: String,
        default: ""
      },
      subCategory: {
        type: String,
        default: ""
      },
      commentIsPresent: {
        type: Boolean,
        default: false
      },
      image: {
        type: String,
        default: ""
      },
    },
    methods: {
      asd:function(){
        console.log(909)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .card {
    background-color: #fafafa;
    width: 230px;
    border: 1px solid #ddd;

    margin-bottom: 2%;
    margin-right: 1%;
    font-size: 12px;
    font-weight: 400;
    position: relative;
    cursor: pointer;

    padding-bottom: 1%;
    &__hLine {
      display: flex;
      justify-content: space-between;
      margin: 0 4%;
    }

    &__commentIsPresent {
      flex-basis: 8%;
      &Icon {
        color: #1976d2;
        margin-left: 5px;
        margin-top: 5px;
        width: 10px;
        height: 10px;
        background-color: currentColor;
        border: solid 1px currentColor;
        border-radius: 6px 6px 6px 0;
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
      }
    }

    &__image {
      margin: 4%;
      background-color: #ffffff;
      height: 200px;
      border: 1px dashed #ddd;
      position: relative;
      /*&Loading{*/
        /*position: absolute;*/
        /*top: 35px;*/
        /*left: 0;*/
        /*right: 0;*/
        /*text-align: center;*/
        /*color: #dddddd;*/
      /*}*/
      &Content{
        /*background-image: url("https://avatars.mds.yandex.net/get-pdb/163339/719f75e4-28db-4c91-9b9f-f046ed586ec5/s1200");*/
        background-repeat: no-repeat;
        background-position: center;
        background-size: 95%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }

    }




  }

</style>
