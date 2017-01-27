(function () {
    'use strict';

    const config = {
        appErrorPrefix: '[Narrative Demo Error] ',
        appTitle: 'Narrative Demo'
    };

    angular.module('app.core')
        .value('config', config);

    angular.module('app.core')
        .config(configure);

    configure.$inject = [
        '$logProvider',
        '$mdThemingProvider',
        'routerHelperProvider',
    ];

    /* @ngInject */
    function configure ($logProvider, $mdThemingProvider, routerHelperProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        routerHelperProvider.configure({ docTitle: config.appTitle + ' | ' });

        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('teal')
            .warnPalette('deep-orange')
    }

}());
