define([
    'subtitle/view/search/result-item'
], function() { 
    'use strict';

    var ItemView = require('subtitle/view/search/result-item');

    var ResultList = Backbone.View.extend({

        className: 'list-group',

        tagName: 'div',

        initialize: function() {
            this.collection.on('reset', this.render, this);
        },

        render: function() {
            this.$el.html('');

            _.each(this.collection.models, function(result) {
                this.$el.append(new ItemView({model: result}).render().el);
            }, this);

            return this;
        }
    });

    return ResultList;
});

