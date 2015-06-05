//UserLoginCtr
myApp.controller("UserLoginCtr", ['$scope', 'Auth','$location', function($scope,Auth,$location) {

    $scope.user={};

    $scope.login = function (){

       var credentials = {
            email:  $scope.user.email,
            password:  $scope.user.password
        };
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

        Auth.login(credentials, config).then(function(user) {
            console.log(user); // => {id: 1, ect: '...'}
        }, function(error) {
            // Authentication failed...
        });

        $scope.$on('devise:login', function(event, currentUser) {
            // after a login, a hard refresh, a new tab
            $scope.user={};
            $location.path('/store');
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
        });


    };
 
}]);


//UserRegisterCtr
myApp.controller("UserRegisterCtr", ['$scope', 'Auth','$location', function($scope,Auth,$location) {

     $scope.user={};

  $scope.register = function (){
  var credentials = {
            email:  $scope.user.email,
            password:  $scope.user.password,
            password_confirmation: $scope.user.cpassword
        };
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

        Auth.register(credentials, config).then(function(registeredUser) {
            console.log(registeredUser); 
            Auth.login(credentials, config);
            $location.path('/store');
        }, function(error) {
            // Registration failed...
        });

        $scope.$on('devise:new-registration', function(event, user) {
            // ...
        });

}
 
}]);