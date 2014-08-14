define([
    'jade!subtitle/template/search/index',
    'subtitle/view/search/result-list',
    'subtitle/model/search'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/search/index'),
        ResultsView = require('subtitle/view/search/result-list'),
        Search = require('subtitle/model/search');

    var SearchView = Backbone.View.extend({
        initialize: function() {
            this.search = new Search();

            this.searchResultsView = new ResultsView({
                model: this.search
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
                that.search.set('searchResults', data);
            });
        },
    });

    return SearchView;
});

