var app = angular.module('personalProject');

app.controller('mainCtrl', function($scope, $location, $q, $http, mainService) {

    $scope.pageTitle = $location.url()
    $scope.showGrainInputs = false;
    $scope.showHopsInputs = false;
    $scope.showYeastInputs = false;
    $scope.showWaterInputs = false;

    $scope.toggleShowGrainInputs = function() {
        $scope.showGrainInputs = !$scope.showGrainInputs;
    }

    //jQuery functions
    $(function() {

      $('.grainBox').on('click', function() {
          $('.grainBox .boxImage').toggleClass('open');
          $('input.grain').toggle(150);
          $('.hopsBox, .yeastBox, .waterBox').fadeToggle(500);
          $('.ingredient.hops, .ingredient.yeast, .ingredient.water').toggleClass('hidden');

      });

      $('.hopsBox').on('click', function() {
          $('.hopsBox .boxImage').toggleClass('open');
          $('input.hops').toggle(150);
          $('.grainBox, .yeastBox, .waterBox').fadeToggle(500)
          $('.ingredient.grain, .ingredient.yeast, .ingredient.water').toggleClass('hidden');
      });

      $('.yeastBox').on('click', function() {
          $('.yeastBox .boxImage').toggleClass('open');
          $('input.yeast').toggle(150);
          $('.hopsBox, .grainBox, .waterBox').fadeToggle(500);
          $('.ingredient.grain, .ingredient.hops, .ingredient.water').toggleClass('hidden');

      });

      $('.waterBox').on('click', function() {
          $('.waterBox .boxImage').toggleClass('open');
          $('input.water').toggle(150);
          $('.hopsBox, .yeastBox, .grainBox').fadeToggle(500);
          $('.ingredient.grain, .ingredient.yeast, .ingredient.hops').toggleClass('hidden');

      });

    });

    // $scope.grainSearch = function(grainSearchText) {
    //     mainService.grainSearch(grainSearchText).then(function(resp) {
    //         $scope.selectGrains = resp.data;
    //     });
    // };

});
