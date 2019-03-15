import axios from "axios";
import qs from 'qs';

const state = {
  user: {
    auth: false,
    info: {}
  },
  current_business: null,
  current_countries: null,
  facets: {
    list: [],
    loading: false,
    current_date: null,
    current_filter: {}
  },
  images: {
    list: [],
    loading: false
  }
}

const getters = {
  current_business: state => {return state.current_business},
  current_countries: state => { return state.current_countries},
  is_auth: state => { return state.user.auth },
  user_info: state => { return state.user.info },
  facets_loading: state => { return state.facets.loading },
  facets_list: state => { return state.facets.list },
  facets_current_date: state => { return state.facets.current_date },
  facets_current_filter: state => { return state.facets.current_filter },
  images_loading: state => { return state.images.loading },
  images_list: state => { return state.images.list },
}

const actions = {
  
  init: ({dispatch}) => {
    return new Promise((resolve) => {
      Promise.all([
        dispatch('set_current_business'),
        dispatch('set_current_countries')
      ])
        .then(()=>{
          resolve()
        })
    })
  },

  get_url: ({rootState}, inData) => {
    return new Promise((resolve) => {
      var url = inData.url
        .split('.')
        .reduce(function (state_, a_) {
          return state_[a_]
        }, rootState.api.v1)
      resolve(rootState.api.server + url)
    })
  },
  
  set_current_business: ({dispatch, commit}) => {
    return new Promise((resolve) => {
      dispatch('get_url', { url: "business.list" })
        .then((url)=>{
          axios
            .get(url)
            .then(res => {
              var list = res.data.data.filter(el=>{
                return el.name === 'OSTIN'
              })
              if (list.length > 0){
                commit('set_current_business',list[0].id)
                resolve()
              }else{
                console.warn("set_current_business: name !== OSTIN")
              }
            });
        })
    })
  },

  set_current_countries: ({dispatch, commit}) => {
    return new Promise((resolve) => {
      dispatch('get_url', { url: "countries.list" })
        .then((url)=>{
          axios
            .get(url)
            .then(res => {
              var list = res.data.data.filter(el=>{
                return el.name === 'RF'
              })
              if (list.length > 0){
                commit('set_current_countries',list[0].id)
                resolve()
              }else{
                console.warn("set_current_countries: name !== RF")
              }
            });
        })
    })
  },

  /** Роли */
  receive_roles_list: ({dispatch}) => {
    return new Promise((resolve) => {
      let data = new FormData();
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', -1);
      data.append('filter', JSON.stringify([{"property": "alias"}]));

      dispatch('get_url', { url: "roles.list" })
        .then((url)=>{
          let options = {
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'multipart/form-data;'},
            data
          };
          axios(options)
            .then(res => {
              // console.log(res.data.data)
              var result= {}
              result['data'] = res.data.data.filter(el=>{
                if (el.name == 'REGMERCH' || el.name == 'SHOP')
                 return true
                return false
              })
              // console.log(result)
              resolve(result)
            });
        })
    })
  },

  /** Регионы */
  receive_regions_list: ({dispatch, rootGetters}) => {
    return new Promise((resolve) => {
      let data = new FormData();
      data.append('businessId', rootGetters["master/current_business"] );
      data.append('countryId', rootGetters["master/current_countries"]);
      data.append('query', '');
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', -1);
      data.append('sort', JSON.stringify([{"property":"name","direction":"ASC"}]));
      data.append('filter', JSON.stringify([{"property":"alias"}]));

      dispatch('get_url', { url: "region.list" })
        .then((url)=>{
          
          let options = {
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'multipart/form-data;'},
            data
          };
          axios(options)
            .then(res => {
              resolve(res.data)
            });
        })
    })
  },

  /** Департаменты */
  receive_departments_list: ({dispatch, rootGetters}, inData) => {
    return new Promise((resolve) => {
      let data = new FormData();
      data.append('businessId', rootGetters["master/current_business"] );
      data.append('countryId', rootGetters["master/current_countries"]);
      data.append('query', '');
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', -1);
      data.append('sort', JSON.stringify([{"property":"name","direction":"ASC"}]));
      data.append('filter', JSON.stringify([{"property":"alias"}]));

      if (inData && inData.regionId)
        data.append('regionId', inData.regionId);

      dispatch('get_url', { url: "department.list" })
        .then((url)=>{

          let options = {
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'multipart/form-data;'},
            data
          };
          axios(options)
            .then(res => {
              resolve(res.data)
            });
        })
    })
  },

  /** Магазины */
  receive_shops_list: ({dispatch, rootGetters}, inData) => {
    return new Promise((resolve) => {

      let data = new FormData();
      data.append('businessId', rootGetters["master/current_business"] );
      data.append('countryId', rootGetters["master/current_countries"]);
      data.append('query', '');
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', -1);
      data.append('sort', JSON.stringify([{"property":"name","direction":"ASC"}]));
      data.append('filter', JSON.stringify([{"property":"alias"}]));

      if (inData && inData.regionId) data.append('regionId', inData.regionId);
      if (inData && inData.departmentId) data.append('departmentId', inData.departmentId);

      dispatch('get_url', { url: "shop.list" })
        .then((url)=>{

          let options = {
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'multipart/form-data;'},
            data
          };
          axios(options)
            .then(res => {
              resolve(res.data)
            });
        })
    })
  },

  /** Линейки */
  receive_lines_list: ({dispatch, rootGetters}) => {

    return new Promise((resolve) => {

      dispatch('get_url', { url: "lines.list" })
        .then((url)=>{
          let data = new FormData();
          data.append('businessId', rootGetters["master/current_business"]);
          data.append('countryId', rootGetters["master/current_countries"]);
          data.append('query', '');
          data.append('page', 1);
          data.append('start', 0);
          data.append('limit', -1);
          data.append('sort', JSON.stringify([{"property": "name", "direction": "ASC"}]));
          data.append('filter', JSON.stringify([{"property": "alias"}]));
          let options = {
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'multipart/form-data;'},
            data
          };
          axios(options)
            .then(res => {
              resolve(res.data)
            });
        })


    })
  },

  /** Категории */
  receive_category_list: ({dispatch, rootGetters}, line = null) => {
    return new Promise((resolve) => {
        dispatch('get_url', { url: "categories.list" })
          .then((url)=>{
            let data = new FormData();
            data.append('businessId', rootGetters["master/current_business"]);
            data.append('countryId', rootGetters["master/current_countries"]);
            if (line)
              data.append('category0Id', line);
            data.append('query', '');
            data.append('page', 1);
            data.append('start', 0);
            data.append('limit', -1);
            data.append('sort', JSON.stringify([{"property": "name", "direction": "ASC"}]));
            data.append('filter', JSON.stringify([{"property": "alias"}]));
            let options = {
              method: 'POST',
              url: url,
              headers: {'Content-Type': 'multipart/form-data;'},
              data
            };
            axios(options)
              .then(res => {
                resolve(res.data)
              });
          })
    })
  },

  /** **************************************************************************************** */
  /** **************************************************************************************** */
  /** FACETS */
  /** **************************************************************************************** */
  /** **************************************************************************************** */

  receive_facets_list: ({dispatch, rootGetters, commit}, inData) => {
    return new Promise((resolve) => {

      commit("facets_loading", true)

      /*ToDo: код !isNaN(parseFloat(value)) && isFinite(value) используется в 6 местах, свести к одному*/
      function isInt(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
      }

      let data = new FormData();
      data.append('businessId', rootGetters["master/current_business"]);
      data.append('countryId', rootGetters["master/current_countries"]);
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', 25);
      console.log(inData)
      if (isInt(inData.line)) data.append('category0Id', inData.line);
      if (isInt(inData.category)) data.append('categoryId', inData.category);
      if (isInt(inData.region)) data.append('regionId', inData.region);
      if (isInt(inData.department)) data.append('departmentId', inData.department);
      if (isInt(inData.shop)) data.append('shopId', inData.shop);

        dispatch('get_url', { url: "facets.list" })
          .then((url)=>{

            let options = {
              method: 'POST',
              url: url,
              headers: {'Content-Type': 'multipart/form-data;'},
              data
            };

            axios(options)
              .then(res => {
                commit( "facets_receive_list", res.data.data.reverse() )
                commit( "facets_current_filter", inData )
                commit( "facets_loading", false )
                resolve()
              });

          })



    })
  },

  facets_set_current_date: ({commit}, date) => {
    return new Promise((resolve) => {
      commit("facets_set_current_date", date)
      resolve()
    })
  },

  facets_set_current_filter: ({commit}, inData) => {
    return new Promise((resolve) => {
      commit("facets_current_filter", inData)
      resolve()
    })
  },

  /** **************************************************************************************** */
  /** **************************************************************************************** */
  /** IAMAGES */
  /** **************************************************************************************** */
  /** **************************************************************************************** */

  images_receive_list: ({dispatch, rootGetters, commit}) => {
    return new Promise((resolve) => {

      function isInt(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
      }

      commit("images_loading",true)

      let tmpData = Object.assign({}, rootGetters["master/facets_current_filter"], {
        businessId: rootGetters["master/current_business"],
        countryId: rootGetters["master/current_countries"],
        date: rootGetters["master/facets_current_date"]
      })

      let data = new FormData();
      data.append('date', tmpData.date);
      data.append('businessId', tmpData.businessId);
      data.append('countryId', tmpData.countryId);
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', -1);

      if (isInt(tmpData.line)) data.append('category0Id', tmpData.line);
      if (isInt(tmpData.category)) data.append('categoryId', tmpData.category);
      if (isInt(tmpData.region)) data.append('regionId', tmpData.region);
      if (isInt(tmpData.department)) data.append('departmentId', tmpData.department);
      if (isInt(tmpData.shop)) data.append('shopId', tmpData.shop);

        dispatch('get_url', { url: "photo.list" })
          .then((url)=>{
            let options = {
              method: 'POST',
              url: url,
              headers: {'Content-Type': 'multipart/form-data;'},
              data
            };
            axios(options)
              .then(res => {
                commit("images_list",res.data.data)
                commit("images_loading",false)
                resolve()
              });
          })


    })
  },

  images_clear_user_dir: ({dispatch}) => {
    return new Promise((resolve) => {
        dispatch('get_url', { url: "photo.clearUserDir" })
          .then((url)=>{
            let options = {
              method: 'POST',
              url: url
            };
            axios(options)
              .then(() => {
                resolve()
              });
          })

    })
  },

  images_upload: ({dispatch}, inData) => {
    return new Promise((resolve) => {
      dispatch('get_url', { url: "photo.upload" })
      .then((url)=>{axios.post(url, inData).then(()=>{resolve()})})
    })
  },

  images_receive_tmp_list: ({dispatch}) => {
    return new Promise((resolve) => {
      let data = new FormData();
      data.append('page', 1);
      data.append('start', 0);
      data.append('limit', -1);
      data.append('sort', JSON.stringify([{"property": "fileName", "direction": "ASC"}]));

        dispatch('get_url', { url: "photo.listtemp" })
          .then((url)=>{
            let options = {
              method: 'POST',
              url: url,
              headers: {'Content-Type': 'multipart/form-data;'},
              data
            };

            axios(options)
              .then(response => {
                resolve(response.data)
              });
          })


    })
  },

  images_save_photoreport: ({dispatch}, inData) => {
    return new Promise((resolve) => {
      let data = new FormData();
      var objKeys = Object.keys(inData)
      for(var i =0; i <= objKeys.length - 1; i++){
        data.append("draftCategories0['" + objKeys[i] + "']", inData[objKeys[i]].idCategory);
        data.append("draftCategories['" + objKeys[i] + "']", inData[objKeys[i]].idSubcategory);
        data.append("initComment['" + objKeys[i] + "']", '');
      }

        dispatch('get_url', { url: "photo.save_photoreport" })
          .then((url)=>{
            let options = {
              method: 'POST',
              url: url,
              headers: {'Content-Type': 'multipart/form-data;'},
              data
            };

            axios(options)
              .then(res => {
                resolve(res.data)
              });
          })



    })

  },

  get_list_comments: ({dispatch}, photoId) => {
    return new Promise((resolve) => {

        dispatch('get_url', { url: "photo.comment" })
          .then((url)=>{
            let data = new FormData();
            data.append('page', 1);
            data.append('start', 0);
            data.append('limit', 25);
            data.append('photoId', photoId);
            let options = {
              method: 'POST',
              url: url,
              headers: {'Content-Type': 'multipart/form-data;'},
              data
            };
            axios(options)
              .then(response => {
                resolve(response.data)
              });
          })


    })
  },

  add_new_comment: ({dispatch}, inData) => {
    return new Promise((resolve) => {

        dispatch('get_url', { url: "photo.comment_add" })
          .then((url)=>{
            let data = new FormData();
            data.append('photoId', inData.photoId);
            data.append('text', inData.text);
            let options = {
              method: 'POST',
              url: url,
              headers: {'Content-Type': 'multipart/form-data;'},
              data
            };
            axios(options)
              .then(() => {
                resolve()
              });
          })


    })

  },

  /** **************************************************************************************** */
  /** **************************************************************************************** */
  /** USER */
  /** **************************************************************************************** */
  /** **************************************************************************************** */

  /** Регистрация пользователей */
  user_registration: ({dispatch}, inData) => {

    return new Promise((resolve) => {
      dispatch('get_url', { url: "auth.userRegistration" })
        .then((url)=>{
          let options = {
            method: 'POST',
            url: url,
            // headers: {'Content-Type': 'multipart/form-data'},
            data: inData
          };
          axios(options)
            .then(res => {
              resolve(res.data)
            });
        })
    })
  },

  /** Вход пользователя */
  user_enter: ({dispatch, commit}, inData) => {
    return new Promise((resolve) => {
      inData['savePassword-inputEl'] = "on"
      dispatch('get_url', { url: "auth.enter" })
        .then((url)=>{
          axios.post(
            url,
            qs.stringify(inData),
            {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
          ).then((res)=>{
            commit('user_enter', res.data.success)
            if (res.data.success){
              dispatch('user_info',inData.email)
            }
            resolve(res.data.success)
          })
        })
    })
  },

  /** Выход пользователя */
  user_exit: ({dispatch, commit}) => {
    return new Promise((resolve) => {
        dispatch('get_url', { url: "auth.exit" })
          .then((url)=>{
            axios
              .get(url)
              .then(function () {
                commit('user_enter', false)
                commit('user_info', {})
                resolve()
              })
          })
    })
  },

  /** Информация о пользователе */
  user_info: ({dispatch, commit}, email = "") => {
    return new Promise((resolve) => {
      dispatch('get_url', { url: "users.list" })
        .then((url)=>{

          let data = new FormData();
          data.append('page', 1);
          data.append('start', 0);
          data.append('limit', -1);
          let options = {
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'multipart/form-data;'},
            data
          };
          axios(options)
            .then(res => {
              let userObj = res.data.data.filter(el=>{
                return el.email.toLowerCase() === email.toLowerCase()
              })
              if (userObj.length > 0){
                commit('user_info', userObj[0])
              }else{
                commit('user_info', {})
              }
              resolve(res.data)
            });
        })

    })
  },

  // mutations sets
  set_images_list: ({commit}, list) => {
    commit('images_list', list)
  }
}

const mutations = {
  set_current_business:  (state, id) => { state.current_business = id },
  set_current_countries:  (state, id) => { state.current_countries = id },
  user_enter:  (state, f) => { state.user.auth = f },
  user_info:  (state, data) => { state.user.info = data },
  facets_loading:  (state, f) => { state.facets.loading = f },
  facets_receive_list:  (state, list) => { state.facets.list = list },
  facets_current_filter:  (state, data) => { state.facets.current_filter = data },
  facets_set_current_date:  (state, date) => { state.facets.current_date = date },
  images_loading:  (state, f) => { state.images.loading = f },
  images_list:  (state, list) => { state.images.list = list },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
