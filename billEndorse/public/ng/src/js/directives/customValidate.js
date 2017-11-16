angular.module('app').directive('emailValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                scope.emailValidateFormate = (viewValue && /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(viewValue)) ? 'valid' : undefined;
                
                if(scope.emailValidateFormate) {
                    ctrl.$setValidity(attrs.ngModel, true);
                    //elm.$setValidity('pwd', true); //<-- 这样用也是没问题的
                    //这里还可以继续做其他的事情
                    return viewValue;
                } else {
                    ctrl.$setValidity(attrs.ngModel, false);                    
                    //elm.$setValidity('pwd', false); //<-- 这样用也是没问题的
                    //这里还可以继续做其他的事情
                    return undefined;
                }

            });
        }
    };
});

angular.module('app').directive('phoneValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                scope.phoneValidateFormate = (viewValue && /^1[3|4|5|7|8]\d{9}$/.test(viewValue)) ? 'valid' : undefined;
                
                if(scope.phoneValidateFormate) {
                    ctrl.$setValidity(attrs.ngModel, true);
                    //elm.$setValidity('pwd', true); //<-- 这样用也是没问题的
                    //这里还可以继续做其他的事情
                    return viewValue;
                } else {
                    ctrl.$setValidity(attrs.ngModel, false);                    
                    //elm.$setValidity('pwd', false); //<-- 这样用也是没问题的
                    //这里还可以继续做其他的事情
                    return undefined;
                }

            });
        }
    };
});


angular.module('app').directive('formValidate', function() {
    return {
       
        link: function(scope, elm, attrs, ctrl) {
        	
        	scope.$watch(scope.$parent.item, function() {
        		console.log("111111111111");
//                $http({
//                  method: 'POST',
//                  url: '/api/check/' + attrs.ensureUnique,
//                  data: {'field': attrs.ensureUnique}
//                }).success(function(data, status, headers, cfg) {
//                  c.$setValidity('unique', data.isUnique);
//                }).error(function(data, status, headers, cfg) {
//                  c.$setValidity('unique', false);
//                });
              });
        	
//            ctrl.$parsers.unshift(function(viewValue) {
//
//                scope.phoneValidateFormate = (viewValue && /^1[3|4|5|7|8]\d{9}$/.test(viewValue)) ? 'valid' : undefined;
//                
//                if(scope.phoneValidateFormate) {
//                    ctrl.$setValidity(attrs.ngModel, true);
//                    //elm.$setValidity('pwd', true); //<-- 这样用也是没问题的
//                    //这里还可以继续做其他的事情
//                    return viewValue;
//                } else {
//                    ctrl.$setValidity(attrs.ngModel, false);                    
//                    //elm.$setValidity('pwd', false); //<-- 这样用也是没问题的
//                    //这里还可以继续做其他的事情
//                    return undefined;
//                }
//
//            });
        }
    };
});