'use strict';

/**
 * @ngdoc directive
 * @name classifierApp.directive:topicEntity
 * @description
 * # topicEntity
 */
angular.module('classifierApp')
  .directive('topicEntity', ['datatxt', '$modal', '$window', function (datatxt, $modal, $window) {
    return {
      templateUrl: 'views/directive-topicentity.html',
      restrict: 'E',
      scope: {
        entity: '=',
        editMode: '=',
        category: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.entityData = null;
        scope.editWeigthMode = false;

        scope.deleteEntity = function (bulk) {
          var signal = 'deleteEntity';

          if (bulk)
            signal = 'deleteEntityBulk';

          scope.$emit(
            signal,
            {'entity':scope.entity.wikipage, 'category': scope.category}
          )
        };
        scope.entityData = datatxt.getTopic(scope.entity.wikipage, 'it');

        scope.addRelated = function () {
          scope.$emit(
            'addRelated',
            {'entity':scope.entity.wikipage, 'category': scope.category}
          )
        };

        scope.editWeight = function () {
          scope.editWeigthMode = true;
          scope.entityWeight = scope.entity.weight;
        };

        scope.closeEditWeight = function (saveResult) {
          if (saveResult) {
            scope.entity.weight = scope.entityWeight;
            scope.$emit(
              'editWeight',
              {'entity':scope.entity.wikipage, 'category': scope.category, 'weight': scope.entityWeight}
            )
          }
          scope.editWeigthMode = false;
        };

        scope.openDetails = function () {
          var modalInstance = $modal.open({
            templateUrl: 'views/modal-topicentity.html',
            controller: 'EntitymodaldetailsCtrl',
            size: 'lg',
            resolve: {
              entity: function () {
                return scope.entityData;
              }
            }
          });

          modalInstance.result.then(function (selectedItem) {
            scope.selected = selectedItem;
          }, function (data) {
          });
        };
      }
    };
  }]);
