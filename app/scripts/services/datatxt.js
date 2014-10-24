'use strict';

/**
 * @ngdoc service
 * @name classifierApp.datatxt
 * @description
 * # datatxt
 * Service in the classifierApp.
 */
angular.module('classifierApp')
  .service('datatxt', ['$http', '$q', 'lodash', function ($http, $q, _) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var dataTXT = {
      urls: {
        classifier: '/datatxt/cl/v1/',
        models: '/datatxt/cl/models/v1/'
      },
      credentials: {
        '$app_id': '***REMOVED***',
        '$app_key': '163560ca***REMOVED***'
      }
    };

    var queryDataTXT = function (request) {
      var deferred = $q.defer();

      $http(request)
        .success(function (data) {
          deferred.resolve(data)
        })
        .error(function (error) {
          console.log(error);
          deferred.reject();
        });

      return deferred.promise;
    };

    var addAuth = function (data) {
      var result = data || {};
      _.defaults(result, dataTXT.credentials);
      return result;
    };

    var classifier = function (text, model) {
      var postData = {
        'text': text,
        'model': model,
        'nex.min_length': 3,
        'include': 'score_details'
        };
      postData = addAuth(postData);
      var request = {
        method: 'POST',
        url: dataTXT.urls.classifier,
        data: $.param(postData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      };
      return queryDataTXT(request);
    };

    var getModel = function (modelId) {
      var params = {
        'id': modelId
      };

      var request = {
        method: 'GET',
        url: dataTXT.urls.models,
        params: addAuth(params)
      };
      return queryDataTXT(request);
    };

    var getAllModels = function () {
      var request = {
        method: 'GET',
        url: dataTXT.urls.models,
        params: addAuth()
      };
      return queryDataTXT(request);
    };


    return {
      'classifier': classifier,
      'getAllModels': getAllModels,
      'getModel': getModel
    }
  }]);
