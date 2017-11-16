'use strict';

angular.module('app').factory('DialogService', ['ngDialog', function(ngDialog){

	return {
		visable : false,
		open: function(name, params){
			if(params){
				switch(name){
					case 'infoDialog':
						params.scope.title = params.title == null ? 'information':params.title;
						params.scope.message = params.message == null ? 'information':params.message;
						this._confirm('tpl/dialog_info.html', 'ngdialog-theme-plain', params.scope, params.onOk, params.onCancel); break;
					case 'confirmDialog':
						params.scope.title = params.title == null ? 'confirm':params.title;
						params.scope.message = params.message == null ? 'confirm':params.message;
						this._confirm('tpl/dialog_confirm.html', 'ngdialog-theme-plain', params.scope, params.onOk, params.onCancel); break;
					case 'webChatDialog':
						params.scope.title = params.title == null ? 'confirm':params.title;
						params.scope.message = params.message == null ? 'confirm':params.message;
						this._confirm('tpl/dialog_weChat.html', 'ngdialog-theme-plain', params.scope, params.onOk, params.onCancel); break;
						
				}
			}
		},
		_confirm: function(template, className, $scope, onOk, onCancel){
			
			var _this = this;
			
			if(!this.visable){
				ngDialog.openConfirm({
					template: template,
					className: className,
					scope: $scope,
					cache: false,
					showClose : false
				}).then(function(value){
					_this.visable=false;
					if(typeof onOk == 'function'){
						onOk(value);
					}
				}, function(value){
					_this.visable=false;
					if(typeof onCancel == 'function'){
						onCancel(value);
					}
				});
				_this.visable = true;
			}
			
		}
	};
}]);