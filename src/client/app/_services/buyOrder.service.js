(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('buyOrderService', buyOrderService);

    buyOrderService.$inject = [
        '$localStorage',
        '$log',
        '$q',
    ];

    function buyOrderService ($localStorage, $log, $q) {
        class BuyOrder {
            constructor (title, packageType, maxBid, id = undefined) {
                this.id = id || getNextId(); // if an id isn't provided, generate one
                this.title = title;
                this.packageType = packageType;
                this.maxBid = maxBid;
            }
        }
        activate();
        // noinspection UnnecessaryLocalVariableJS
        const service = {
            addNew,
            getAll,
            removeById,
            updateById,
        };
        return service;

        // --------- //

        function activate () {
            if (angular.isUndefined($localStorage.nextId)) {
                // eslint-disable-next-line no-param-reassign
                $localStorage.nextId = -1; // so we can use getNextId() & get 0 the first time
            }
            if (angular.isUndefined($localStorage.buyOrders)) {
                // eslint-disable-next-line no-param-reassign
                $localStorage.buyOrders = [
                    new BuyOrder('Where do people play mobile games?', 'Device Location', 3000),
                    new BuyOrder('Monthly usage patterns for iOS email apps', 'Device Behavior', 2300),
                    new BuyOrder('Cross-Device tracking of our registered users', 'ID Mapping', 5800),
                ];
            }
        }

        /**
         * Add a new Buy Order
         * @param buyOrderData {object}
         * @returns {Promise.<number>} - promise that resolves with the id of new Buy Order
         */
        // todo: add toast?
        function addNew (buyOrderData) {
            return $q((resolve) => {
                const { title, packageType, maxBid } = buyOrderData;
                const newBuyOrder = new BuyOrder(title, packageType, maxBid);
                $localStorage.buyOrders.push(newBuyOrder);
                resolve(newBuyOrder.id);
            });
        }

        /**
         * Get all active Buy Orders as a promise
         * @returns {Promise.<BuyOrder[]>} - promise that resolves with an array of Buy Orders
         */
        function getAll () {
            return $q(resolve => resolve($localStorage.buyOrders));
        }

        /**
         * Increment the pseudo static Next ID variable
         * @returns {number} - the next ID to be used
         */
        function getNextId () {
            // eslint-disable-next-line no-param-reassign
            $localStorage.nextId += 1;
            return $localStorage.nextId;
        }

        // todo: add docs
        // todo: add toast?
        function removeById (id) {
            return $q((resolve, reject) => {
                const theIndex = $localStorage.buyOrders.findIndex(buyOrder => buyOrder.id === id);
                if (theIndex === -1) reject(`Buy Order with ID ${id} not found`);
                $localStorage.buyOrders.splice(theIndex, 1);
                resolve('deleted');
            });
        }

        /**
         * Update an existing Buy Order
         * @param id {number}
         * @param buyOrderData {object}
         * @returns {Promise.<number>} - promise that resolves with the id of Buy Order
         */
        // todo: add toast?
        function updateById (id, buyOrderData) {
            return $q((resolve, reject) => {
                const { title, packageType, maxBid } = buyOrderData;
                const theIndex = $localStorage.buyOrders.findIndex(buyOrder => buyOrder.id === id);

                if (theIndex === -1) reject(`Buy Order with ID ${id} not found`);
                // eslint-disable-next-line no-param-reassign
                $localStorage.buyOrders[theIndex] = new BuyOrder(title, packageType, maxBid, id);
                resolve(id);
            });
        }
    }
}());
