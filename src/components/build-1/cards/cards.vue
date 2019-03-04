<template>
    <div class="cards">
      <template v-for="item in list">
          <Card
            :key="item.id"
            v-on:click-card="showImage(item.id)"
            :shopNumber="item.shopNumber"
            :category="item.categoryName"
            :subCategory="item.categoryName0"
            :commentIsPresent="item.numOfComments > 0"
            :image="getImage(item)"
          ></Card>
      </template>
    </div>
</template>

<script>

  import CardComponents from '@/components/build-1/cards/item'

  export default {
    name: 'cards-components',
    props: {
      list: {
        type: Array,
        default: () =>{
          return []
        }
      }
    },
    components: {
      Card: CardComponents
    },
    methods: {
      showImage: function(id){
        this.$emit('click-card', id)
      },
      getImage: function(item){
        return window.photo_url + '/' + item.date + '/' + item.shopId + '/' + item.fileName + '.jpg'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cards {
    display: flex;
    flex-wrap: wrap;
    align-items:stretch;
  }
</style>
