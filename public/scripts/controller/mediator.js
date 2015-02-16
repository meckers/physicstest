define([
    'lib/events',
    'controller/time'
], function(Events, Time) {

        return {

            init: function() {
                this.listen();
                Time.init();
            },

            listen: function() {
                Events.register('SAMPLE_EVENT', this, _.bind(this.handleSampleEvent, this));
            },

            handleSampleEvent: function(info) {
                console.log('handling something', info);
            }

        };

});