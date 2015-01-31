'use strict';

/**
 * @ngdoc function
 * @name classifierApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the classifierApp
 */
angular.module('classifierApp')
  .controller('AnalyzeText', ['$rootScope', '$scope', '$http', '$q', 'datatxt', 'lodash', '$modal', '$routeParams', function ($rootScope, $scope, $http, $q, datatxt, _, $modal, $routeParams) {
    $scope.models = [];
    $scope.selectedModel = 'f83cc491-38e1-4203-bc18-25b076eeeeb4';
    $scope.selectedModel = '7b435adc-a363-4dda-aa90-677b921cb165';
    $scope.selectedModel = '23ff3152-7e95-4381-b7d2-ab077981e62a';

    $scope.loading = true;
    $scope.error = false;
    $scope.loadedDoc = false;

    if ($routeParams.docId) {
      $rootScope.page = 'documents';
      datatxt.getDocument($routeParams.docId).then(function (data) {
        $scope.fileContent = data.text;
        $scope.tmpFileContent = $scope.cleanRawText(data.text);
        $scope.fileName = data.name;
        $scope.loadedDoc = true;
        $scope.documentGroup = data.group;
        $scope.loading = false;

      })
    } else {
      $rootScope.page = 'article';
      $scope.loading = false;
    }



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

    $scope.cleanRawText = function (text) {
      return text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/[\n]+/g, '<br>');
    };

    $scope.classifyTexts = function (texts) {
      var totalLen = 0;
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
          var threshold = 0.3
            , category = _.sortBy(data.response.categories, 'score').reverse()[0] || {}
            , cleanedText = $scope.cleanRawText(data.text);

          if ('score' in category){
            category = (category.score > threshold) ? category : {};
            var tmpTopic = _.where(coverages, {name: category.name})[0];
            if (tmpTopic)
              tmpTopic.len += data.text.length;
          }

          return {
            text: cleanedText,
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
    $scope.showScoreDetails = function (topic, scoreDetails) {
      var modalInstance = $modal.open({
        templateUrl: 'views/modal-scoredetails.html',
        controller: 'ScoredetailsmodalCtrl',
        //size: 'lg',
        resolve: {
          topic: function () {
            return topic
          },
          scoreDetails: function () {
            return scoreDetails
          },
          currentModel: function () {
            return $scope.selectedModel;
          }
        }
      });
    };

    $scope.startClassifyTexts = function () {
      var splitted = $scope.fileContent.split(/\.\r\n/);

      if (splitted.length < 2)
        splitted = $scope.fileContent.split(/\.\n/);

      $scope.classifyTexts(splitted);
    };
    $scope.loadExample = function (exampleNumber) {
      var examples = ['01-04-1994 SS940401001AAA.txt', '03-03-1995 SS950303029BAA.txt']
        , prefix = '/data/'
        , fileName = examples[exampleNumber-1];

      $http.get(prefix + fileName).success(function (data) {
        $scope.fileContent = data;
        $scope.fileName = fileName;
        $scope.startClassifyTexts();
      });
    };

    $scope.showContent = function($fileContent){
      $scope.fileContent = $fileContent;
      $scope.fileName = angular.element('#fileUpload').val();
      $scope.startClassifyTexts();
    };

    datatxt.getAllModels().then(function (data) {
      var items = data, models = [];
      for(var i=items.length-1; i>=0; i--) {
        models.push(
          {
            'id': items[i].id,
            'desc': items[i].data.description,
            'name': items[i].name,
            'data': items[i].data,
            'labels': items[i].data.categories.map(function (el) {return el.name})
          });
      }
      $scope.models = models;
    });

  }]);
