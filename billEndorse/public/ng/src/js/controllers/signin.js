'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope','$rootScope', '$http', '$state','REST_URL','HttpService','$localStorage', 
                                        function($scope, $rootScope,$http, $state, REST_URL,HttpService,$localStorage) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      HttpService.post(REST_URL.login, {username: $scope.user.email, password: $scope.user.password, orgName: "org1"}).then(function (response) {
    	  if ( response.data.success) {
              var loginName = response.data.user.name;
              $localStorage.loginRole = loginName;
              $localStorage.loginname = loginName;
              $localStorage.loginuser = response.data.user;
              sessionStorage.setItem("token", response.data.token)
              $scope.$emit('signinToAppCtrlForRole', loginName);
              $scope.$emit('signinToAppCtrlForLoginName', loginName);

              $state.go('app.table.myBill');

          }else{
              $scope.authError = response.data.message;
          }
      }, function(error) {
    	  $scope.authError = 'Server Error';
      });
    };
    

    
    $scope.logout = function() {
    	if ($localStorage.loginname != null && $localStorage.loginname!= '') {
    		HttpService.post(REST_URL.logout, {username: $scope.user.email}).then(function (response) {

                $localStorage.loginRole = null;
                $localStorage.loginname = null;
                $localStorage.loginuser = null;
                sessionStorage.removeItem("token");

				$state.go('access.signin');

        	});
    	}
    };
    


  }])
;