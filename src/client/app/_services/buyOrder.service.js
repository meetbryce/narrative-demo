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
        const buyOrders = [
            new BuyOrder(0, 'Where do people play mobile games?', 'Device Location', 3000),
            new BuyOrder(1, 'Monthly usage patterns for iOS email apps', 'Device Behavior', 2300),
            new BuyOrder(2, 'Cross-Device tracking of our registered users', 'ID Mapping', 5800),
        ];
        // noinspection UnnecessaryLocalVariableJS
        const service = {
            addNew,
            getAll,
            updateById,
        };
        return service;

        // --------- //

        /**
         * Add a new Buy Order
         * @param buyOrderData {object}
         * @returns {Promise.<number>} - promise that resolves with the id of new Buy Order
         */
        function addNew (buyOrderData) {
            return $q((resolve) => {
                const { title, packageType, maxBid } = buyOrderData;
                const newId = buyOrders.length;
                const newBuyOrder = new BuyOrder(newId, title, packageType, maxBid);
                buyOrders.push(newBuyOrder);
                resolve(newId);
            });
        }

        /**
         * Get all active Buy Orders as a promise
         * @returns {Promise.<BuyOrder[]>} - promise that resolves with an array of Buy Orders
         */
        function getAll () {
            return $q(resolve => resolve(buyOrders));
        }

        /**
         * Update an existing Buy Order
         * @param id {number}
         * @param buyOrderData {object}
         * @returns {Promise.<number>} - promise that resolves with the id of Buy Order
         */
        function updateById (id, buyOrderData) {
            return $q((resolve) => {
                const { title, packageType, maxBid } = buyOrderData;
                buyOrders[id] = new BuyOrder(id, title, packageType, maxBid);
                resolve(id);
            });
        }
    }
}());
