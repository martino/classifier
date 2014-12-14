'use strict';

/**
 * @ngdoc service
 * @name classifierApp.datatxt
 * @description
 * # datatxt
 * Service in the classifierApp.
 */
angular.module('classifierApp')
  .service('datatxt', ['$http', '$q', 'lodash', 'localStorageService', function ($http, $q, _, localStorageService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var dataTXT = {
      urls: {
        classifier: '/datatxt/cl/v1/',
        models: '/datatxt/cl/models/v1/',
        rel: '/datatxt/rel/v1',
        topics: '/_topic',
        wikisearch: '/datagraph/wikisearch/v1'
      },
      credentials: {
        '$app_id': '***REMOVED***',
        '$app_key': '163560ca***REMOVED***'
      }
    };

    var gerente = {
      urls: {
        models: '/models/',
        model: function (modelId) {
          return '/models/' + modelId + '/';
        },
        modelTest: function (modelId) {
          return '/models/' + modelId + '/test/';
        },
        modelTestResults: function (modelId) {
          return '/models/' + modelId + '/results/';
        }
      }
    };

    var httpRequest = function (request) {
      var deferred = $q.defer();
      $http(request)
        .success(function (data) {
          deferred.resolve(data)
        })
        .error(function (error) {
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
        'include': 'score_details',
        'nex.min_length': 3
        };
      postData = addAuth(postData);
      var request = {
        method: 'POST',
        url: dataTXT.urls.classifier,
        data: $.param(postData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      };
      return httpRequest(request);
    };

    var getModel = function (modelId) {
      var request = {
        method: 'GET',
        url: gerente.urls.models + modelId + '/'
      };
      return httpRequest(request);
    };

    var updateModel = function (modelId, data) {
      var postData = {
        'data': JSON.stringify(data)
      };

      var request = {
        method: 'PUT',
        url: gerente.urls.models + modelId + '/',
        data: $.param(postData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

      };
      return httpRequest(request);
    };

    var testModel = function (modelId) {
      var request = {
        method: 'GET',
        url: gerente.urls.modelTest(modelId)
      };
      return httpRequest(request);
    };

    var getAllTestResults = function (modelId) {
      var request = {
        method: 'GET',
        url: gerente.urls.modelTestResults(modelId)
      };
      return httpRequest(request);
    };

    var getAllModels = function () {
      var request = {
        method: 'GET',
        url: gerente.urls.models
      };
      return httpRequest(request);
    };

    var getTopicDetails = function (topic, lang) {
      var params = {
        'topic': topic,
        'lang': lang
      };

      var request = {
        method: 'GET',
        url: dataTXT.urls.topics,
        params: params
      };
      return httpRequest(request);
    };

    var cleanTopic = function (data) {
      var cleanedData = data.topic;
      if ('image' in cleanedData && cleanedData.image.thumbnail) {
        cleanedData.imageThumbnail = cleanedData.image.thumbnail.replace('/200px', '/300px');
      }
      return cleanedData;
    };

    var getTopic = function (topic, lang) {
      var entityDetails = localStorageService.get(topic);

      if (entityDetails === null) {
        getTopicDetails(topic, lang)
          .then(function (data) {
            var cleanedData = cleanTopic(data);
            localStorageService.set(topic, cleanedData);
            return cleanedData;
          })
      } else {
        return entityDetails;
      }
    };

    var wikiSearch = function (text, limit) {
      var query = {
        'lang': 'it',
        'text': text,
        'limit': limit || 10,
        'include': 'abstract, image'
      };
      query = addAuth(query);

      var request = {
        method: 'GET',
        url: dataTXT.urls.wikisearch,
        params: query
      };
      return httpRequest(request);
    };

    var getRel = function (topic) {
      var query = {
        'topic': topic,
        'include': 'abstract, image'
      };
      query = addAuth(query);

      var request = {
        method: 'GET',
        url: dataTXT.urls.rel,
        params: query
      };
      return httpRequest(request);
    };

    return {
      'classifier': classifier,
      'getAllModels': getAllModels,
      'getModel': getModel,
      'updateModel': updateModel,
      'testModel': testModel,
      'getAllTestResults': getAllTestResults,
      //'getTopicDetails': getTopicDetails,
      'getTopic': getTopic,
      'wikiSearch': wikiSearch,
      'getRel': getRel
    }
  }]);
