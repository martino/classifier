'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('MainCtrl', ['$rootScope', '$scope', '$http','datatxt', 'lodash', function ($rootScope, $scope, $http, datatxt, _) {
    $scope.models = [];
    $scope.defaultModel = 'f83cc491-38e1-4203-bc18-25b076eeeeb4';
    $rootScope.page = 'article';

    $scope.getCurrentModel = function () {
      if ($scope.selectedModel === undefined) return {};
      return _.find($scope.models, {id: $scope.selectedModel});
    };

    $scope.generateData = function (data) {
      var labels, values=[], categories = data.categories,
        normalizeValue = function (value) {
//          return value;
          return Math.pow(value, 3)*100;
        };

      labels = $scope.getCurrentModel().labels || [];

      for (var i=labels.length-1; i>=0; i--) {
        var val = _.find(categories, {'name': labels[i]});
        values.push(normalizeValue(val.score));
      }

      $scope.graphData = {
          labels : labels,
          datasets : [
            {
              fillColor : "rgba(220,220,220,0.5)",
              strokeColor : "rgba(220,220,220,1)",
              pointColor : "rgba(220,220,220,1)",
              pointStrokeColor : "#fff",
              data : values
            }
          ]
      }
    };

    $scope.classifyText = function (text) {
      $scope.selectedModel = $scope.selectedModel || $scope.defaultModel;
      datatxt.classifier(
          text || $scope.fileContent, $scope.selectedModel
      ).then(function (data) {
          $scope.generateData(data);
        });
    };

    $scope.showContent = function($fileContent){
      $scope.fileContent = $fileContent;
      $scope.classifierResults = $scope.classifyText($fileContent);
    };

    datatxt.getAllModels().then(function (data) {
      var items = data.items, models = [];

      for(var i=items.length-1; i>=0; i--) {
        models.push(
          {
            'id': items[i].id,
            'desc': items[i].data.description,
            'data': items[i].data,
            'labels': items[i].data.categories.map(function (el) {return el.name})
          });
      }
      $scope.models = models;
    });

  }]);
