import axios from "axios";
import qs from 'qs';

const state = {
  "server": "/fosm3/",

  "v1": {
    "business": {
      "list": "business/read"
    },
    "countries": {
      "list": "country/read"
    },
    "roles": {
      "list": "roles/read"
    },
    "region" : {
      "list": "crud/region/read"
    },
    "department": {
      "list": "crud/department/read"
    },
    "shop": {
      "list": "crud/shop/read"
    },
    "auth": {
      "enter": "j_spring_security_check",
      "exit": "j_spring_security_logout",
      "userRegistration": "auth/register"
    },
    "users" : {
      "list": "crud/user/read",
      "update": "crud/user/update",
      "delete": "crud/user/delete",
      "create": "crud/user/create"
    },
    "lines" : {
      "list": "crud/photocategory0/read",
      "update": "crud/photocategory0/update",
      "delete": "crud/photocategory0/delete",
      "create": "crud/photocategory0/create"
    },
    "categories" : {
      "list": "crud/photocategory/read"
    },
    "facets" : {
      "list": "photo/facets"
    },
    "photo": {
      "list": "photo/read",
      "clearUserDir": "photo/clearUserDir",
      "upload": "photo/upload",
      "listtemp": "photo/listtemp",
      "save_photoreport": "photo/classify",
      "facets" : "photo/facets",
      "comment": "comment/list",
      "comment_add": "comment/post"
    },
    "category_photo": {
      "list": "crud/photocategory/read",
      "update": "crud/photocategory/update",
      "delete": "crud/photocategory/delete",
      "create": "crud/photocategory/create"
    },
    "goms": {
      "list": "crud/documentgoms/read",
      "update": "crud/documentgoms/update",
      "delete": "crud/documentgoms/delete",
      "create": "crud/documentgoms/create"
    },
    "documentcategory": {
      "list": "crud/documentcategory/read",
      "update": "crud/documentcategory/update",
      "delete": "crud/documentcategory/delete",
      "create": "crud/documentcategory/create"
    },
    "documenttypes": {
      "list": "crud/documenttypes/read",
      "update": "crud/documenttypes/update",
      "delete": "crud/documenttypes/delete",
      "create": "crud/documenttypes/create"
    },
    "documentseasons": {
      "list": "crud/documentseasons/read",
      "update": "crud/documentseasons/update",
      "delete": "crud/documentseasons/delete",
      "create": "crud/documentseasons/create"
    },
    "errors": {
      "list": "crud/problem_type/read",
      "update": "crud/problem_type/update",
      "delete": "crud/problem_type/delete",
      "create": "crud/problem_type/create"
    },
  },


  //
  // "user": {
  //   "info": "crud/user/read"
  // },



  /** ********************************************************** */
  /** v. 3********************************************************** */
  /** ********************************************************** */










  "zoning": {
    "list": "crud/zoning/list",
    "delete": "crud/zoning/delete",
    "update": "crud/zoning/update",
    "upload": "crud/zoning/upload"
  },


  "point": {
    "list": "crud/problem/list",
    "create": "crud/problem/create",
    "update": "crud/problem/update",
    "delete": "crud/problem/delete",
    "location": {
      "list": "crud/problem_location/read",
      "update": "crud/problem_location/update",
      "delete": "crud/problem_location/delete",
      "create": "crud/problem_location/create"
    },
    "items": {
      "list": "crud/problem_type/read",
      "update": "crud/problem_type/update",
      "delete": "crud/problem_type/delete",
      "create": "crud/problem_type/create"
    }
  }
  /** ********************************************************** */
  /** ********************************************************** */
  /** ********************************************************** */
  ,










  "photo123" : {
    "clearUserDir": "photo/clearUserDir",
    "upload": "photo/upload",
    "listtemp": "photo/listtemp",
    "save_photoreport": "photo/classify",
    "facets" : "photo/facets",
    "list": "photo/read",
    "comment": "comment/list",
    "comment_add": "comment/post"
  },
  "photocategory" : {
    "list_category": "crud/photocategory0/read",
    "list_subcategory": "crud/photocategory/read"
  },








  "documentation": {
    "list": "crud/documents/read",
    "filters": {
      "gom": "crud/documentgoms/read",
      "category": "crud/documentcategory/read",
      "types": "crud/documenttypes/read",
      "seasons": "crud/documentseasons/read",
      "lang": "crud/documentlangs/read"
    }
  },

  "country" : {
    "list": "country/read"
  },
  "photo12322": {
    "category" : "crud/photocategory/read",
    "region" : "crud/region/read",
    "department" : "crud/department/read",
    "shop" : "crud/shop/read",
    "facets" : "photo/facets",
    "zoning": "crud/zoning/list",
    "vitrina": "crud/vitrina/list",
    "list": "photo/read",
    "comment": "comment/list"
  },

  "test1" : {
    "test2" : {
      "test3" : {
        "test4": "asd"
      }
    }
  },



  "ruler": {
    "list": "crud/photocategory0/read",
    "update": "crud/photocategory0/update",
    "delete": "crud/photocategory0/delete",
    "create": "crud/photocategory0/create"
  },

  "category123": {
    "list": "crud/documentcategory/read",
    "update": "crud/documentcategory/update",
    "delete": "crud/documentcategory/delete",
    "create": "crud/documentcategory/create"
  },

  "document_seasons": {
    "list": "crud/documentseasons/read",
    "update": "crud/documentseasons/update",
    "delete": "crud/documentseasons/delete",
    "create": "crud/documentseasons/create"
  },
  "document": {
    "list": "crud/documents/read",
    "update": "crud/documents/update",
    "delete": "crud/documents/delete",
    "create": "crud/documents/create"
  },

  //
  //
  // /** Группы ошибок */
  //   "error_groups": {
  //     "list": "crud/problem_location/read",
  //     "update": "crud/problem_location/update",
  //     "delete": "crud/problem_location/delete",
  //     "create": "crud/problem_location/create"
  //   },
  // /** Ошибки */
  //   "errors": {
  //     "list": "crud/problem/read",
  //     "update": "crud/problem/update",
  //     "delete": "crud/problem/delete",
  //     "create": "crud/problem/create"
  //   },
  // /** Ошибки */
  // "problem": {
  //   "list": "crud/problem/read",
  //   "update": "crud/problem/update",
  //   "delete": "crud/problem/delete",
  //   "create": "crud/problem/create"
  // },
  // /** Ошибки */
  // "problemPoint": {
  //   "list": "crud/problem_point/list",
  //   "create": "crud/problem_point/create",
  //   "update": "crud/problem_point/update"
  // }


  jsonServerRun: false,
  saveResult2jsonServer: true

}

const getters = {}

const actions = {

















  // save2Json:  ({commit, rootState, state}, inData) => {
  //   if (state.saveResult2jsonServer){
  //     axios.post(
  //       "http://localhost:3000/" + inData.url,
  //       res.data
  //     )
  //   }
  // },


  post_request: ({commit, rootState, state}, inData) => {
    return new Promise((resolve) => {

      // if (state.jsonServerRun){
      //   axios.get(
      //     "http://localhost:3000/" + inData.url,
      //   ).then(res=>{
      //     console.log(909)
      //     resolve(res.data)
      //   })
      // }else{
      // console.log(inData)
        let url = inData.url.split('.').reduce(function(state_,a_){return state_[a_]},state)
        axios.post(
          rootState.api.server + "/" + url,
          qs.stringify(inData.data),
          {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        ).then((res)=>{


          // if (state.saveResult2jsonServer){
          //   axios.post(
          //     "http://localhost:3000/" + inData.url,
          //     res.data
          //   )
          // }
          resolve(res.data)
        })
      // }


    })
  },
  post_request_clear: ({commit, rootState}, inData) => {
    return new Promise((resolve,reject) => {
      let url = inData.url.split('.').reduce(function(state_,a_){return state_[a_]},state)
      axios.post(
        rootState.api.server + "/" + url,
        inData.data
      ).then((res)=>{
        if (res.data.success){
          resolve(res.data)
        }else{
          reject(res.data)
        }
      })
    })
  },
  //v3 send post
  send_post_request: ({commit, rootState}, inData) => {
    return new Promise((resolve,reject) => {
      let data = Object.assign( { url:"", data: {} }, inData )
      if ( data.url !== "" ){
        let url = data.url
          .split('.')
          .reduce(function (state_, a_) {
            return state_[a_]
          }, state)
        axios
          .post(url, data.data)
          .then(res => {
            // if (state.saveResult2jsonServer){
            //   axios.post("http://localhost:3000/" + inData.url, res.data)
            // }
            resolve(res.data)
          });
      }
    })
  },
  //v3 send post
  send_get_request: ({commit, rootState}, inData) => {

    return new Promise((resolve,reject) => {
      let data = Object.assign( { url:"", data: {} }, inData )
      if ( data.url !== "" ){
        let url = data.url
          .split('.')
          .reduce(function (state_, a_) {
            return state_[a_]
          }, state)
        axios
          .get(url, { params: data.data } )
          .then(res => {

            // if (state.saveResult2jsonServer){
            //   axios.post("http://localhost:3000/" + inData.url, res.data)
            // }

            resolve(res.data)
          });
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions
}
