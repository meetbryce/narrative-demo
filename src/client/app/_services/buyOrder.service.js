(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('buyOrderService', buyOrderService);

    buyOrderService.$inject = ['$q'];

    function buyOrderService ($q) {
        class BuyOrder {
            constructor (id, title, packageType, maxBid) {
                this.id = id;
                this.title = title;
                this.packageType = packageType;
                this.maxBid = maxBid;
            }
        }

        let buyOrders = [
            new BuyOrder(1, 'Where do people play mobile games?', 'Device Location', 3000),
            new BuyOrder(2, 'Monthly usage patterns for iOS email apps', 'Device Behavior', 2300),
            new BuyOrder(3, 'Cross-Device tracking of our registered users', 'ID Mapping', 5800),
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
