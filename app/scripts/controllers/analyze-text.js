'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('AnalyzeText', ['$rootScope', '$scope', '$http', '$q', 'datatxt', 'lodash', function ($rootScope, $scope, $http, $q, datatxt, _) {
    $scope.models = [];
    $scope.defaultModel = 'f83cc491-38e1-4203-bc18-25b076eeeeb4';
    $rootScope.page = 'article';
    $scope.loading = false;
    $scope.error = false;


    $scope.getCurrentModel = function () {
      if ($scope.selectedModel === undefined) return {};
      return _.find($scope.models, {id: $scope.selectedModel});
    };

    var getCurrentModelCategories = function () {
      return _.map($scope.getCurrentModel().data.categories, function (category) {
        return category.name
      })
    };
    $scope.uploadClick = function () {
      angular.element('#fileUpload').trigger('click');
    };

    $scope.topicCoverageStyle = function (topic) {
      return {
        'width': topic.coverage + '%'
      }
    };

    var getCategoryNameIdx = function (topicName) {
      var categories = getCurrentModelCategories();
      return _.indexOf(categories, topicName) + 1;
    };

    $scope.topicProgressClass = function (topicName) {
      return 'color-' + getCategoryNameIdx(topicName) + '-bg';
    };

    $scope.topicBorderClass = function (topic) {
      if (!('name' in topic))
        return '';

      var colorIdx = getCategoryNameIdx(topic.name);
      return 'color-' + colorIdx + ' color-' + colorIdx + '-bg-light';
    };

    $scope.topicColorClass = function (topic) {
      if (!('name' in topic))
        return '';
      return 'color-' + getCategoryNameIdx(topic.name) + '-color';
    };

    var classifyText = function (text, model) {
      var deferred = $q.defer();

      datatxt.classifier(text , model)
        .then(
        function (data) {
          deferred.resolve( {
            'text': text,
            'response': data
          })
        },
        function (data) {
          deferred.reject(data);
        }
      );
      return deferred.promise;
    };

    $scope.classifyTexts = function (texts) {
      var totalLen = 0;
      $scope.selectedModel = $scope.selectedModel || $scope.defaultModel;
      $scope.analyzedText = null;
      $scope.topicCoverages = null;
      $scope.loading = true;
      $scope.error = false;


      var coverages = _.map(getCurrentModelCategories(), function (name) {
        return {
          name: name,
          len: 0
        }
      });

      var responses = _.map(texts, function (text) {
        totalLen += text.length;
        return classifyText(text, $scope.selectedModel)
      });

      $q.all(responses).then(function (responses) {
        $scope.analyzedText = _.map(responses, function (data) {
          var threshold = 0.20
            , category = _.sortBy(data.response.categories, 'score').reverse()[0] || {};

          if ('score' in category){
            category = (category.score > threshold) ? category : {};
            var tmpTopic = _.where(coverages, {name: category.name})[0];
            if (tmpTopic)
              tmpTopic.len += data.text.length;
          }

          return {
            text: data.text,
            category: category
          }
        });
        $scope.topicCoverages = _.map(coverages, function (topic) {
          var normCoverage = topic.len;
          if ((normCoverage > 0) && (totalLen > 0)) {
            normCoverage = (normCoverage * 100) / totalLen
          }
          return {
            name: topic.name,
            coverage: normCoverage
          }
        });

        $scope.loading = false;

      }, function (responses) {
          $scope.error = true;
          $scope.loading = false;

        }
      );
    };

    $scope.startClassifyTexts = function () {
      $scope.classifyTexts($scope.fileContent.split(/\.\r\n/));
    };

    $scope.showContent = function($fileContent){
      $scope.fileContent = $fileContent;
      $scope.startClassifyTexts();
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
