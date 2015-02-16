define(['lib/events'], function(Events) {

    return Class.extend({

        blockWidth: 5,
        blockHeight: 8,

        init: function() {
            this.$el = this.create();
        },

        create: function() {
            return $('<div></div>').addClass('block');
        },

        getElement: function() {
            return this.$el;
        }

    });
});