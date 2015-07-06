var app = angular.module('personalProject');

app.controller('mainCtrl', function($scope, $location) {

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

      $(".grainBox").on("click", function() {
          $(".grainBox").toggleClass("open");
          $('input.grain').toggle('fast');
          $('.hopsBoxContainer').slideToggle('fast');
          $('.yeastBoxContainer').slideToggle('fast');
          $('.waterBoxContainer').slideToggle('fast');
      });

      $('.hopsBox').on('click', function() {
          $('.hopsBox').toggleClass('open');
          $('input.hops').toggle('fast');
          $('.grainBoxContainer').slideToggle('fast');
          $('.yeastBoxContainer').slideToggle('fast');
          $('.waterBoxContainer').slideToggle('fast');
      });

      $('.yeastBox').on('click', function() {
          $('.yeastBox').toggleClass('open');
          $('input.yeast').toggle('fast');
          $('.hopsBoxContainer').slideToggle('fast');
          $('.grainBoxContainer').slideToggle('fast');
          $('.waterBoxContainer').slideToggle('fast');
      });

      $('.waterBox').on('click', function() {
          $('.waterBox').toggleClass('open');
          $('input.water').toggle('fast');
          $('.hopsBoxContainer').slideToggle('fast');
          $('.yeastBoxContainer').slideToggle('fast');
          $('.grainBoxContainer').slideToggle('fast');
      });

    });

});
