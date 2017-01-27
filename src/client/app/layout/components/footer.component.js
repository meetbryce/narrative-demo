(function () {
    'use strict';

    angular
        .module('app.layout')
        .component('ndFooter', ndFooter());

    function ndFooter () {
        return {
            templateUrl: 'app/layout/components/footer.html',
        };
    }
}());
