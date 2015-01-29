define([
    'jade!core/template-engine/default/nav-item'
], function() { 
    'use strict';

    var tpl = require('jade!core/template-engine/default/nav-item')

    var NavItem = Backbone.View.extend({
        template: tpl,
        className: 'text-center col-xs-4 nav-tab-item',
        events: {
            'click': 'goToThisView',
        },

        initialize: function() {
            this.model.on('change:isCurrent', function() {
                this.render();
            }, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            if(this.model.get('isCurrent')) {
                this.$el.addClass('current');
            } else {
                this.$el.removeClass('current');
            }
            return this;
        },

        goToThisView: function() {
            window.location = '#' + this.model.get('url');
        }

    });

    return NavItem;
});

