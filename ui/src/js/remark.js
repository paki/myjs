'use strict';
const app = angular.module('app');

app.controller('RemarkCtrl', ['$scope', 'Socket', ($scope, Socket) => {
    $scope.remarks = [];

    $scope.send = () => {
        Socket.emit('chat message', $scope.newRemark);
        $scope.newRemark = '';
        return false;
    };

    Socket.on('chat message', (msg) => {
        $scope.remarks.push(msg);
    });

}]);


export default app;
