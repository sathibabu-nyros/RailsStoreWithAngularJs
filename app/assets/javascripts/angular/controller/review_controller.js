


myApp.controller("ReviewShowCtr", ['$window', '$scope', '$resource', 'Product', 'Products', '$location', '$routeParams','$http','Auth', function($window,$scope, $resource, Product, Products,$location, $routeParams, $http,Auth) {

  $scope.productreviews = [];

  $http.post('/get_allreviews',{id:$routeParams.id,page:1}).success(function (data) {
               angular.forEach(data,function (key) {
                   $scope.productreviews.push(key);
               });
             });

             $scope.startList = 2

             $scope.loadMore = function () {


      $http.post('/get_allreviews',{id:$routeParams.id,page:$scope.startList}).success(function (data) {

                         angular.forEach(data,function (key) {
                           $scope.productreviews.push(key);
                         });
                         //$scope.stopLoadingData = ($scope.products.length === $scope.totalItems);
                         $scope.startList += 1;
                     });



             };

}]);
