'use strict';

/**
 * @ngdoc overview
 * @name classifierApp
 * @description
 * # classifierApp
 *
 * Main module of the application.
 */
angular
  .module('classifierApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
//    'chartjs-directive',
    'angles',
    'ngLodash',
    'LocalStorageModule',
    'ui.bootstrap',
    'truncate',
    'pasvaz.bindonce'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/analyze-text.html',
        controller: 'AnalyzeText'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/models/:modelId/', {
        templateUrl: 'views/models.html',
        controller: 'CustomModelsCtrl'
      })
      .when('/models/', {
        templateUrl: 'views/models-list.html',
        controller: 'CustomModelsListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
