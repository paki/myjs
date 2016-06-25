'use strict';
const app = angular.module('app');

app.controller('RemarkCtrl', ['$scope', 'socket', ($scope, socket) => {

    $scope.remarks = [];

    $scope.send = () => {
        socket.emit('chat message', $scope.newRemark);
        $scope.newRemark = '';
        return false;
    };

    socket.on('chat message', (msg) => {
        $scope.remarks.push(msg);
    });

}]);


export default app;
