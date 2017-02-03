(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('modalService', modalService);

    modalService.$inject = [
        '$log',
        '$mdDialog',
    ];

    function modalService ($log, $mdDialog) {
        // noinspection UnnecessaryLocalVariableJS
        const service = {
            create,
        };
        return service;

        // --------- //

        /**
         * @param templatePath - path to the template that should be rendered
         * @param controller - (optional) name of angular controller, will use simple controller (expose `$ctrl`) if blank
         * @returns {open} - closure - opens a modal based on the arguments provided when instantiated
         * @example vm.openModal = modalService.create('app/module/components/SomeModal.html','SomeModalController');
         */
        function create (templatePath, controller) {
            return function open (e, data) {
                $mdDialog.show({
                    clickOutsideToClose: true,
                    controller: controller || fallbackController,
                    controllerAs: '$ctrl',
                    escapeToClose: false,
                    targetEvent: e,
                    templateUrl: templatePath,
                    locals: {
                        data,
                    },
                });

                fallbackController.$inject = [
                    '$log',
                    '$mdDialog',
                    '$timeout',
                    'data',
                ];

                // eslint-disable-next-line no-shadow
                function fallbackController ($log, $mdDialog, $timeout, data) {
                    const $ctrl = this;
                    $ctrl.cancel = () => $mdDialog.cancel();
                    $ctrl.data = data;
                    $ctrl.state = {};
                    $ctrl.state.loading = true;

                    activate();

                    // --------- //

                    function activate () {
                        $timeout(() => { $ctrl.state.loading = false; }, 450);
                    }
                }
            };
        }
    }
}());
