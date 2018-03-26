'use strict';

angular.module('app').factory('HttpService', [ '$http','$q','REST_URL','$rootScope', 'DialogService','$state','toaster',
                                               function($http,$q,REST_URL,$rootScope,DialogService,$state,toaster){
	return {
			    
	    post : function(url, data) {

            // var data = {
            //     "peers": ["peer1"],
            //     "fcn": "queryMyBill",
            //     "args": ["111"],
            //     "token":sessionStorage.getItem("token")
            // }
            if (data != null) {
            	data.peers = ["peer1"];
                data.token = sessionStorage.getItem("token");
			}
	    	var req = {
          		  method: 'POST',
          		  url: url,
          		  headers: {
          		    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                      'Content-Type': 'application/json;charset=utf-8'
          		  },
          		  data: data
          		 };
	    	
	    	var deferred = $q.defer();
	        var promise = deferred.promise;
	        
	        $http(req).then(function(response) {
//	        	if (response.data.msgCode.indexOf("OK_") > -1) { 
	        	
	        	if (response.data.success) {
			    	deferred.resolve(response);
	        	}else {
                    if (response.data.message != null && response.data.message != '') {
                        //alert(response.data.msgCode + " " +response.data.msg );
//	        				toaster.pop('error', '错误！', response.data.msgCode + ": " +response.data.msg);
                        DialogService.open('infoDialog',{
                            scope:$rootScope,
                            title:'错误！',
                            message:response.data.message ,
                            onOk : function (value) {
                                // do nothing
                            },
                            onCancel : function (value){
                                // do nothing
                            }});
                    }
                    deferred.reject(response);
	        	}
			    	
			    },function(error){
		            deferred.reject(error);
		            DialogService.open('infoDialog',{
		 	    		scope:$rootScope, 
		 	    		title:'错误！',
		 	    		message:'网络错误',
		 	    		onOk : function (value) {
		 	    			
		 				}, 
		 				onCancel : function (value){	
		 					// do nothing
		 				}});
		        });		        
	        return promise;
	    }
	};
} ]);


