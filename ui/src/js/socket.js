'use strict';
const io = require('socket.io-client');
const app = angular.module('app');

app.factory('socket', ($rootScope) => {

    let socket = io.connect();
    return {
        conn: socket,
        on: (eventName, callback) => {
            socket.on(eventName, (msg) => {
                $rootScope.$apply(() => callback.apply(socket, [msg]));
            });
        },
        emit: (eventName, data, callback) => {
            socket.emit(eventName, data, () => {
                $rootScope.$apply((args) => {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});

export default app;
