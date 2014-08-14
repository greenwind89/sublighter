define([
    'subtitle/view/detail/sentence-item'
], function() { 
    'use strict';

    var SentenceItemView = require('subtitle/view/detail/sentence-item');

    var SentenceListView = Backbone.View.extend({

        render: function() {
            
            _.each(this.collection.models, function(sentence) {
                this.$el.append(new SentenceItemView({model: sentence}).render().el);
            }, this);

            return this;
        }
    });

    return SentenceListView;
});

