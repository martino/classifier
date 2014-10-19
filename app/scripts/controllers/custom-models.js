'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:CustomModelsCtrl
 * @description
 * # CustomModelsCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('CustomModelsCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'datatxt', 'lodash', function ($rootScope, $scope, $location, $routeParams, datatxt, _) {
    $scope.model = {};
    $rootScope.page = 'models';


    var loadModel = function (datatxtModel) {
      var model = {
        id: datatxtModel.id,
        description: datatxtModel.data.description || "",
        categories: []
      };
      _.each(datatxtModel.data.categories, function (category) {
        var newCategory = {
          name: category.name || ""
        };
        newCategory.topics = _.map(category.topics, function(el, key){ return {
          'wikipage': key,
          'weigth': Number((el).toFixed(1)),
          'name': $scope.formatWikipage(key)
        }});
        model.categories.push(newCategory)
      });
      return model;
    };


    datatxt.getModel($routeParams.modelId).then(function (data) {
      $scope.model = loadModel(data);
    });

    $scope.formatWikipage = function (wikipage) {
      var result = wikipage.split('/');
      result = result[result.length-1];
      return decodeURIComponent(result).replace(/_/g, ' ');
    };

    $scope.orderTopics = function (topics) {
      var result = _.each(topics, function(el, key){ return {
        'wikipage': key,
        'weigth': el
      }});
      result = _.map(_.sortBy(result, 'weigth'), _.values);
      console.log(result)
      return result;
    }
  }]);
