(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('BuyOrderModalController', BuyOrderModalController);

    BuyOrderModalController.$inject = [
        '$log',
        '$mdDialog',
        '$timeout',
    ];

    /* @ngInject */
    function BuyOrderModalController ($log, $mdDialog, $timeout) {
        const $ctrl = this;
        $ctrl.cancel = () => $mdDialog.cancel();
        $ctrl.state = {};
        $ctrl.state.title = 'Place A New Buy Order';
        $ctrl.buyOrder = {};

        activate();

        // --------- //

        function activate () {
            $log.info('Running', $ctrl.state.title);
            $ctrl.state.loading = true;
            $timeout(() => { $ctrl.state.loading = false; }, 450);
        }
    }
}());
