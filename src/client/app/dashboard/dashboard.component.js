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
    ];

    function DashboardController ($log) {
        const $ctrl = this;
        $ctrl.getOrderIcon = getOrderIcon;
        $ctrl.state = {};
        $ctrl.state.title = 'DashboardController';
        $ctrl.state.mockData = [
            {
                id: 1,
                title: 'Where do people play mobile games?',
                packageType: 'Device Location',
                maxBid: 3000,
            },
            {
                id: 2,
                title: 'Monthly usage patterns for iOS email apps',
                packageType: 'Device Behavior',
                maxBid: 2300,
            },
            {
                id: 3,
                title: 'Cross-Device tracking of our registered users',
                packageType: 'ID Mapping',
                maxBid: 5800,
            },
        ];


        activate();

        // --------- //

        function activate () {
            $log.info('Running', $ctrl.state.title);
        }

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
    }
}());
