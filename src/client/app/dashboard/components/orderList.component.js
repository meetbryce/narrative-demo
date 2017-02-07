(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .component('orderList', orderList());

    function orderList () {
        return {
            bindings: {
                'orderList': '=',
            },
            controller: OrderListController,
            controllerAs: '$ctrl',
            templateUrl: 'app/dashboard/components/orderList.html',
        };
    }

    OrderListController.$inject = [
        '$log',
        '$state',
        'buyOrderService',
        'modalService',
    ];

    /* @ngInject */
    function OrderListController ($log, $state, buyOrderService, modalService) {
        const $ctrl = this;
        $ctrl.getOrderIcon = getOrderIcon;
        $ctrl.openBuyOrderModal = modalService.create('app/dashboard/components/buyOrderModal.html', 'BuyOrderModalController');
        $ctrl.remove = modalService.createConfirm('Are You Sure?', 'Once deleted, your buy order will be gone forever. Proceed with caution.', buyOrderService.removeById);
        $ctrl.loadSampleData = loadSampleData;

        activate();

        // --------- //

        function activate () {

        }

        /**
         * Used to determine the md-icon to display based on the package type
         * @param packageType {string} - Any of (Device Location, Device Behavior, ID Mapping)
         * @returns {string} - ligature string for md-icon
         */
        function getOrderIcon (packageType) {
            switch (packageType) {
                case 'Device Location':
                    return 'my_location';
                case 'Device Behavior':
                    return 'phonelink_ring';
                case 'ID Mapping':
                    return 'compare_arrows';
                default:
                    return 'edit';
            }
        }

        /**
         * Loads the sample data then reloads the state to update the view
         */
        function loadSampleData () {
            buyOrderService.loadSampleData()
                .then(() => { $state.reload(); })
        }
    }
}());
