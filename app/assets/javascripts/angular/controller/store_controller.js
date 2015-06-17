//Factory
// myApp.factory('Products', ['$resource',function($resource){
//   return $resource('/products.json', {},{
//     query: { method: 'GET', isArray: true },
//     create: { method: 'POST' }
//   })
// }]);

myApp.factory('UserLogin', ['Auth',function(Auth){
  return {

      Login: function(){

           Auth.currentUser().then(function(user) {
               return user;
               //console.log(user);

           }, function(error) {
               // unauthenticated error
           });
   }

  }




}]);



//Controller
myApp.controller("StoreListCtr", ['$scope', '$http', '$resource', 'Products', 'Product', '$location','$timeout','Auth','UserLogin', function($scope, $http, $resource, Products, Product, $location,$timeout,Auth,UserLogin) {

    $scope.user = [];
   // $scope.user.push(UserLogin.Login());
  //rating script
         $scope.rating = 1;
          $scope.ratings = [{
              current: 1,
              max: 5
          }];


    //alert(UserLogin.Login());
      Auth.currentUser().then(function(user) {
          $scope.user.push(user);
            //console.log(user);
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
   $scope.page = 260;
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



myApp.controller("StoreShowCtr", ['$window', '$scope', '$resource', 'Product', 'Products', '$location', '$routeParams','$http','Auth', function($window,$scope, $resource, Product, Products,$location, $routeParams, $http,Auth) {
  $scope.product = Product.get({id: $routeParams.id})
  $scope.products = [];

  // $scope.stdImageUrl = 'assets/products/standard_'+ $routeParams.id +'.jpg';

        $scope.review = false;
        $scope.userreview = {};

        $scope.showreview = function (msg){
          $scope.review = msg;


        };

        $scope.getSelectedRating = function (rating) {
          $scope.userreview.rating = rating;
        }


        $scope.postreview = function () {
          //console.log($scope.userreview.rating);
          $http.post('/rate', {score:$scope.userreview.rating, dimension:'price', id:$routeParams.id, klass:'Product', review:$scope.userreview.comment}).
          success(function(data, status, headers, config) {
          if(data == false)
          {
          alert('You need to sign in or sign up before continuing.');
          $scope.ratings = [{
          current: 1,
          max: 5
          }];
          }
          $window.location.reload()
          }).
          error(function(data, status, headers, config) {
          });

        };

        //rating script
         $scope.rating = 1;
          $scope.ratings = [{
              current: 1,
              max: 5
          }];

          $scope.productreviews = [];
          $http.post('/get_reviews',{id:$routeParams.id}).success(function (data) {
                       angular.forEach(data,function (key) {
                           $scope.productreviews.push(key);
                       });
                     });


     $scope.user = [];

      Auth.currentUser().then(function(user) {
          $scope.user.push(user);
           // console.log(user);

            $http.post("/getuser_rate",{rater_id:user.id, rateable_id:$routeParams.id}).success(function (data) {
                 //console.log(data);

                  $scope.ratings = [{
                      current: data[0].stars,
                      max: 5
                  }];
               });

        }, function(error) {
            // unauthenticated error
        });


   $scope.stdImageUrl = '';
   $scope.productimages = [];


   $http.get('/products/'+$routeParams.id+'/getproductimages.json').success(function (data) {
                $scope.totalItems=data.length;
                angular.forEach(data,function (key) {
                    $scope.productimages.push(key);
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
   $scope.stdImageUrl = images;
   $scope.zoomImageUrl = image;
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



myApp.directive('whenScrolled', function($window) {
    return function(scope, elm, attr) {
        var raw = elm[0];

        angular.element($window).bind('scroll', function() {

          //  if (this.scrollTop + this.offsetHeight >= this.scrollHeight) {
              if(this.pageYOffset >= scope.page){
                scope.$apply(attr.whenScrolled);
                 scope.loading = true;
                 scope.page += scope.page;


            }

        });
    };
});

 myApp.filter('slice', function() {
  return function(arr, start, end) {
    return arr.slice(start, end);
  };
});



myApp.controller('ModalInstanceCtrl', function ($scope) {



  $scope.login = function(){
      alert('wow');
  };



});

//rating


myApp.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});
