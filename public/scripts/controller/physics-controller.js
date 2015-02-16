define([
    'lib/events',
    'physicsjs'
], function(Events, Physics) {

    return {

        width: 1000,
        height: 800,

        init: function() {
            this.initRenderer();
            this.initWorld();
            this.listen();
            //this.addObjects();
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
            this.world = Physics({
            });
            this.world.add(this.renderer);
            this.world.add(Physics.behavior('edge-collision-detection', {
                aabb: this.viewportBounds,
                restitution: 0.29,
                cof: 0.99
            }));

            // ensure objects bounce when edge collision is detected
            this.world.add( Physics.behavior('body-impulse-response') );

            // add some gravity
            this.world.add( Physics.behavior('constant-acceleration') );

            this.world.add(Physics.behavior('body-collision-detection'));
            this.world.add(Physics.behavior('sweep-prune'));
        },

        listen: function() {

            var me = this;
            $('.block').on('click', function(e) {
                me.throwBlock(e.target);
                //e.target.remove();
            });

            // subscribe to the ticker
            Physics.util.ticker.on(_.bind(function( time ){
                this.world.step( time );
            }, this));

            this.world.on('step', _.bind(function() {
                this.world.render();
            }, this));

        },

        throwBlock: function(e) {

            var sourceY = $(e).offset().top;
            var sourceX = $(e).offset().left;

            console.log('throwing block from', sourceY, sourceX);

            var vx = 0.1 + Math.random()/10;
            var vy = -0.5 + Math.random()/10;

            this.testRect = Physics.body('rectangle', {
                x: sourceX, // x-coordinate
                y: sourceY, // y-coordinate
                vx: vx, // velocity in x-direction
                vy: vy, // velocity in y-direction
                height: 20,
                width: 20
            });

            this.world.add(this.testRect);
        },

        addObjects: function() {
            // add a circle

            this.testRect = Physics.body('rectangle', {
                x: 100, // x-coordinate
                y: 700, // y-coordinate
                vx: 0, // velocity in x-direction
                vy: 0, // velocity in y-direction
                height: 20,
                width: 20
            });

            this.world.add(this.testRect);

            window.setTimeout(_.bind(function(){
                //this.testRect.state.vel.set(.1,-.5); // move right and upward

                var acc = new Physics.vector(0.1, 0.1);
                this.testRect.accelerate(acc);
            }, this), 1000);
        },

        start: function() {
            // start the ticker
            Physics.util.ticker.start();


        }

    }
});