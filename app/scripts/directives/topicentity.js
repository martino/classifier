'use strict';

/**
 * @ngdoc directive
 * @name classifierApp.directive:topicEntity
 * @description
 * # topicEntity
 */
angular.module('classifierApp')
  .directive('topicEntity', ['datatxt', '$modal', function (datatxt, $modal) {
    return {
      templateUrl: 'views/directive-topicentity.html',
      restrict: 'E',
      scope: {
        entity: '=',
        editMode: '=',
        category: '='
      },
      link: function postLink(scope, element, attrs) {
        var entityDetails;

        scope.entityData = null;
        scope.deleteEntity = function () {
          scope.$emit(
            'deleteEntity',
            {'entity':scope.entity.wikipage, 'category': scope.category}
          )
        };
        scope.entityData = datatxt.getTopic(scope.entity.wikipage, 'it');

        scope.openDetails = function () {
          var template = 'entityDetails-' + scope.entityData.id + '.html'
          template = 'views/modal-topicentity.html'
          console.log(template);
          var modalInstance = $modal.open({
            templateUrl: template,
            controller: 'EntitymodaldetailsCtrl',
            size: 'lg',
            resolve: {
              entity: function () {
                console.log('resolve')
                return scope.entityData;
              }
            }
          });

          modalInstance.result.then(function (selectedItem) {
            scope.selected = selectedItem;
          }, function (data) {
            console.log('dismiss', data)
          });
        };

        window.merda = scope.openDetails;

      }
    };
  }]);
