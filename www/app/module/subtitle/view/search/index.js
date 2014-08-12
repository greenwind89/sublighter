define([
    'jade!subtitle/view/search/index'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/view/search/index');

    var SearchView = Backbone.View.extend({
        template: tpl,

        events: {
            'click #js-search-btn': 'handleClickOnSearchBtn'
        },

        render: function() {
            this.$el.html(this.template());

            this.$searchBtn = $('#js-search-btn', this.$el);
            this.$searchQuery = $('#js-search-query', this.$el);

            return this;
        },

        //handle
        handleClickOnSearchBtn: function() {
            var query = this.$searchQuery.val();
        },
    });

    return SearchView;
});

