define(['lib/events'], function(Events) {

    return Class.extend({

        blockWidth: 5,
        blockHeight: 8,
        clickHandler: null,

        init: function() {
            this.$el = this.create();
            this.listen();
        },

        listen: function() {
            this.clickHandler = this.$el.bind('click', _.bind(this.onClick, this));
        },

        create: function() {
            return $('<div></div>').addClass('block');
        },

        getElement: function() {
            return this.$el;
        },

        onClick: function() {
            //this.$el.css('background-color', 'white');
            this.$el.css('opacity', '0');
            this.$el.unbind('click');
        }

    });
});