'use strict';

/**
 * @ngdoc directive
 * @name classifierApp.directive:topicEntity
 * @description
 * # topicEntity
 */
angular.module('classifierApp')
  .directive('topicEntity', ['datatxt', function (datatxt) {
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
      }
    };
  }]);
