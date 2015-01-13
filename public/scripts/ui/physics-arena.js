define([
    'lib/events',
    'physicsjs'
], function(Events, Physics) {

        return Class.extend({

            width: 1000,
            height: 800,

            init: function() {
                this.initRenderer();
                this.initWorld();
                this.listen();
                this.addObjects();
                this.start();
            },

            initRenderer: function() {
                this.renderer = Physics.renderer('canvas', {
                    el: 'physics-arena',
                    width: this.width,
                    height: this.height,
                    meta: false, // don't display meta data
                    styles: {
                        // set colors for the circle bodies
                        'circle': {
                            strokeStyle: '#351024',
                            lineWidth: 1,
                            fillStyle: '#d33682',
                            angleIndicator: '#351024'
                        }
                    }
                });
            },

            initWorld: function() {
                this.viewportBounds = Physics.aabb(0, 0, this.width, this.height);
                this.world = Physics({ /* options... */ });
                this.world.add(this.renderer);
                this.world.add(Physics.behavior('edge-collision-detection', {
                    aabb: this.viewportBounds,
                    restitution: 0.99,
                    cof: 0.99
                }));

                // ensure objects bounce when edge collision is detected
                this.world.add( Physics.behavior('body-impulse-response') );

                // add some gravity
                this.world.add( Physics.behavior('constant-acceleration') );
            },

            listen: function() {
                // subscribe to the ticker
                Physics.util.ticker.on(_.bind(function( time ){
                    this.world.step( time );
                }, this));

                this.world.on('step', _.bind(function() {
                    this.world.render();
                }, this));

            },

            addObjects: function() {
                // add a circle
                this.world.add(
                    Physics.body('circle', {
                        x: 50, // x-coordinate
                        y: 30, // y-coordinate
                        vx: 0.2, // velocity in x-direction
                        vy: 0.01, // velocity in y-direction
                        radius: 20
                    })
                );
            },

            start: function() {
                // start the ticker
                Physics.util.ticker.start();
            }

        });
});