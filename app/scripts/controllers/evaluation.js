'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:EvaluationCtrl
 * @description
 * # EvaluationCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('EvaluationCtrl', ['$scope', '$location', '$routeParams', 'datatxt', 'lodash', function ($scope, $location, $routeParams, datatxt, _) {
    $scope.results = [];
    $scope.showCharts = false;
    $scope.currentModelId = $routeParams.modelId;

    $scope.onChartClick = function (point) {
      var selectedIdx = point.x
        , selectedData = {}
        , isCurrent;
      selectedData.micro = $scope.graph.microChart[selectedIdx];
      selectedData.macro = $scope.graph.macroChart[selectedIdx];
      selectedData.selectedId = selectedData.micro.label;
      selectedData.isCurrentModel = _.isEqual(
        $scope.graph.rawModels[selectedData.selectedId].categories,
        $scope.dtModel.categories
      );

      $scope.currentSelection = selectedData;
      $scope.$apply();
    };

    $scope.restoreModel = function () {

      var modelToRestore = $scope.graph.rawModels[$scope.currentSelection.selectedId];
      $scope.restoredModel = false;
      $scope.restoredModelFailed = false;
      $scope.restoreInProgress = true;

      datatxt.updateModel($scope.currentModelId, modelToRestore).then(function() {
        $scope.restoredModel = true;
        $scope.restoreInProgress = false;
        $scope.currentSelection.isCurrentModel = true;
      }, function () {
        $scope.restoredModelFailed = true;
        $scope.restoreInProgress = false;
      });
    };

    $scope.graph = {
      options: {
        rows: [{
          key: 'fscore',
          color: '#ff9800'
        }, {
          key: 'recall',
          color: '#259b24'
        }, {
          key: 'precision',
          color: '#00bcd4'
        }],
        xAxis: {
          key: 'label'
          //padding: {
          //  left: 0,
          //  right: 0
          //}
        },
        legend: {
          show: false
        },
        regions: {
          'precision': [{'style':'dashed'}],
          'recall': [{'style':'dashed'}]
        },
        selection: {
          enabled: true,
          grouped: true,
          multiple: false
        },
        zoom: {
          enabled: false
        },
        onclick: $scope.onChartClick
      }
    };

    function generateChartData (results) {
      var micro = [], macro = [], rawModels = {}
        , floatPrecision = 3;

      _.each(results, function (data) {
        micro.push({
          'label': data.id,
          'fscore': data.results.micro.fscore.toFixed(floatPrecision),
          'recall': data.results.micro.recall.toFixed(floatPrecision),
          'precision': data.results.micro.precision.toFixed(floatPrecision)
        });

        macro.push({
          'label': data.id,
          'fscore': data.results.macro.fscore.toFixed(floatPrecision),
          'recall': data.results.macro.recall.toFixed(floatPrecision),
          'precision': data.results.macro.precision.toFixed(floatPrecision)
        });

        rawModels[data.id] = data.json;
      });
      $scope.graph.microChart = micro;
      $scope.graph.macroChart = macro;
      $scope.graph.rawModels = rawModels;
      $scope.showCharts = true;
    }


    datatxt.getAllTestResults($routeParams.modelId).then(function (data) {
      $scope.results = data;
      generateChartData(data);
    });

    datatxt.getModel($routeParams.modelId).then(function (data) {
      $scope.dtModel = data.data || {};
      $scope.dtModel.name = data.name;
      $scope.dtModel.id = data.id;
      $scope.dtModel.task = data.testing_task;
    });


  }]);
