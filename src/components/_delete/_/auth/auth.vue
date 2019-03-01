<template>
  <v-dialog v-model="showAuthDialog" persistent max-width="530px" min>
  <v-card>

    <v-toolbar height="40" color="white" class="elevation-0">
      <v-btn flat color="orange" :class="{'v-btn--active': active !== 'auth'}" @click="active='auth'">
        <v-icon color="orange" class="pr-2">how_to_reg</v-icon>
        Вход
      </v-btn>
      <v-btn flat color="green" :class="{'v-btn--active': active !== 'reg'}" @click="active='reg'">
        <v-icon color="green" class="pr-2">verified_user</v-icon>
        Регистрация
      </v-btn>
      <v-btn flat color="red" :class="{'v-btn--active': active !== 'lost'}" @click="active='lost'">
        <v-icon color="red" class="pr-2">mood_bad</v-icon>
        Забыл пароль?
      </v-btn>
    </v-toolbar>

    <v-card-text class="pb-1">
      <div class="text-md-center headline orange--text " v-if="active==='auth'">Вход в систему</div>
      <div class="text-md-center headline green--text" v-else-if="active==='reg'">Регистрация нового пользователя</div>
      <div class="text-md-center headline red--text" v-else="active==='lost'">Восстановление пароля</div>
    </v-card-text>

    <div class="pa-2">
      <blockAuth v-if="active==='auth'" v-on:close-dialog="closeDialog"></blockAuth>
      <blockReg v-else-if="active==='reg'"></blockReg>
      <blockLost v-else="active==='lost'"></blockLost>
    </div>

    <!--<v-layout justify-center>-->
      <!--<v-flex xs12>-->
        <!--<v-card ref="form">-->
          <!--<v-card-text>-->
            <!--<v-text-field-->
              <!--ref="name"-->
              <!--v-model="name"-->
              <!--:rules="[() => !!name || 'This field is required']"-->
              <!--:error-messages="errorMessages"-->
              <!--label="Full Name"-->
              <!--placeholder="John Doe"-->
              <!--required-->
            <!--&gt;</v-text-field>-->
            <!--<v-text-field-->
              <!--ref="address"-->
              <!--:rules="[-->
              <!--() => !!address || 'This field is required',-->
              <!--() => !!address && address.length <= 25 || 'Address must be less than 25 characters',-->
              <!--addressCheck-->
            <!--]"-->
              <!--v-model="address"-->
              <!--label="Address Line"-->
              <!--placeholder="Snowy Rock Pl"-->
              <!--counter="25"-->
              <!--required-->
            <!--&gt;</v-text-field>-->
            <!--<v-text-field-->
              <!--ref="city"-->
              <!--:rules="[() => !!city || 'This field is required', addressCheck]"-->
              <!--v-model="city"-->
              <!--label="City"-->
              <!--placeholder="El Paso"-->
              <!--required-->
            <!--&gt;</v-text-field>-->
            <!--<v-text-field-->
              <!--ref="state"-->
              <!--v-model="state"-->
              <!--:rules="[() => !!state || 'This field is required']"-->
              <!--label="State/Province/Region"-->
              <!--required-->
              <!--placeholder="TX"-->
            <!--&gt;</v-text-field>-->
            <!--<v-text-field-->
              <!--ref="zip"-->
              <!--:rules="[() => !!zip || 'This field is required']"-->
              <!--v-model="zip"-->
              <!--label="ZIP / Postal Code"-->
              <!--required-->
              <!--placeholder="79938"-->
            <!--&gt;</v-text-field>-->
            <!--<v-autocomplete-->
              <!--ref="country"-->
              <!--:rules="[() => !!country || 'This field is required']"-->
              <!--:items="countries"-->
              <!--v-model="country"-->
              <!--label="Country"-->
              <!--placeholder="Select..."-->
              <!--required-->
            <!--&gt;</v-autocomplete>-->
          <!--</v-card-text>-->
          <!--<v-divider class="mt-5"></v-divider>-->
          <!--<v-card-actions>-->
            <!--<v-btn flat>Cancel</v-btn>-->
            <!--<v-spacer></v-spacer>-->
            <!--<v-slide-x-reverse-transition>-->
              <!--<v-tooltip-->
                <!--v-if="formHasErrors"-->
                <!--left-->
              <!--&gt;-->
                <!--<v-btn-->
                  <!--slot="activator"-->
                  <!--icon-->
                  <!--class="my-0"-->
                  <!--@click="resetForm"-->
                <!--&gt;-->
                  <!--<v-icon>refresh</v-icon>-->
                <!--</v-btn>-->
                <!--<span>Refresh form</span>-->
              <!--</v-tooltip>-->
            <!--</v-slide-x-reverse-transition>-->
            <!--<v-btn color="primary" flat @click="submit">Submit</v-btn>-->
          <!--</v-card-actions>-->
        <!--</v-card>-->
      <!--</v-flex>-->
    <!--</v-layout>-->


    <!--<v-card-text>-->
      <!--<v-container grid-list-md>-->
        <!--<v-layout wrap>-->
          <!--<v-flex xs12 sm6 md4>-->
            <!--<v-text-field label="Legal first name*" required></v-text-field>-->
          <!--</v-flex>-->
          <!--<v-flex xs12 sm6 md4>-->
            <!--<v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>-->
          <!--</v-flex>-->
          <!--<v-flex xs12 sm6 md4>-->
            <!--<v-text-field-->
              <!--label="Legal last name*"-->
              <!--hint="example of persistent helper text"-->
              <!--persistent-hint-->
              <!--required-->
            <!--&gt;</v-text-field>-->
          <!--</v-flex>-->
          <!--<v-flex xs12>-->
            <!--<v-text-field label="Email*" required></v-text-field>-->
          <!--</v-flex>-->
          <!--<v-flex xs12>-->
            <!--<v-text-field label="Password*" type="password" required></v-text-field>-->
          <!--</v-flex>-->
          <!--<v-flex xs12 sm6>-->
            <!--<v-select-->
              <!--:items="['0-17', '18-29', '30-54', '54+']"-->
              <!--label="Age*"-->
              <!--required-->
            <!--&gt;</v-select>-->
          <!--</v-flex>-->
          <!--<v-flex xs12 sm6>-->
            <!--<v-autocomplete-->
              <!--:items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"-->
              <!--label="Interests"-->
              <!--multiple-->
            <!--&gt;</v-autocomplete>-->
          <!--</v-flex>-->
        <!--</v-layout>-->
      <!--</v-container>-->
      <!--<small>*indicates required field</small>-->
    <!--</v-card-text>-->
    <v-card-actions>
      <v-spacer></v-spacer>
      <!--<v-btn color="red darken-1" dark @click="$emit('update:showAuthDialog', false)">Закрыть</v-btn>-->
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>

<script>
// COMPONENTS
  import blockAuth from '@/components/auth/block-auth'
  import blockReg from '@/components/auth/block-reg'
  import blockLost from '@/components/auth/block-lost'

  export default {
    name: 'auth',
    props: ["showAuthDialog"],
    components: {
      blockAuth: blockAuth,
      blockReg: blockReg,
      blockLost: blockLost
    },
    data: function(){
      return {
        active: "auth", // auth, reg, lost
      }
    },
    methods: {
      closeDialog: function(){
        this.$emit('update:showAuthDialog', false)
      }
    }
  }
</script>
