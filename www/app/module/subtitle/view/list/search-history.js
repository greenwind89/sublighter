define([
    'jade!subtitle/template/list/search-history',
    'subtitle/view/list/item'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/list/search-history');
    var ItemView = require('subtitle/view/list/item');

    var SearchHistory = Backbone.View.extend({
        template: tpl,
        className: 'list-group',
        render: function() {
            this.$el.html(this.template());

            _.each(core.global.cachedSubtitles.models, function(sub) {
                this.$el.append(new ItemView({
                    model: sub
                }).render().el); 
            }, this);

            return this;
        }
    });

    return SearchHistory;
});

