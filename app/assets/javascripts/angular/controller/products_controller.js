//Factory
myApp.factory('Products', ['$resource',function($resource){
  return $resource('/products.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('Product', ['$resource', function($resource){
  return $resource('/products/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);

//Controller
myApp.controller("ProductListCtr", ['$scope', '$http', '$resource', 'Products', 'Product', '$location', function($scope, $http, $resource, Products, Product, $location) {

  $scope.products = Products.query();

  $scope.deleteProduct = function (productId) {
    if (confirm("Are you sure you want to delete this product?")){
      Product.delete({ id: productId }, function(){
        $scope.products = Products.query();
        $location.path('/products');
      });
    }
  };
}]);

myApp.controller("ProductUpdateCtr", ['$scope', '$resource', 'Product', '$location', '$routeParams','Upload','$http', function($scope, $resource, Product, $location, $routeParams, Upload,$http) {

  $scope.product = Product.get({id: $routeParams.id})
  //load product images
  $scope.productimages = [];
  
   $http.get('/products/'+$routeParams.id+'/image_show.json').success(function (data) {
                $scope.totalItems=data.length;               
                angular.forEach(data,function (key) {
                    $scope.productimages.push(key);                                  
                });
                  });      

  $scope.update = function(){
    if ($scope.productForm.$valid){
      Product.update({id: $scope.product.id},{product: $scope.product},function(){
        $location.path('/products');
      }, function(error) {
        console.log(error)
      });
    }
  };
  
 $scope.upload = function (files) {     
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    method: 'PUT',
                    url: '/products/'+$routeParams.id+'/upload_images/',                     
                    file: file,
                    fileFormDataName: 'avatar'                    
                });
            }
            $location.path('/products/'+$routeParams.id+'/edit');
            $scope.productimages = [];
  
          $http.get('/products/'+$routeParams.id+'/image_show.json').success(function (data) {
                      $scope.totalItems=data.length;               
                      angular.forEach(data,function (key) {
                          $scope.productimages.push(key);                                  
                      });
                    }); 
        }

    };

}]);

myApp.controller("ProductAddCtr", ['$scope', '$resource', 'Products', '$location','Upload','$http', function($scope, $resource, Products,  $location, Upload, $http) {
 // $scope.avatars = {};
  $scope.product = {};

   

  $scope.save = function () {
    if ($scope.productForm.$valid){
      Products.create({product : $scope.product},function(){
        $location.path('/products');
      }, function(error){
        console.log(error)
      });
    }

    
    // for (var i = 0; i < picFiles.length; i++) {
    //     var file = picFiles[i];
    //     $scope.upload = Upload.upload({
    //         url: '/products.json',
    //         method: 'POST',            
    //         file: file,
    //         fileFormDataName: 'user[image]'
    //     });
    // }


  };

 
   
    
     $scope.upload = function (files) {     
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/products',
                     fields: { 'product[name]': $scope.product.name,
                               'product[cost]': $scope.product.cost,
                               'product[brand]': $scope.product.brand,
                               'product[description]': $scope.product.description
                             },
                    file: file,
                    fileFormDataName: 'product[avatar]'                    
                });
            }
        }
    };

}]);




