define([
    'subtitle/view/search/result-item'
], function() { 
    'use strict';

    var ItemView = require('subtitle/view/search/result-item');

    var ResultList = Backbone.View.extend({

        className: 'search-result-list',

        tagName: 'div',

        initialize: function() {
            this.model.on('change:searchResults', this.render, this);
        },

        render: function() {
            this.$el.html('');

            _.each(this.model.get('searchResults').models, function(result) {
                this.$el.append(new ItemView({model: result}).render().el);
            }, this);

            return this;
        }
    });

    return ResultList;
});

