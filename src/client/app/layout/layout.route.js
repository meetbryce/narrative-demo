(function () {
    'use strict';

    angular
        .module('app.layout')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'default',
                config: {
                    abstract: true,
                    views: {
                        header: 'ndHeader',
                        footer: 'ndFooter',
                    },
                }
            }
        ];
    }
}());
