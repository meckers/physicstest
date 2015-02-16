define([
    'controller/sample',
    'controller/mediator',
    'controller/mine-controller'
],
    function(SampleController, Mediator, MineController) {

        return {

            init: function() {
                this.startApp();
            },

            /**
             * Initialize the controllers that listens for events
             */
            startApp: function() {
                Mediator.init();
                MineController.init();
            }

        };

    });