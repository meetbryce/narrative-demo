(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('BuyOrderModalController', BuyOrderModalController);

    BuyOrderModalController.$inject = [
        '$log',
        '$mdDialog',
        '$timeout',
        'data',
    ];

    /* @ngInject */
    function BuyOrderModalController ($log, $mdDialog, $timeout, data) {
        const $ctrl = this;
        $ctrl.cancel = () => $mdDialog.cancel();
        $ctrl.state = {};

        activate();

        // --------- //

        function activate () {
            $log.info('Running', $ctrl.state.title);
            $ctrl.state.loading = true;
            if (data) {
                $ctrl.buyOrder = data;
                $ctrl.state.title = 'Editing Buy Order';
                $ctrl.state.buttonLabel = 'Save Changes';
            } else {
                $ctrl.buyOrder = {};
                $ctrl.state.title = 'Place A New Buy Order';
                $ctrl.state.buttonLabel = 'Place The Buy Order';
            }
            $timeout(() => { $ctrl.state.loading = false; }, 450);
        }
    }
}());
