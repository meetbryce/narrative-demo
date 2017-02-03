(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('buyOrderService', buyOrderService);

    buyOrderService.$inject = ['$q'];

    function buyOrderService ($q) {
        let buyOrders = [
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
        // noinspection UnnecessaryLocalVariableJS
        const service = {
            getAll,
        };
        return service;

        // --------- //

        /**
         * Get all active Buy Orders as a promise
         * @returns {Promise.<BuyOrder[]>} - promise that resolves with an array of Buy Orders
         */
        function getAll () {
            return $q(resolve => resolve(buyOrders));
        }
    }
}());
