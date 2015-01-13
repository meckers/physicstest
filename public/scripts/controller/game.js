define(['lib/events'], function(Events) {

        return {

            init: function() {
                this.renderElements();
                this.listen();
            },

            listen: function() {
            },

            renderElements: function() {

            },

            handleSampleEvent: function(info) {
                console.log('handling something', info);
            }

        };

});