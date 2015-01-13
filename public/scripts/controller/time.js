define(['lib/events'], function(Events) {

        return {

            heart: null,

            init: function() {
                this.startTime();
            },

            startTime: function() {
                this.heart = window.setInterval(_.bind(this.onHeartBeat), 1000);
            },

            onHeartBeat: function(e) {
                console.log("ka-dunk...");
                Events.trigger('HEARTBEAT');
            },

            listen: function() {
            }

        };

});