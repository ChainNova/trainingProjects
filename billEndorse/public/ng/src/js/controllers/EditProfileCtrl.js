app.controller('EditProfileCtrl', ['$scope', '$rootScope', '$http', '$modal', '$log', 'REST_URL', 'HttpService','DialogService','$localStorage','$state','$stateParams',
    function ($scope, $rootScope, $http, $modal, $log, REST_URL, HttpService, DialogService,$localStorage,$state,$stateParams) {

	$scope.item = {};
	
	var _getCurrentUser = function() {
		var input = {pagenum: 1, pagesize: 10};
        if ($localStorage.loginname != null && $localStorage.loginname != '') {
            input.name = $localStorage.loginname;
        }
		HttpService.post(REST_URL.findUserInfo).then(function (response) {
			$scope.item = JSON.parse(response.data.obj); 
        });
	};
	
	_getCurrentUser();
	
	$scope.save = function() {
//		if ($scope.item.sex == null || $scope.item.sex == '') {
//    		
//    		DialogService.open('infoDialog',{
// 	    		scope:$scope, 
// 	    		title:'提示',
// 	    		message:'请选择性别' ,
// 	    		onOk : function (value) {
// 	    			
// 				}, 
// 				onCancel : function (value){	
// 					// do nothing
// 				}});
//			return;
//    		return;
//    	}
//		if ($scope.item.password != $scope.item.password2) {
//			DialogService.open('infoDialog',{
// 	    		scope:$scope, 
// 	    		title:'提示',
// 	    		message:'两次输入的密码不同' ,
// 	    		onOk : function (value) {
// 	    			
// 				}, 
// 				onCancel : function (value){	
// 					// do nothing
// 				}});
//			return;
//		}
		HttpService.post(REST_URL.updateMenuUser, $scope.item).then(function (response) {
            //alert("updateuser success");
            DialogService.open('infoDialog',{
 	    		scope:$scope, 
 	    		title:'提示',
 	    		message:'更新成功' ,
 	    		onOk : function (value) {
 	    			
 				}, 
 				onCancel : function (value){	
 					// do nothing
 				}});

            
        });
	};   
	
	$scope.cancel = function() {
		console.log($state);
		$state.go('app.table.userBuyCarsMgr');
	};
	

    $scope.sexList = $localStorage.master.sexList;
    $scope.selectedOption = {};
    $scope.selectedOption.sex = {itermKey: $scope.item.sex,itermValue:''};

    $scope.$watch('selectedOption.sex', function (newVal, oldVal) {
    	if(newVal == oldVal) {return;}
    	if(newVal == null) {
    		$scope.item.sex = '';
    	}else {
    	    $scope.item.sex = newVal.itermKey;
    	}
    }, true);
	
	$scope.sexValidate = true;
    $scope.confirmPwdValidate = true;
    $scope.$watch('item', function (newVal, oldVal) {
    	if(newVal == oldVal) {return;}
    	if ($scope.item.sex == null ||  $scope.item.sex == '' || ($scope.item.sex != 1 && $scope.item.sex != 2)) {
    		$scope.sexValidate = false;
    		$scope.form.$setValidity("item.sex", false);
    	}else if ($scope.item.sex == 1 || $scope.item.sex == 2) {
    		$scope.sexValidate = true;
    		$scope.form.$setValidity("item.sex", true);
    	}
    	
    	if ($scope.item.password != null && $scope.item.password != '' && $scope.item.password2 != null && $scope.item.password2 != '' && $scope.item.password != $scope.item.password2) {   		
    		$scope.confirmPwdValidate = false;
    		$scope.form.$setValidity("item.password2", false);
    	}else {
    		$scope.confirmPwdValidate = true;
    		$scope.form.$setValidity("item.password2", true);
    	}
    	console.log('sexValidate: '+$scope.sexValidate);
    	console.log('confirmPwdValidate: '+ $scope.confirmPwdValidate);
    }, true);
	
	
}]);