'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          
          $urlRouterProvider
              .otherwise('/access/signin');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html'
              })
              .state('app.dashboard-v1', {
                  url: '/dashboard-v1',
                  templateUrl: 'tpl/app_dashboard_v1.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/chart.js']);
                    }]
                  }
              })
              .state('app.dashboard-v2', {
                  url: '/dashboard-v2',
                  templateUrl: 'tpl/app_dashboard_v2.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/chart.js']);
                    }]
                  }
              })

              // table
              .state('app.table', {
                  url: '/table',
                  template: '<div ui-view></div>'
              })

              .state('app.table.publishBill', {
                  url: '/publishBill',
                  templateUrl: 'tpl/page_publishBill.html'
              })

              .state('app.table.myBill', {
                  url: '/myBill',
                  templateUrl: 'tpl/page_myBill.html'
              })

              .state('app.table.myUnBill', {
                  url: '/myUnBill',
                  templateUrl: 'tpl/page_myUnBill.html'
              })

              .state('app.page', {
                  url: '/page',
                  template: '<div ui-view></div>'
              })


              //access
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'tpl/page_signin.html'
                  //,
                  //resolve: {
                  //    deps: ['uiLoad',
                  //      function( uiLoad ){
                  //        return uiLoad.load( ['js/controllers/signin.js'] );
                  //    }]
                  //}
              })
              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'tpl/page_signup.html'//,
                  //resolve: {
                  //    deps: ['uiLoad',
                  //      function( uiLoad ){
                  //        return uiLoad.load( ['js/controllers/signup.js'] );
                  //    }]
                  //}
              })

              .state('access.404', {
                  url: '/404',
                  templateUrl: 'tpl/page_404.html'
              });

      }
    ]
  );