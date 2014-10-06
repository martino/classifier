'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.models = [];

    $scope.generateData = function (data) {
      var labels = [
        'technical pragmatical view',
        'taken for grantedness',
        'european forces',
        'developemental state',
        'continental capitalism',
        'neo liberism',
        'protecting rents',
        'stigma inertia boiardi',
        'stigma lottizzazione',
        'capture view privatization',
        'labour vs capital',
        'captious view privatizaion'
      ], tmpValues={}, values, categories = data.categories,
        normalizeValue = function (value) {
          return value;
//          return Math.pow(value, 3);
        };

      for (var i=categories.length-1; i>=0; i--) {
        tmpValues[categories[i].name] = categories[i].score;
      }

      values = [
        normalizeValue(tmpValues['technical pragmatical view']),
        normalizeValue(tmpValues['taken for grantedness']),
        normalizeValue(tmpValues['european forces']),
        normalizeValue(tmpValues['developemental state']),
        normalizeValue(tmpValues['continental capitalism']),
        normalizeValue(tmpValues['neo liberism']),
        normalizeValue(tmpValues['protecting rents']),
        normalizeValue(tmpValues['stigma inertia boiardi']),
        normalizeValue(tmpValues['stigma lottizzazione']),
        normalizeValue(tmpValues['capture view privatization']),
        normalizeValue(tmpValues['labour vs capital']),
        normalizeValue(tmpValues['captious view privatizaion'])
      ];

      $scope.graphData = {
        data: {
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
      }
    };

    $scope.classifyText = function (text) {

      $scope.selectedModel = $scope.selectedModel || 'ccac0455-a654-4de4-b243-9f970da6a071';
      var postData = {
        '$app_key': '774fed79470dedd9977e81609690dbbf',
        '$app_id': '3742dcf4',
        'text': text || $scope.fileContent,
        'model': $scope.selectedModel,
        'nex.min_length': 3
      };


      $http({
        method: 'POST',
        url: '/datatxt/cl/v1',
        data: $.param(postData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .success(function (data) {
          $scope.generateData(data);
        })
        .error(function (error) {
          console.log(error)
       })
    };


    $scope.showContent = function($fileContent){
      $scope.fileContent = $fileContent;
      $scope.classifierResults = $scope.classifyText($fileContent);
    };
    $scope.getModels = function () {
      var data = {
        '$app_key': '774fed79470dedd9977e81609690dbbf',
        '$app_id': '3742dcf4'
      };
      $http.get('/datatxt/cl/models/v1', {params:data})
        .success(function (data) {
          var items = data.items, models = [];

          for(var i=items.length-1; i>=0; i--) {
            models.push(
              {
               'id': items[i].id,
               'desc': items[i].data.description,
               'data': items[i].data
              });
          }
          $scope.models = models;
        })
        .error(function (error) {
          console.log(error)
        })
    };

    $scope.getModels();

  }]);
