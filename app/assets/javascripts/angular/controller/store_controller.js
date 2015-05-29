//Factory
// myApp.factory('Products', ['$resource',function($resource){
//   return $resource('/products.json', {},{
//     query: { method: 'GET', isArray: true },
//     create: { method: 'POST' }
//   })
// }]);

// myApp.factory('Product', ['$resource', function($resource){
//   return $resource('/products/:id.json', {}, {
//     show: { method: 'GET' },
//     update: { method: 'PUT', params: {id: '@id'} },
//     delete: { method: 'DELETE', params: {id: '@id'} }
//   });
// }]);

//Controller
myApp.controller("StoreListCtr", ['$scope', '$http', '$resource', 'Products', 'Product', '$location', function($scope, $http, $resource, Products, Product, $location) {

  $scope.products = Products.query();

   

   $scope.Brandfilters = function(taskId){
    return taskId
  };

  $scope.Brandfilters = '';

  $scope.lower_price = 100;
  $scope.upper_price = 500;
  
   $scope.priceRange = function(products) {

    return (products['cost'] >= $scope.lower_price && products['cost'] <= $scope.upper_price);
  };
 
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
 
   // $scope.mainImageUrl = 'http://lorempixel.com/400/300/sports/' + $scope.product.id;

   // $scope.setImage = function(imageUrl) {
 
   //  //$('#mainimg').attr('src','');
   //  $scope.mainImageUrl = imageUrl;

   

   //  }


}]);




