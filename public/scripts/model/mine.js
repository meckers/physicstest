define([
        'lib/events',
        'model/block'
    ],
    function(Events, Block) {

        return Class.extend({

            blocks: [],

            init: function(blockWidth, blockHeight) {
                this.blockWidth = blockWidth;
                this.blockHeight = blockHeight;
                this.populate();
            },

            size: function() {
                return this.blockWidth * this.blockHeight;
            },

            populate: function() {
                var length = this.blockWidth * this.blockHeight;
                for (var i=0; i<length; i++) {
                    var block = new Block();
                    this.blocks.push(block);
                    console.log('added block', block);
                }
            }

        });

    }
);