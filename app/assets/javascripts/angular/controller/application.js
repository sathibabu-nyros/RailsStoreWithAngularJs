var myApp = angular.module('myapplication', ['ngRoute', 'ngResource','uiSlider','ngFileUpload','Devise','ui.bootstrap','angularFileUpload']);

//Routes
myApp.config([
  '$routeProvider', '$locationProvider','AuthProvider', function($routeProvider, $locationProvider,AuthProvider) {
    $routeProvider.when('/users',{
      templateUrl: '/templates/users/index.html',
      controller: 'UserListCtr'
    });
    $routeProvider.when('/users/new', {
      templateUrl: '/templates/users/new.html',
      controller: 'UserAddCtr'
    });
    $routeProvider.when('/users/:id/edit', {
      templateUrl: '/templates/users/edit.html',
      controller: "UserUpdateCtr"
    });
    $routeProvider.when('/products',{
      templateUrl: '/templates/products/index.html',
      controller: 'ProductListCtr'
    });
    $routeProvider.when('/products/new', {
      templateUrl: '/templates/products/new.html',
      controller: 'ProductAddCtr'
    });
    $routeProvider.when('/products/:id/edit', {
      templateUrl: '/templates/products/edit.html',
      controller: "ProductUpdateCtr"
    });
    $routeProvider.when('/products/:id/upload', {
      templateUrl: '/templates/products/upload.html',
      controller: "ProductUpdateCtr"
    });
    $routeProvider.when('/store',{
      templateUrl: '/templates/store/index.html',
      controller: 'StoreListCtr'
    });
    $routeProvider.when('/store/:id/show', {
      templateUrl: '/templates/store/show.html',
      controller: 'StoreShowCtr'
    });
    $routeProvider.when('/users/login',{
      templateUrl: '/templates/users/login.html',
      controller: 'UserLoginCtr'
    });
    $routeProvider.when('/users/register', {
      templateUrl: '/templates/users/register.html',
      controller: 'UserRegisterCtr'
    });
    $routeProvider.when('/reviews/:id/show', {
      templateUrl: '/templates/reviews/index.html',
      controller: 'ReviewShowCtr'
    });
    // $routeProvider.when('/users/logout', {
    //   templateUrl: '/templates/store/index.html',
    //   controller: 'StoreListCtr'
    // });
    $routeProvider.otherwise({
      redirectTo: '/store'
    });
  }
]);
