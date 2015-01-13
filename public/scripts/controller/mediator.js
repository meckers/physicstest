define([
    'lib/events',
    'controller/time',
    'ui/physics-arena'
], function(Events, Time, PhysicsArena) {

        return {

            init: function() {
                this.listen();
                Time.init();

                if ($('.physics-arena')) {
                    this.physicsArena = new PhysicsArena();
                }
            },

            listen: function() {
                Events.register('SAMPLE_EVENT', this, _.bind(this.handleSampleEvent, this));
            },

            handleSampleEvent: function(info) {
                console.log('handling something', info);
            }

        };

});