app.controller('PublishBillCtrl', ['$scope', '$rootScope', '$http', '$modal', '$log', 'REST_URL', 'HttpService', 'DialogService', '$localStorage', '$state', '$stateParams',
    function ($scope, $rootScope, $http, $modal, $log, REST_URL, HttpService, DialogService, $localStorage, $state, $stateParams) {

        $scope.item = {};
        $scope.item.BillInfoID = 'POC10000998';
        $scope.item.BillInfoAmt = '10001';
        $scope.item.BillInfoType = 'AC01';
        $scope.item.BillInfoIsseDate = '20161001';
        $scope.item.BillInfoDueDate = '20161012';
        $scope.item.DrwrCmID = 'ChupiaoId';
        $scope.item.DrwrAcct = 'C11111111';
        $scope.item.AccptrCmID = 'ChengduiId';
        $scope.item.AccptrAcct = 'C11111111';
        $scope.item.PyeeCmID = 'ShoukuanId';
        $scope.item.PyeeAcct = 'S11111111';
        $scope.item.HodrCmID = $localStorage.loginuser.cmId;
        $scope.item.HodrAcct = $localStorage.loginuser.Acct;

        $scope.save = function () {

            HttpService.post(REST_URL.invoke, {fcn: "issue", args:[JSON.stringify($scope.item)]}).then(function (response) {
                //alert("updateuser success");
                DialogService.open('infoDialog', {
                    scope: $scope,
                    title: '提交成功',
                    message: response.data.message,
                    onOk: function (value) {
                        $state.go('app.table.myBill');
                    },
                    onCancel: function (value) {
                        // do nothing
                    }
                });


            }, function (err) {
                DialogService.open('infoDialog', {
                    scope: $scope,
                    title: '提示',
                    message: '发生错误',
                    onOk: function (value) {

                    },
                    onCancel: function (value) {
                        // do nothing
                    }
                });
            });
        };

        $scope.cancel = function () {
            console.log($state);
            $state.go('app.table.myBill');
        };


    }]);