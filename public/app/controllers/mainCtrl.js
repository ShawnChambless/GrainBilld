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
          $('input.grain').toggle(150);
          $('.hopsBox .front, .yeastBox .front, .waterBox .front').fadeToggle(650);
      });

      $('.hopsBox').on('click', function() {
          $('.hopsBox').toggleClass('open');
          $('input.hops').toggle(150);
          $('.grainBox .front, .yeastBox .front, .waterBox .front').fadeToggle(650);
      });

      $('.yeastBox').on('click', function() {
          $('.yeastBox').toggleClass('open');
          $('input.yeast').toggle(150);
          $('.hopsBox .front, .grainBox .front, .waterBox .front').fadeToggle(650);
      });

      $('.waterBox').on('click', function() {
          $('.waterBox').toggleClass('open');
          $('input.water').toggle(150);
          $('.hopsBox .front, .yeastBox .front, .grainBox .front').fadeToggle(650);
      });

    });

});
