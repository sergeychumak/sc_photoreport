<template>
  <v-layout column fill-height >

    <!--<v-flex shrink>-->
      <!--<v-data-table-->
        <!--:headers="headers"-->
        <!--:items="['']"-->
        <!--hide-actions-->
        <!--item-key="id"-->
      <!--&gt;-->
        <!--<template slot="headers" slot-scope="props">-->
          <!--<tr>-->
            <!--<th></th>-->
            <!--<th v-for="header in props.headers">-->
              <!--{{header.text}}-->
            <!--</th>-->
          <!--</tr>-->
        <!--</template>-->
      <!--</v-data-table>-->
    <!--</v-flex>-->

    <v-flex v-if="bodyEmpty" class="asd overflowAuto" >
      <v-data-table
        :headers="headers"
        :items="data"
        hide-actions
        item-key="value"
      >
        <template slot="headers" slot-scope="props">
          <tr>
            <th></th>
            <th v-for="item in props.headers">
              {{item.text}}
            </th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
        <tr>
          <td class="pa-0 ma-0">
            <v-btn icon flat color="primary">
              <v-icon small>edit</v-icon>
            </v-btn>
          </td>
          <td v-for="itemHeader in headers">
            {{props.item[itemHeader.value]}}
          </td>
        </tr>
        </template>
      </v-data-table>
    </v-flex>
    <v-flex shrink>2</v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'wrap-table-component',
    data: function(){
      return {
      }
    },
    props: {
      headersKey: {
        type: String,
        default : ""
      },
      headers: {
        type: Array,
        default : () => {
          return []
        }
      },
      data: {
        type: Array,
        default : () => {
          return []
        }
      }
    },
    computed: {
      bodyEmpty: function(){
        return this.data.length > 0
      }
    }
  }
</script>

