<template>

  <div class="isTable">
    <div class="isTable__content" id="scroll-target">

      <div class="isTable__contentWrap">

        <v-layout
          v-scroll:#scroll-target="onScroll"
          column
          align-center
          justify-center
          class="isTable__contentLayout"
        >
          <!--FAKE HEAD-->
            <transition name="fade">
              <div
                class="isTable__fakeHeads elevation-15"
                v-if="showFakeHead"
                :style="{top: offsetTop + 'px'}"
                ref="theadApps"
              >
                <div></div>
                <div v-for="itemHeader in headers">{{ itemHeader.text }}</div>
              </div>
            </transition>

          <!--TABLE-->
          <v-data-table
            :headers="headers"
            :items="data"
            hide-actions
            item-key="id"
          >
            <template slot="headers" slot-scope="props">
              <tr ref="thead">
                <td></td>
                <td v-for="itemHeader in headers">
                  <div style="white-space:nowrap;">{{ itemHeader.text }}</div>
                </td>
              </tr>
            </template>
            <template slot="items" slot-scope="props">
              <tr>
                <td>
                  <v-checkbox
                    @click.stop="add2selected(props.item[nameKeySelected])"
                    :input-value="inSelected(props.item[nameKeySelected])"
                    primary
                    hide-details
                  ></v-checkbox>
                </td>
                <td v-for="itemHeader in headers" style="white-space:nowrap;">
                  <template v-if="itemHeader.type === 'boolean'">
                    {{ props.item[itemHeader.id] ? $t('BTN.YES'): $t('BTN.NO') }}
                  </template>
                  <template v-else-if="itemHeader.type === 'date'">
                    {{ convertTimeToDate(props.item[itemHeader.id], "DD/MM/YYYY") }}
                  </template>
                  <template v-else>
                    {{ props.item[itemHeader.id] }}
                  </template>

                </td>
              </tr>
            </template>
          </v-data-table>

        </v-layout>

      </div>

    </div>
  </div>

</template>

<script>
  import {convertDate} from "@/mixins/date"

  export default {
    name: 'is-table-content',
    props: {
      headers: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        default: () => []
      },
      nameKeySelected: {
        type: String,
        default: () => "id"
      },
      multipleSelect: {
        type: Boolean,
        default: () => false
      }
    },
    mixins: [convertDate],
    data: function () {
      return {
        selected: [],
        offsetTop: 0
      }
    },

    methods:{

      add2selected: function(id){
          var index = this.selected.indexOf(id);
          if (index !== -1) {
            this.selected.splice(index, 1);
          }else{
            if (this.multipleSelect){
              this.selected.push(id)
            }else{
              this.selected = [id]
            }
          }
      },
      inSelected: function(val){
        if (this.multipleSelect){
          return this.selected.includes(val)
        }else{
          return val === this.selected[0]
        }
      },
      onScroll (e) { this.offsetTop = this.offsetTop = e.target.scrollTop },
      // __pagination_change_rowsPerPage(page){
      //   this.pagination = Object.assign({},this.pagination, {
      //     rowsPerPage: page,
      //     page: 1
      //   })
      //   this.get_data()
      // },
      // __pagination_change_page(type){
      //   let number = this.pagination.page;
      //   switch (type) {
      //     case "down" :
      //       number = number - 1
      //       if (number < 1)
      //         number = 1
      //       break
      //     case "up" :
      //       number = number + 1
      //       let countPage = this.pages
      //       if (number > countPage)
      //         number = countPage
      //       break
      //   }
      //   this.pagination = Object.assign({},this.pagination, {
      //     page: number
      //   })
      //   this.get_data()
      // },
    },
    computed: {
      showFakeHead: function () {
        return this.offsetTop > 48
      },
      // pages () {
      //   if (this.pagination.rowsPerPage == null ||
      //     this.pagination.totalItems == null
      //   ) return 0
      //   return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      // }
    },
    updated: function(){
      if (this.showFakeHead){
        let
          thead = this.$refs.thead.children,
          theadApps = this.$refs.theadApps.children
        for (let i=0; i<=thead.length-1;i++ ){
          theadApps[i].style.width = thead[i].offsetWidth + "px"
        }
      }
    },
    watch: {
      selected: function(){
        this.$emit('select-item', {
          selected: this.selected
        })
      }
    }
  }
</script>

<style scoped lang="scss">

  .isTable{
    display: flex;
    flex-direction: column;
    height: 100%;
    &__content {
      flex:2;
      display: flex;
      overflow: auto;
      &Wrap {
        flex: 1 1;
        overflow: initial;
      }
      &Layout {
        position: relative;
      }
    }
    &__footer {}
    &__fakeHeads {
      background: #f5f5f5;
      display: flex;
      position: absolute;
      height: 48px;
      z-index: 1;
      & div {
        padding: 0 24px;
        line-height: 48px;
      }
    }
  }

  .fade-enter-active {transition: opacity .5s;}
  .fade-leave-active {transition: opacity .05s;}
  .fade-enter, .fade-leave-to {opacity: 0;}

</style>
