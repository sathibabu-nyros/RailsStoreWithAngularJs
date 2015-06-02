//Factory
myApp.factory('Products', ['$resource',function($resource){
  return $resource('/products.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

// myApp.factory('Product', ['$resource', function($resource){
//   return $resource('/products/:id.json', {}, {
//     show: { method: 'GET' },
//     update: { method: 'PUT', params: {id: '@id'} },
//     delete: { method: 'DELETE', params: {id: '@id'} }
//   });
// }]);

//Controller
myApp.controller("StoreListCtr", ['$scope', '$http', '$resource', 'Products', 'Product', '$location', function($scope, $http, $resource, Products, Product, $location) {

  
$scope.products = [];


   $scope.Brandfilters = function(taskId){
    return taskId
  };


  $scope.Brandfilters = '';

  $scope.lower_price = 100;
  $scope.upper_price = 500;
  
   $scope.priceRange = function(products) {

    return (products['cost'] >= $scope.lower_price && products['cost'] <= $scope.upper_price);
  };



   $scope.limit = 3;
   // var end = 0;
   // var products = []; 
   $scope.loading = false;
   $scope.startList = 1;

    $scope.loadMore = function () {
       
            $scope.loading = true;
            $http.get("/products.json?page="+$scope.startList+"").success(function (data) {
                $scope.totalItems=data.length;               
                angular.forEach(data,function (key) {
                    $scope.products.push(key);                                  
                });      
                $scope.stopLoadingData = ($scope.products.length === $scope.totalItems);
                $scope.startList += 1;
            });
       
        $scope.loading = false;
    };

   

   $scope.loadMore();
 
}])
.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      return output;
   };
});



myApp.controller("StoreShowCtr", ['$scope', '$resource', 'Product', 'Products', '$location', '$routeParams', function($scope, $resource, Product, Products,$location, $routeParams) {
  $scope.product = Product.get({id: $routeParams.id})
  $scope.products = Products.query();
 
   $scope.stdImageUrl = 'assets/products/standard_'+ $routeParams.id +'.jpg';
   $scope.zoomImageUrl = 'images/products/zoom_'+ $routeParams.id +'.jpg';

   $scope.setImage = function(id) {
 
    //$('#mainimg').attr('src','');
    //$scope.mainImageUrl = imageUrl;

   $scope.stdImageUrl = 'assets/products/standard_'+ id +'.jpg';
   $scope.zoomImageUrl = 'localhost/images/products/zoom_'+ id +'.jpg';
   

    }



}]);

myApp.directive('ngElevateZoom', function() {
  return {
    restrict: 'A',
    scope: true,
    compile: function(scope, element, attrs) {
      $(element).elevateZoom(scope.$eval(attrs.elevateZoom));
    }
  };
});

myApp.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
      
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.loading = true;
                scope.$apply(attr.whenScrolled);
            }
            
        });
    };
});
