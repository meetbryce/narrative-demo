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
            $log.info('Running', $ctrl.state.title);
            $timeout(() => { $ctrl.state.loading = false; }, 450);
        }

        /**
         * Updates or adds a new Buy Order based on intention
         * (set by whether data was passed when opening)
         * and closes the modal when completed
         * @param buyOrderData {object} - the data to be used to create the BuyOrder to be updated/added
         * @param buyOrderData.title {string} - Used to describe the Buy Order
         * @param buyOrderData.packageType {string} - Any of (Device Location, Device Behavior, ID Mapping)
         * @param buyOrderData.maxBid {number} - Maximum bid accepted in whole USD
         */
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
