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
        'buyOrderService',
    ];

    /* @ngInject */
    function BuyOrderModalController ($log, $mdDialog, $timeout, data, buyOrderService) {
        const $ctrl = this;
        $ctrl.cancel = () => $mdDialog.cancel();
        $ctrl.finish = finish;
        $ctrl.state = {};

        activate();

        // --------- //

        function activate () {
            $log.info('Running', $ctrl.state.title);
            $ctrl.state.loading = true;
            if (data) {
                $ctrl.buyOrder = angular.copy(data);
                $ctrl.state.title = 'Editing Buy Order';
                $ctrl.state.buttonLabel = 'Save Changes';
            } else {
                $ctrl.buyOrder = {};
                $ctrl.state.title = 'Place A New Buy Order';
                $ctrl.state.buttonLabel = 'Place The Buy Order';
            }
            $timeout(() => { $ctrl.state.loading = false; }, 450);
        }

        function finish (buyOrderData) {
            if (data) {
                buyOrderService.updateById(data.id, buyOrderData)
                    .then(buyOrderId => $mdDialog.hide(buyOrderId));
            } else {
                buyOrderService.addNew(buyOrderData)
                    .then(newBuyOrderId => $mdDialog.hide(newBuyOrderId));
            }
        }
    }
}());
