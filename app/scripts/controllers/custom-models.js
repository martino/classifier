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
    $scope.editMode = false;


    var loadModel = function () {
      var datatxtModel = $scope.dtModel
        , model = {
          id: datatxtModel.id,
          description: datatxtModel.description || "",
          categories: []
        };

      _.each(datatxtModel.categories, function (category) {
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

    var serializeModel = function () {
      var newModel = {
        'lang': $scope.dtModel.lang,
        'description': $scope.dtModel.description
      };

      newModel.categories = _.map($scope.model.categories, function(data){
        var category = {
          'name': data.name,
          'topics': {}
        };
        _.each(data.topics, function (data) {
          category.topics[data.wikipage] = data.weigth;
        });

        return category;
      });
      datatxt.updateModel($routeParams.modelId, newModel);
    };


    datatxt.getModel($routeParams.modelId).then(function (data) {
      $scope.dtModel = data.data;
      $scope.model = loadModel($scope.originalModel);
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
      return result;
    };

    $scope.enterEditMode = function () {
      $scope.editMode = true;
      $scope.modelBackup = _.cloneDeep($scope.model);
    };

    var disableEditMode = function () {
      $scope.editMode = false;
      $scope.modelBackup = null;
    };

    $scope.handlingSave = function () {
      serializeModel();
      disableEditMode();
    };

    $scope.handlingCancel = function () {
      $scope.model = _.cloneDeep($scope.modelBackup);
      $scope.modelBackup = null;
      disableEditMode();
    };

    $scope.$on('deleteEntity', function (event, data) {
      var category = _.where($scope.model.categories, {name:data.category})[0];
      category.topics = _.filter(category.topics, function (el) {
        return el.wikipage !== data.entity;
      });
    });

  }]);
