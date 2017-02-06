(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('buyOrderService', buyOrderService);

    buyOrderService.$inject = ['$q'];

    function buyOrderService ($q) {
        class BuyOrder {
            constructor (title, packageType, maxBid, id = undefined) {
                this.id = id || getNextId();
                this.title = title;
                this.packageType = packageType;
                this.maxBid = maxBid;
            }
        }
        let nextId = -1; // so we can use getNextId() and get 0 the first time
        const buyOrders = [
            new BuyOrder('Where do people play mobile games?', 'Device Location', 3000),
            new BuyOrder('Monthly usage patterns for iOS email apps', 'Device Behavior', 2300),
            new BuyOrder('Cross-Device tracking of our registered users', 'ID Mapping', 5800),
        ];
        // noinspection UnnecessaryLocalVariableJS
        const service = {
            addNew,
            getAll,
            removeById,
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
                const newBuyOrder = new BuyOrder(title, packageType, maxBid);
                buyOrders.push(newBuyOrder);
                resolve(newBuyOrder.id);
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
         * Increment the pseudo static Next ID variable
         * @returns {number} - the next ID to be used
         */
        function getNextId () {
            nextId += 1;
            return nextId;
        }

        function removeById (id) {
            return $q((resolve, reject) => {
                const theIndex = buyOrders.findIndex(buyOrder => buyOrder.id === id);
                if (theIndex === -1) reject(`Buy Order with ID ${id} not found`);
                buyOrders.splice(theIndex, 1);
                resolve('deleted');
            });
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
                buyOrders[id] = new BuyOrder(title, packageType, maxBid, id);
                resolve(id);
            });
        }
    }
}());
