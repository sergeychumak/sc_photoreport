<template>
  <v-layout justify-center>
    <v-flex xs12>
      <v-card ref="form" class="elevation-5">
        <v-card-text>

          <div class="subheading">Е-mail - {{email}}</div>
          <v-text-field
            solo
            v-model="email"
            placeholder="none@none.ru"
            :rules="[rules.required, rules.email]"
            :error-messages="errorMessages"
          ></v-text-field>


          <v-layout row>
            <v-flex xs6 class="pr-2">
              <div class="subheading">Ф.И.О.</div>
              <v-text-field
                solo
                v-model="fio"
                :rules="[rules.required]"
                :error-messages="errorMessages"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 class="pl-2">
              <div class="subheading">Ф.И.О.[eng]</div>
              <v-text-field
                solo
                v-model="fioEng"
                :rules="[rules.required]"
                :error-messages="errorMessages"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs6 class="pr-2">
              Бизнес
              <v-autocomplete
                solo
                ref="country"
                :rules="[rules.required]"
                :items="businessList"
                item-text="alias"
                v-model="business"
                label="Бизнес"
                placeholder="Выбрать из списка ..."
                required
              ></v-autocomplete>
            </v-flex>
            <v-flex xs6 class="pl-2">
              Страна
              <v-autocomplete
                solo
                ref="country"
                :rules="[rules.required]"
                :items="countriesList"
                item-text="alias"
                v-model="country"
                label="Страна"
                placeholder="Выбрать из списка ..."
                required
              ></v-autocomplete>
            </v-flex>
          </v-layout>

          Пароль
          <v-text-field
            solo
            v-model="password"
            :append-icon="passwordShow ? 'visibility_off' : 'visibility'"
            :rules="[rules.required]"
            :type="passwordShow ? 'text' : 'password'"
            name="input-10-1"
            label="Пароль"
            counter
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>


        </v-card-text>

      </v-card>

      <v-toolbar flat height="40" class="mt-4 white">
        <v-btn color="red darken-1" flat dark @click="$emit('close-dialog')">Закрыть</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" dark @click="$emit('close-dialog')">Регистрация</v-btn>
      </v-toolbar>

    </v-flex>
  </v-layout>
</template>
<script>

  import { mapGetters } from 'vuex'
  export default {
    name: 'block-reg',
    data: () => ({
      email: null,
      fio:null,
      fioEng:null,
      business: null,
      country: null,
      password: null,

      passwordShow: false,

      rules: {
        required: value => !!value || 'Обязательно для заполнения.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'e-mail введён некорректно.'
        }
      }
    }),
    computed: {
      ...mapGetters('business' , { businessList: 'list' }),
      ...mapGetters('countries' , { countriesList: 'list' })
    }
  }
</script>
