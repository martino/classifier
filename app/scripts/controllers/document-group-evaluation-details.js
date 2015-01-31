'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:DocumentGroupEvaluationDetailsCtrl
 * @description
 * # DocumentGroupEvaluationDetailsCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('DocumentGroupEvaluationDetailsCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'datatxt', 'lodash', function ($rootScope, $scope, $location, $routeParams, datatxt, _) {
    $rootScope.page = 'documents';
    $scope.results = [];
    $scope.classes = {};
    $scope.selectedClass = '!null';

    $scope.selectClass = function (cls) {
      $scope.selectedClass = cls;
    };

    datatxt.getDocumentGroupsEvaluation($routeParams.docId, $routeParams.testId).then(function (data) {
      var tmp_results = {};
      $scope.documentGroupResults = data;

      _.each(data.scoring_result, function (value, key) {
          if (!(key in $scope.classes))
            $scope.classes[key] = 0;

          _.each(value, function(doc) {
            if (!(doc.id in tmp_results))
              tmp_results[doc.id] = {
                'fileName': doc.file_name,
                'classes': []
              };
            $scope.classes[key] += 1;
            tmp_results[doc.id].classes.push(key);
          })
        });

      _.each(tmp_results, function (value, key) {
        value.id = key;
        $scope.results.push(value);
      })
    });
  }]);
