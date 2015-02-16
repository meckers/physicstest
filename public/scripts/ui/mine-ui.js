define(['lib/events'], function(Events) {

    return Class.extend({

        init: function(element, mine) {
            this.mine = mine;
            this.$el = $(element);
        },

        create: function() {

        },

        addBlockUI: function(blockUI) {
            this.$el.append(blockUI.getElement());
        }

    });
});