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
            createConfirm,
        };
        return service;

        // --------- //

        /**
         * @param templatePath - path to the template that should be rendered
         * @param controller - (optional) name of angular controller, will use simple controller (expose `$ctrl`) if blank
         * @returns {open} - closure - opens a modal based on the arguments provided when instantiated
         * @example $ctrl.openModal = modalService.create('app/module/components/SomeModal.html','SomeModalController');
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

        function createConfirm (title, message, doWhenConfirmed) {
            const template = `<md-dialog class="md-dialog-medium" role="dialog" tabindex="-1">
                    <md-dialog-content class="md-dialog-content" ng-if="$ctrl.state.loading" tabindex="-1" aria-label="Loading modal...">
                        <div layout="row" layout-align="space-around">
                            <md-progress-circular class="md-accent md-hue-3" md-diameter="25" md-mode="indeterminate"></md-progress-circular>
                        </div>
                    </md-dialog-content>
                    <md-dialog-content class="md-dialog-content" ng-if="!$ctrl.state.loading" tabindex="-1" aria-label="${title}">
                        <h2 class="md-title ng-binding">${title}</h2>
                        <div class="md-dialog-content-body">
                            <p class="ng-binding">${message}</p>
                        </div>
                    </md-dialog-content>
                    <md-dialog-actions ng-if="!$ctrl.state.loading">
                        <button class="md-default md-cancel-button md-button" type="button" ng-click="$ctrl.cancel()">Cancel</button>
                        <button class="md-warn md-confirm-button md-button" type="button" ng-click="$ctrl.confirm()" md-autofocus>Yes, I'm sure.</button>
                    </md-dialog-actions>
                </md-dialog>`;

            return function open (e, data) {
                $mdDialog.show({
                    clickOutsideToClose: true,
                    controller: ConfirmDialogController,
                    controllerAs: '$ctrl',
                    escapeToClose: true,
                    targetEvent: e,
                    template,
                    locals: {
                        data,
                    },
                });

                ConfirmDialogController.$inject = [
                    '$log',
                    '$mdDialog',
                    '$timeout',
                    'data',
                ];

                // eslint-disable-next-line no-shadow
                function ConfirmDialogController ($log, $mdDialog, $timeout, data) {
                    const $ctrl = this;
                    $ctrl.cancel = () => $mdDialog.cancel();
                    $ctrl.confirm = confirm;
                    $ctrl.state = {};
                    $ctrl.state.loading = true;

                    activate();

                    // --------- //

                    function activate () {
                        $timeout(() => { $ctrl.state.loading = false; }, 450);
                    }

                    function confirm () {
                        doWhenConfirmed(data);
                        $mdDialog.hide('action confirmed');
                    }
                }
            };
        }
    }
}());
