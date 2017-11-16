app.controller('MyBillCtrl', ['$scope','$localStorage','$state','HttpService','REST_URL','$modal','DialogService','$q', function($scope, $localStorage, $state,HttpService,REST_URL,$modal,DialogService,$q) {

    $scope.rowCollectionPage = [];


    //  pagination
    $scope.itemsByPage=1;

    function render() {

        if($localStorage.loginuser) {

        }else {
            $state.go('access.signin');
        }

        HttpService.post(REST_URL.query, {fcn: "queryMyBill", args:[$localStorage.loginuser.cmId]}).then(function (response) {
            $scope.rowCollectionPage = JSON.parse(response.data.message);
            $scope.loginuser = $localStorage.loginuser;

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    }


    render();

    $scope.view = function (bill) {

        HttpService.post(REST_URL.query, {fcn: "queryByBillNo", args:[bill.BillInfoID]}).then(function (response) {
            var bill = JSON.parse(response.data.message);
            $scope.item = bill;

            $scope.item.historyList = bill.History;

            if (!$scope.$$phase) {
                $scope.$apply();
            }

            open (bill);
        });

    }

    function open (bill) {
        var modalInstance = $modal.open({
            templateUrl: 'myBillInfo.html',
            controller: 'MyBillModalInstanceCtrl',
            size: 'lg',
            resolve: {
                item: function () {
                    return $scope.item;
                }
            }
        });

        modalInstance.result.then(function (selected) {

            // endr request

            HttpService.post(REST_URL.invoke, {fcn:"endorse",
                args:[bill.BillInfoID, selected.item.EndrCmID,selected.item.EndrAcct]}).then(function (response) {
                DialogService.open('infoDialog', {
                    scope: $scope,
                    title: '背书成功',
                    message: response.data.message,
                    onOk: function (value) {

                    },
                    onCancel: function (value) {
                        // do nothing
                    }
                });

            });

        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };



}]);

app.controller('MyBillModalInstanceCtrl', ['$scope', '$modalInstance', 'item', function ($scope, $modalInstance, item) {
    $scope.item = item;

    // for test hardcode add endr info
    $scope.item.EndrCmID = 'BCMID';
    $scope.item.EndrAcct = 'B公司';
    $scope.historyList = item.historyList;
    $scope.itemsByPage = 10;

    $scope.selected = {
        item: $scope.item
    };

    $scope.ok = function () {
        if ( $scope.item.EndrCmID == undefined || $scope.item.EndrAcct == undefined ||
            $scope.item.EndrCmID == '' || $scope.item.EndrAcct == '') {
            alert("请填写全部被背书人信息！");
            return;

        }

        $modalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);