(function () {
    'use strict';

    angular
        .module('app.layout')
        .component('ndHeader', ndHeader());

    function ndHeader () {
        return {
            templateUrl: 'app/layout/components/header.html',
            bindings: {
                userData: '=',
            },
        };
    }
}());
