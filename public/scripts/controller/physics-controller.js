define([
    'lib/events',
    'physicsjs',
], function(Events, Physics) {

    return {

        width: 1000,
        height: 800,
        blocks: [],
        movedBodies: [],

        init: function() {
            this.initRenderer();
            this.initWorld();
            this.listen();
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
                        fillStyle: '#ef0210',
                        angleIndicator: '#351024'
                    }
                }
            });
        },

        initWorld: function() {
            this.viewportBounds = Physics.aabb(0, 0, this.width, this.height);
            this.world = Physics({});
            this.world.add(this.renderer);
            this.addBehaviors();          
            this.addStaticBodies();      
        },

        addBehaviors: function() {
            this.world.add(Physics.behavior('edge-collision-detection', {
                aabb: this.viewportBounds,
                restitution: 0.29,
                cof: 0.99
            }));

            // ensure objects bounce when edge collision is detected
            this.world.add(Physics.behavior('body-impulse-response') );

            // add some gravity
            this.world.add( Physics.behavior('constant-acceleration', {
                acc: { x : 0, y: 0.0006 }
            }));

            this.world.add(Physics.behavior('body-collision-detection'));
            this.world.add(Physics.behavior('sweep-prune'));
            this.world.add(Physics.behavior('interactive', { el: this.renderer.el }));            
        },

        listen: function() {

            var me = this;

            // todo: raise this from outside this controller, like in the mine controller (i.e. "blockDigged")
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

            // if a body is released over the keep bin mark it as moved
            this.world.on('interact:release', function(data) {            
                data.body.moved = true;
            });   

            // enable grabbing and moving blocks
            this.world.on('interact:grab', function(data) {
                console.log('grabbed', data);
            });

            this.startBodyCheck();

        },

        addStaticBodies: function() {
            var wall = Physics.body('rectangle', {
                x: 600, // x-coordinate
                y: 650, // y-coordinate
                height: 300,
                width: 20
            });

            wall.treatment = 'static';

            this.world.add(wall);
        },

        // iterates the blocks and decides which ones to keep
        startBodyCheck: function() {
            var me = this;
            window.setInterval(function() {
                var bodies = me.world.getBodies();
                $(bodies).each(function(i,e) {
                    if (e.bodyType === 'block' && e.moved && e.sleep() && e.state.pos.x > 600) {  
                        // todo: raise event to add a block to the inventory                     
                        me.removeBody(e, 500);
                    }
                });
            }, 2000);
        },

        removeBody: function(body, delay) {
            var me = this;
            window.setTimeout(function() {
                console.log('Removing body', body);
                me.world.removeBody(body);
            }, delay);
        },

        throwBlock: function(e) {

            var sourceY = $(e).offset().top;
            var sourceX = $(e).offset().left;
            var vx = 0.1 + Math.random()/10;
            var vy = -0.5 + Math.random()/10;

            console.log('throwing block from', sourceY, sourceX, vy, vx);

            var block = Physics.body('rectangle', {
                x: sourceX, // x-coordinate
                y: sourceY, // y-coordinate
                vx: vx, // velocity in x-direction
                vy: vy, // velocity in y-direction
                height: 40,
                width: 40
            });

            block.bodyType = 'block';

            block.view = new Image();
            block.view.src = 'images/icon2.png';

            this.world.add(block);
            this.blocks.push(block);

        },

        start: function() {
            // start the ticker
            Physics.util.ticker.start();


        }

    }
});