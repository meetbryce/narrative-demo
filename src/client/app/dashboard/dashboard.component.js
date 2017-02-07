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
        'buyOrderService',
    ];

    function DashboardController ($log, buyOrderService) {
        const $ctrl = this;

        $ctrl.state = {};
        $ctrl.state.title = 'DashboardController';

        activate();

        // --------- //

        function activate () {
            $log.info('Running', $ctrl.state.title);

            buyOrderService.getAll()
                .then((buyOrders) => { $ctrl.buyOrders = buyOrders; });
        }
    }
}());
