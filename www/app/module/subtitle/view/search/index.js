define([
    'jade!subtitle/view/search/index',
    'subtitle/view/search/result-list',
    'subtitle/collection/search-result'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/view/search/index'),
        ResultsView = require('subtitle/view/search/result-list'),
        Results = require('subtitle/collection/search-result');

    var SearchView = Backbone.View.extend({
        initialize: function() {
            this.searchResults = new Results();
            this.searchResultsView = new ResultsView({
                collection: this.searchResults
            });
        },

        template: tpl,

        events: {
            'click #js-search-btn': 'handleClickOnSearchBtn'
        },

        render: function() {
            this.$el.html(this.template());

            $('#js-search-result-holder', this.$el).html(this.searchResultsView.render().el);

            this.$searchBtn = $('#js-search-btn', this.$el);
            this.$searchQuery = $('#js-search-query', this.$el);

            return this;
        },

        //handle
        handleClickOnSearchBtn: function() {
            var query = this.$searchQuery.val(),
                info = util.text.extractNameSeasonAndEpisode(query),
                that = this;

            core.api.subtitle.search({
                query: info.name,
                episode: info.episode,
                season: info.season
            }).done(function(data) {
                that.searchResults.reset(data);
            });
        },
    });

    return SearchView;
});

