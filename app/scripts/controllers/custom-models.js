'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:CustomModelsCtrl
 * @description
 * # CustomModelsCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('CustomModelsCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'datatxt', 'lodash', '$modal', function ($rootScope, $scope, $location, $routeParams, datatxt, _, $modal) {
    $scope.model = null;
    $scope.modelo = null;
    $rootScope.page = 'models';
    $scope.editMode = false;
    $scope.categoriesStyle = {'width': '100%'};

    $scope.generateCategoryColor = function (index) {
      return 'color-' + (index + 1);
    };
    $scope.generateEntityColor = function (topic) {
      return 'color-weight-' + topic.weight;
    };
    $scope.generateBGImage = function (topic) {
      var data = datatxt.getTopic(topic.wikipage, 'it');
      if ('imageThumbnail' in data) {
        return {
          'background-size': 'cover',
          'background-image': "url(" + data.imageThumbnail + ")"
        }
      }
      return {};
    };

    var fixWidth = function (model) {
      $scope.categoriesStyle.width = ((model.categories.length + 1) * 300 + 100) + 'px';
    };

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
          'weight': Number((el).toFixed(1)),
          'name': $scope.formatWikipage(key)
        }});
        model.categories.push(newCategory)
      });
      fixWidth(model);
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
          category.topics[data.wikipage] = data.weight;
        });

        return category;
      });
      datatxt.updateModel($routeParams.modelId, newModel);
    };

    var getCategoryByName = function (categoryName) {
      return _.where($scope.model.categories, {name:categoryName})[0]
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

    $scope.enterEditMode = function () {
      $scope.editMode = true;
      $scope.modelBackup = _.cloneDeep($scope.model);
    };

    $scope.enableEdit = function (item) {
      item.hover = true;
    };

    $scope.disableEdit = function (item) {
      item.hover = false;
    };

    var disableEditMode = function () {
      $scope.editMode = false;
      $scope.modelBackup = null;
    };

    $scope.handlingSave = function () {
      serializeModel();
      disableEditMode();
    };

    $scope.deleteTopic = function (categoryName) {
      _.remove($scope.model.categories, function (el) {return el.name === categoryName});
      fixWidth($scope.model);
    };

    $scope.editTopic = function (category) {
      category.edit = true;
      category.nameBackup = category.name;
    };

    $scope.editTopicSave = function (category) {
      // TODO check that name is unique
      category.edit = false;
      $scope.handlingSave();
    };

    $scope.editTopicCancel = function (category) {
      category.name = category.nameBackup;
      category.edit = false;
    };

    $scope.addTopicRelated = function (categoryName) {
      console.log('to be implemented, need backend');
    };

    $scope.handlingCancel = function () {
      $scope.model = _.cloneDeep($scope.modelBackup);
      $scope.modelBackup = null;
      disableEditMode();
    };

    $scope.$on('addRelated', function (event, data) {
      datatxt.getRel(data.entity).then(function (res) {

        var modalInstance = $modal.open({
          templateUrl: 'views/modal-addentity.html',
          controller: 'AddentitymodalCtrl',
          resolve: {
            entities: function () {
              return res.related;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          addEntityToCategory(data.category, selectedItem);
        }, function (data) {

        });
      })
    });


    var deleteEntity = function (categoryName, entity) {
      var category = getCategoryByName(categoryName);
      category.topics = _.filter(category.topics, function (el) {
        return el.wikipage !== entity;
      });
    };

    $scope.$on('deleteEntityBulk', function (event, data) {
      deleteEntity(data.category, data.entity);
    });

    $scope.$on('deleteEntity', function (event, data) {
      deleteEntity(data.category, data.entity);
      $scope.handlingSave();
    });

    $scope.$on('editWeight', function (event, data, weight) {
      var category =  getCategoryByName(data.category)
        , entity = _.where(category.topics, {wikipage: data.wikipage});
      entity.weight = weight;
      $scope.handlingSave();
    });

    var addEntityToCategory = function (categoryName, items) {
      var category = getCategoryByName(categoryName);
      _.each(items, function(item) {
        category.topics.push({
          'wikipage': item.uri,
          'weight': item.weight,
          'name': item.title
        });
      });

      $scope.handlingSave();
    };

    $scope.openAddTopic = function () {
      $scope.model.categories.push({
        'name': 'New Topic ' + $scope.model.categories.length,
        'topics': {}
      });
      $scope.handlingSave();
      fixWidth($scope.model);
    };

    $scope.openAddEntity = function (category) {
      var modalInstance = $modal.open({
        templateUrl: 'views/modal-addentity.html',
        controller: 'AddentitymodalCtrl',
        resolve: {
          entities: function () {
            return null;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        addEntityToCategory(category, [selectedItem]);
      }, function (data) {

      });
    };

  }]);
