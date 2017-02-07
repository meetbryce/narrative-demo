(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('buyOrderService', buyOrderService);

    buyOrderService.$inject = [
        '$localStorage',
        '$log',
        '$mdToast',
        '$q',
    ];

    function buyOrderService ($localStorage, $log, $mdToast, $q) {
        class BuyOrder {
            /**
             * BuyOrder constructor
             * @param title {string} - Used to describe the Buy Order
             * @param packageType {string} - Any of (Device Location, Device Behavior, ID Mapping)
             * @param maxBid {number} - Maximum bid accepted in whole USD
             * @param [id] {number} - Unique identifier of this BuyOrder, passed if editing & generated if creating
             */
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
            loadSampleData,
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
        }

        /**
         * Add a new Buy Order
         * @param buyOrderData {object}
         * @returns {Promise.<number>} - promise that resolves with the id of new Buy Order
         */
        function addNew (buyOrderData) {
            return $q((resolve) => {
                const { title, packageType, maxBid } = buyOrderData;
                const newBuyOrder = new BuyOrder(title, packageType, maxBid);
                $localStorage.buyOrders.push(newBuyOrder);
                $mdToast.showSimple('Buy order added');
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

        /**
         * Load a series of sample data to demo the use case
         * @returns {Promise.<{string}>} - promise that resolves with 'loaded'
         */
        function loadSampleData () {
            return $q((resolve, reject) => {
                $localStorage.buyOrders = [
                    new BuyOrder('Where do people play mobile games? (sample)', 'Device Location', 3000),
                    new BuyOrder('Monthly usage patterns for iOS email apps (sample)', 'Device Behavior', 2300),
                    new BuyOrder('Cross-Device tracking of our registered users (sample)', 'ID Mapping', 5800),
                ];
                $mdToast.showSimple('Sample buy orders loaded');
                resolve('loaded');
            });
        }

        /**
         * Remove an existing Buy Order
         * @param id {number} the unique ID of the Buy Order to be removed
         * @returns {Promise.<string>} - promise that resolves with 'deleted'
         */
        function removeById (id) {
            return $q((resolve, reject) => {
                const theIndex = $localStorage.buyOrders.findIndex(buyOrder => buyOrder.id === id);
                if (theIndex === -1) reject(`Buy Order with ID ${id} not found`);
                $localStorage.buyOrders.splice(theIndex, 1);
                $mdToast.showSimple('Buy order deleted');
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
            return $q((resolve, reject) => {
                const { title, packageType, maxBid } = buyOrderData;
                const theIndex = $localStorage.buyOrders.findIndex(buyOrder => buyOrder.id === id);

                if (theIndex === -1) reject(`Buy Order with ID ${id} not found`);
                // eslint-disable-next-line no-param-reassign
                $localStorage.buyOrders[theIndex] = new BuyOrder(title, packageType, maxBid, id);
                $mdToast.showSimple('Buy order updated');
                resolve(id);
            });
        }
    }
}());
