define(['lib/events'], function(Events) {

        return function() {

            init = function() {
                this.listen();
            };

            listen = function() {
                Events.register('HEARTBEAT', _.bind(this.onHeartBeat, this))
            };

            onHeartBeat = function(e) {
                console.log("--- heart indicator received heartbeat.");
            }

        };
});