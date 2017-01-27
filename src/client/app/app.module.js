(function () {
    'use strict';
    angular
        .module('app', [
            // vendor dependencies
            'ngMaterial',
            'ui.router',
            'firebase',

            // block dependencies
            'blocks.router',

            // project dependencies
            'app.core',
            'app.dashboard',
            'app.layout',
        ]);
}());
