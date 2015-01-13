define([
    'controller/sample',
    'controller/mediator'
],
    function(SampleController, Mediator) {

        return {

            init: function() {
                this.startApp();
            },

            /**
             * Initialize the controllers that listens for events
             */
            startApp: function() {
                Mediator.init();
            }

        };

    });