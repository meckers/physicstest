define([
    'lib/events',
    'model/mine',
    'ui/mine-ui',
    'ui/block-ui'
], function(Events, Mine, MineUI, BlockUI) {

    return {

        mine: null,
        blockUIs: [],

        init: function() {
            this.listen();

            if ($('#mine')) {
                this.mine = new Mine(5, 5);
                this.createUI();
            }
        },

        createUI: function() {
            this.ui = new MineUI('#mine', this.mine);
            this.ui.create();
            this.addBlockUIs();
        },

        addBlockUIs: function() {
            for (var i=0; i<this.mine.size(); i++) {
                var blockUI = new BlockUI();
                this.ui.addBlockUI(blockUI);
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