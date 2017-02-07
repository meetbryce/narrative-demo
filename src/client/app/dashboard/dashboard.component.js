(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .component('dashboard', dashboard());

    function dashboard () {
        return {
            bindings: {},
            controller: DashboardController,
            controllerAs: '$ctrl',
            templateUrl: 'app/dashboard/dashboard.html',
        };
    }

    DashboardController.$inject = [
        '$log',
        '$state',
        'buyOrderService',
        'modalService',
    ];

    function DashboardController ($log, $state, buyOrderService, modalService) {
        const $ctrl = this;
        $ctrl.getOrderIcon = getOrderIcon;
        $ctrl.openBuyOrderModal = modalService.create('app/dashboard/components/buyOrderModal.html', 'BuyOrderModalController');
        $ctrl.remove = modalService.createConfirm('Are You Sure?', 'Once deleted, your buy order will be gone forever. Proceed with caution.', buyOrderService.removeById);
        $ctrl.loadSampleData = loadSampleData;
        $ctrl.state = {};
        $ctrl.state.title = 'DashboardController';

        activate();

        // --------- //

        function activate () {
            $log.info('Running', $ctrl.state.title);

            buyOrderService.getAll()
                .then((buyOrders) => { $ctrl.buyOrders = buyOrders; });
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
