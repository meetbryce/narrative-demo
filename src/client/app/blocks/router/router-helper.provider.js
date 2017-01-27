/* Help configure the state-base ui.router */
(function () {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = [
        '$locationProvider',
        '$stateProvider',
        '$urlRouterProvider',
    ];

    function routerHelperProvider ($locationProvider, $stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        const config = {
            docTitle: undefined,
            resolveAlways: {}
        };

        if (!(window.history && window.history.pushState)) {
            window.location.hash = '/';
        }

        $locationProvider.html5Mode(false);

        this.configure = function (cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;
        RouterHelper.$inject = [
            '$location',
            '$rootScope',
            '$state',
            '$log',
            '$transitions',
        ];

        /* @ngInject */
        function RouterHelper ($location, $rootScope, $state, $log, $transitions) {
            let handlingStateChangeError = false;
            let hasOtherwise = false;
            let stateCounts = {
                errors: 0,
                changes: 0
            };

            const service = {
                configureStates,
                getStates,
                stateCounts,
            };

            init();

            return service;

            // --------- //

            function configureStates (states, otherwisePath) {
                states.forEach(function (state) {
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function handleRoutingErrors () {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $transitions.onError({}, onTransitionError);

                function onTransitionError ($transition$) {
                    const toState = $transition$.$to();
                    const error = $transition$.error();

                    if (handlingStateChangeError) {
                        return;
                    }
                    stateCounts.errors++;
                    handlingStateChangeError = true;
                    if (error === 'AUTH_REQUIRED') {
                        $log.error('You must be signed in to view that page.');
                        $state.go('login');
                    } else {
                        const destination = (toState &&
                            (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                            'unknown target';
                        const msg = `Error routing to ${destination}. ` +
                            (error.data || '') + (error.statusText || '') +
                            ': ' + (error.status || '');
                        $log.error(msg, [toState]);
                        $location.path('/');
                    }
                }
            }

            function init () {
                handleRoutingErrors();
                updateDocTitle();
            }

            function getStates () { return $state.get(); }

            function updateDocTitle () {
                $transitions.onSuccess({}, onTransitionSuccess);

                function onTransitionSuccess ($transition$) {
                    stateCounts.changes++;
                    handlingStateChangeError = false;
                    const stateTitle = $transition$.$to().title;
                    $rootScope.title = (stateTitle) ? `${stateTitle} | ${config.docTitle}` : 'stateTitle'; // data bind to <title>
                }
            }
        }
    }
}());
