import Vue from 'vue'
import Router from 'vue-router'

// import chooseLanguageLayouts from '../layouts/choose_language'
// import chooseBusinessLayouts from '../layouts/choose_business'
// import chooseCountriesLayouts from '../layouts/choose_countries'
// import UserInfoLayouts from '../layouts/user-info'

//
import adminUsersPage from '../pages/admin/users/list'
import adminPhotoCategoriesPage from '../pages/admin/categoryPhoto/list'
import adminLinesPage from '../pages/admin/lines/list'
import adminGomsPage from '../pages/admin/goms/list'
import adminDocumentcategoryPage from '../pages/admin/documentcategory/list'
import adminDocumenttypesPage from '../pages/admin/documenttypes/list'
import adminDocumentseasonsPage from '../pages/admin/documentseasons/list'
import adminErrorGroupsPage from '../pages/admin/errorGroups/list'
import adminErrorsPage from '../pages/admin/errors/list'
import adminZoningPage from '../pages/admin/zoning/list'
//
//
// import viewPhotoreportPage from '../pages/view-photo-report'
//
//
// import listOfDocumentsPage from '../pages/documentation'
// import photoReportPage from '../pages/v1/photo-report/index'







Vue.use(Router)

/** ****************************** */
/** LAYOUTS ****************************** */
/** ****************************** */

import layoutMain from '../layouts/main'

/** ****************************** */
/** PAGES ****************************** */
/** ****************************** */

import showPhotoreportPage from '../pages/build-1/showPhotoreport'
import showImagePage from '../pages/build-1/showImage'
import photoUploadPage from '../pages/build-1/photoUpload'


import UserRegistrationPage from '../pages/build-1/userRegistration'
import UserAuthenticationPage from '../pages/build-1/userAuthentication'
import UserInfoPage from '../pages/build-1/userInfo'


/** ****************************** */
/** ROUTER ****************************** */
/** ****************************** */

export default new Router({
  routes: [

    // {
    //   name: "choose-language-layout",
    //   path: '/choose-language',
    //   component: chooseLanguageLayouts
    // },
    // {
    //   name: "choose_business-layout",
    //   path: '/choose_business',
    //   component: chooseBusinessLayouts
    // },
    // {
    //   name: "choose_countries-layout",
    //   path: '/choose_countries',
    //   component: chooseCountriesLayouts
    // },


    // {
    //   name: "user_info",
    //   path: '/user-info',
    //   component: UserInfoLayouts
    // },


    // {
    //   name: "auth",
    //   path: '/auth',
    //   component: AuthLayouts
    // },
    // {
    //   name: "registration",
    //   path: '/registration',
    //   component: RegistrationLayouts
    // },
    {
      name: "main",
      path: '/',
      component: layoutMain,
      children: [
        {
          name: "userRegistration",
          path: '/userRegistration',
          component: UserRegistrationPage
        },
        {
          name: "userAuthentication",
          path: '/userAuthentication',
          component: UserAuthenticationPage
        },
        {
          name: "UserInfo",
          path: '/UserInfo',
          component: UserInfoPage
        },


        {
          name: "showImage",
          path: '/showImage/:line?/:category?/:region?/:department?/:shop?/:date?',
          component: showImagePage,
          beforeEnter: (to, from, next) => {

            if (to.name !== "showImage") {
              next()
            } else {

              var r = false

              if (to) {

                if (to.params) {

                  if (!to.params.line) {
                    to.params.line = "!";
                    r = true;
                  }
                  if (!to.params.category) {
                    to.params.category = "!";
                    r = true;
                  }
                  if (!to.params.region) {
                    to.params.region = "!";
                    r = true;
                  }
                  if (!to.params.department) {
                    to.params.department = "!";
                    r = true;
                  }
                  if (!to.params.shop) {
                    to.params.shop = "!";
                    r = true;
                  }
                  if (!to.params.date) {
                    to.params.date = "!";
                    r = true;
                  }
                }
              }

              if (r) {
                next({
                  name: 'showImage',
                  params: {
                    line: to.params.line,
                    category: to.params.category,
                    region: to.params.region,
                    department: to.params.department,
                    shop: to.params.shop,
                    date: to.params.date
                  }
                });
              } else {
                next()
              }
            }
          }
        },
        {
          name: "showPhotoreport",
          path: '/showPhotoreport/:line?/:category?/:region?/:department?/:shop?/:date?',
          component: showPhotoreportPage,
          beforeEnter: (to, from, next) => {

            if (to.name !== "showPhotoreport") {
              next()
            } else {

              var r = false

              if (to) {
                if (to.params) {
                  if (!to.params.line) {
                    to.params.line = "!";
                    r = true;
                  }
                  if (!to.params.category) {
                    to.params.category = "!";
                    r = true;
                  }
                  if (!to.params.region) {
                    to.params.region = "!";
                    r = true;
                  }
                  if (!to.params.department) {
                    to.params.department = "!";
                    r = true;
                  }
                  if (!to.params.shop) {
                    to.params.shop = "!";
                    r = true;
                  }
                  if (!to.params.date) {
                    to.params.date = "!";
                    r = true;
                  }
                }
              }

              if (r) {
                next({
                  name: 'showPhotoreport',
                  params: {
                    line: to.params.line,
                    category: to.params.category,
                    region: to.params.region,
                    department: to.params.department,
                    shop: to.params.shop,
                    date: to.params.date
                  }
                });
              } else {
                next()
              }
            }
          }
        },


        {
          name: "photoUpload",
          path: 'photoUpload',
          component: photoUploadPage
        },

        // {
        //   path: '/test',
        //   component: layoutTest
        // },

        /** ****************************** */
        /** LIST OF DOCUMENTS ****************************** */
        /** ****************************** */
        // {
        //   name: "listOfDocuments",
        //   path: '/list-of-documents',
        //   component: listOfDocumentsPage
        // },

        /** ****************************** */
        /** ADMIN ****************************** */
        /** ****************************** */
          {
            name: "adminUsers",
            path: 'admin/users',
            component: adminUsersPage
          },
          {
            name: "adminPhotoCategories",
            path: 'admin/photo-categories',
            component: adminPhotoCategoriesPage
          },
          {
            name: "adminLines",
            path: 'admin/lines',
            component: adminLinesPage
          },
          {
            name: "adminGoms",
            path: 'admin/goms',
            component: adminGomsPage
          },
          {
            name: "adminDocumentcategory",
            path: 'admin/document-category',
            component: adminDocumentcategoryPage
          },
          {
            name: "adminDocumenttypes",
            path: 'admin/document-types',
            component: adminDocumenttypesPage
          },
        {
          name: "adminDocumentseasons",
          path: 'admin/document-seasons',
          component: adminDocumentseasonsPage
        },

          {
            name: "adminErrors",
            path: 'admin/photo-errors',
            component: adminErrorsPage
          },
          {
            name: "adminErrorGroups",
            path: 'admin/photo-error-groups',
            component: adminErrorGroupsPage
          },
        //
        // {
        //   name: "adminZoning",
        //   path: 'admin/zoning',
        //   component: adminZoningPage
        // },

        /** ****************************** */
        /** UPLOAD FILES ****************************** */
        /** ****************************** */

        /** ****************************** */
        /** VIEW PHOTO REPORT ****************************** */
        /** ****************************** */
        // {
        //   name: "viewPhotoreport",
        //   path: 'view-photo-report',
        //   component: viewPhotoreportPage
        // }
      ]
    }
  ]
})
