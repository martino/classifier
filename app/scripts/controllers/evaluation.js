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

    var onChartClick = function (point) {
      var selectedIdx = point.x
        , selectedData = {};
      selectedData.micro = $scope.graph.microChart[selectedIdx];
      selectedData.macro = $scope.graph.macroChart[selectedIdx];
      $scope.currentSelection = _.cloneDeep(selectedData);
      console.log('click', selectedIdx);
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
        },
        regions: {
          'precision': [{'style':'dashed'}],
          'recall': [{'style':'dashed'}]
        },
        selection: {
          enabled: true,
          grouped: true,
          multiple: false,
          onselected: function (d, element) {
            console.log('selected',d, element);
          }
        },
        onclick: onChartClick
      }
    };

    function generateChartData (results) {
      var micro = [], macro = []
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
      });
      $scope.graph.microChart = micro;
      $scope.graph.macroChart = macro;
      $scope.showCharts = true;
    }


    datatxt.getAllTestResults($routeParams.modelId).then(function (data) {
      $scope.results = data;
      generateChartData(data);
    })


  }]);
