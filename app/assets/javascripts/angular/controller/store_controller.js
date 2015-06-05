//Factory
myApp.factory('Products', ['$resource',function($resource){
  return $resource('/products.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('UserLogin', ['Auth',function(Auth){
  return {

      Login: function(){

           Auth.currentUser().then(function(user) {           
               return user;
               console.log(user); 
              
           }, function(error) {
               // unauthenticated error
           });
   }

  }


        
 
}]);

// myApp.factory('Product', ['$resource', function($resource){
//   return $resource('/products/:id.json', {}, {
//     show: { method: 'GET' },
//     update: { method: 'PUT', params: {id: '@id'} },
//     delete: { method: 'DELETE', params: {id: '@id'} }
//   });
// }]);

//Controller
myApp.controller("StoreListCtr", ['$scope', '$http', '$resource', 'Products', 'Product', '$location','$timeout','Auth','UserLogin', function($scope, $http, $resource, Products, Product, $location,$timeout,Auth,UserLogin) {

    $scope.user = [];
   // $scope.user.push(UserLogin.Login()); 

    //alert(UserLogin.Login());
      Auth.currentUser().then(function(user) {           
          $scope.user.push(user);
            console.log(user); 
        }, function(error) {
            // unauthenticated error
        });

        $scope.logout = function (){

           var config = {
            headers: {
                'X-HTTP-Method-Override': 'DELETE'
                  }
              };
              // Log in user...
              // ...
              Auth.logout(config).then(function(oldUser) {
                  // alert(oldUser.email + "you're signed out now.");
                   $location.path('/stasdfghjkore');
              }, function(error) {
                  // An error occurred logging out.
              });

              $scope.$on('devise:logout', function(event, oldCurrentUser) {
                  // ...
              });

        };


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

            $timeout(function(){
                 $http.get("/products.json?page="+$scope.startList+"").success(function (data) {
                $scope.totalItems=data.length;               
                angular.forEach(data,function (key) {
                    $scope.products.push(key);                                  
                });      
                //$scope.stopLoadingData = ($scope.products.length === $scope.totalItems);
                $scope.startList += 1;
            }); 
            if($scope.totalItems < 1){
              $scope.loading = false;
            } 
            $timeout(function(){
              $scope.loading = false;
            },500);               
             
            }, 500);  
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



myApp.controller("StoreShowCtr", ['$scope', '$resource', 'Product', 'Products', '$location', '$routeParams','$http','Auth', function($scope, $resource, Product, Products,$location, $routeParams, $http,Auth) {
  $scope.product = Product.get({id: $routeParams.id})
  $scope.products = [];

  // $scope.stdImageUrl = 'assets/products/standard_'+ $routeParams.id +'.jpg';
  
  
   
     $scope.user = [];
  
      Auth.currentUser().then(function(user) {           
          $scope.user.push(user);
            console.log(user); 
        }, function(error) {
            // unauthenticated error
        });


   $scope.stdImageUrl = '';
   $scope.productimages = [];
   $scope.productimagesoriginal = [];
   $scope.productimages = [];
  
   $http.get('/products/'+$routeParams.id+'/image_show.json').success(function (data) {
                $scope.totalItems=data.length;               
                angular.forEach(data,function (key) {
                    $scope.productimages.push(key);                                  
                });
              });   

    $http.get('/products/'+$routeParams.id+'/originalimage_show.json').success(function (data) {
                $scope.totalItems=data.length;               
                angular.forEach(data,function (key) {
                    $scope.productimagesoriginal.push(key);                                  
                });
              }); 

     $http.get("/products.json?").success(function (data) {
                $scope.totalItems=data.length;               
                angular.forEach(data,function (key) {
                    $scope.products.push(key);                                  
                });    
               });     

   $scope.setImage = function(images,image) {
 
    //$('#mainimg').attr('src','');
    //$scope.mainImageUrl = imageUrl;
   $scope.product.show = true;
   $scope.stdImageUrl = image;
   $scope.zoomImageUrl = images;
   //$scope.zoomImageUrl = 'localhost/images/products/zoom_'+ id +'.jpg';
   

    }


     $scope.logout = function (){

           var config = {
            headers: {
                'X-HTTP-Method-Override': 'DELETE'
                  }
              };           
              Auth.logout(config).then(function(oldUser) {
                  // alert(oldUser.email + "you're signed out now.");
                   $location.path('/stasdfghjkore');
              }, function(error) {
                 
              });

              $scope.$on('devise:logout', function(event, oldCurrentUser) {
                  // ...
              });

        };



}]);

// myApp.directive('ngElevateZoom', function() {
//   return {
//     restrict: 'A',
//     scope: true,
//     compile: function(scope, element, attrs) {
//       $(element).elevateZoom(scope.$eval(attrs.elevateZoom));
//     }
//   };
// });

myApp.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
      
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
               
                scope.$apply(attr.whenScrolled);
                 scope.loading = true;
            }
            
        });
    };
});

 myApp.filter('slice', function() {
  return function(arr, start, end) {
    return arr.slice(start, end);
  };
});

// myApp.directive('hiddenRepeat',function($parse){
//   return {
//     link: function(scope, elem, attr){
//       var data = $parse(attr.hiddenRepeat)(scope);
//       if(data){
//         for (var i=0;i< data.length;i++){ 
//        elem.append('<div><img u="image" src="{{product.avatar_content_type}}" /></div>');
       
//         }  
//       }
//     }
//   };
// });

myApp.controller('ModalInstanceCtrl', function ($scope) {

  

  $scope.login = function(){
      alert('wow');
  };
  

 
});