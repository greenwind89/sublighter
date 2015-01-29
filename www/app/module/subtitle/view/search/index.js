define([
    'jade!subtitle/template/search/index',
    'subtitle/view/search/result-list',
    'subtitle/model/search',
    'subtitle/view/search/movie-titles'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/search/index'),
        ResultsView = require('subtitle/view/search/result-list'),
        Search = require('subtitle/model/search'),
        titles = require('subtitle/view/search/movie-titles');

    var SearchView = Backbone.View.extend({
        initialize: function() {
            this.search = new Search();

            this.searchResultsView = new ResultsView({
                model: this.search
            });
        },

        className: 'search',

        template: tpl,

        events: {
            'click #js-search-btn': 'handleClickOnSearchBtn',
            'keyup #js-search-query': 'checkKey',
            'focus #js-search-query': 'handleFocusOnQuery',
            'click #js-clear-input-btn': 'clearInput'
        },

        render: function() {
            this.$el.html(this.template());

            $('#js-search-result-holder', this.$el).html(this.searchResultsView.render().el);

            this.$searchBtn = $('#js-search-btn', this.$el);
            this.$searchQuery = $('#js-search-query', this.$el);
            this.$searchInputWrapper = $('#js-search-input-wrapper', this.$el);

            this.$logo = $('#js-logo', this.$el);

            
            this.initCustomEvents();
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

        checkKey: function(e) {
            if(e.keyCode == 13) {
                this.handleClickOnSearchBtn();
            }
        },

        handleFocusOnQuery: function() {
            this.transitFromStage1ToStage2();
        },

        transitFromStage1ToStage2: function() {
            this.$logo.hide();
            this.$searchInputWrapper.addClass('stage-2');
        },
        
        clearInput: function() {
            this.$searchQuery.val('');
            this.transitFromStage2ToStage1();
        },

        transitFromStage2ToStage1: function() {
            this.$logo.show();
            this.$searchInputWrapper.removeClass('stage-2');
            this.searchResultsView.$el.html('');
        },

        initCustomEvents: function() {
            var substringMatcher = function(strs) {
                return function findMatches(q, cb) {
                    var matches, substrRegex;

                    // an array that will be populated with substring matches
                    matches = [];

                    // regex used to determine if a string contains the substring `q`
                    substrRegex = new RegExp(q, 'i');

                    // iterate through the pool of strings and for any string that
                    // contains the substring `q`, add it to the `matches` array
                    $.each(strs, function(i, str) {
                      if (substrRegex.test(str)) {
                        // the typeahead jQuery plugin expects suggestions to a
                        // JavaScript object, refer to typeahead docs for more info
                        matches.push({ value: str });
                      }
                    });

                    cb(matches);
                };
            };

            var movies = titles;

            $('#js-search-query', this.$el).typeahead({
                hint: true,
                highlight: true,
                minLength: 3
            },
            {
                name: 'movies',
                displayKey: 'value',
                source: substringMatcher(movies)
            });

        }

    });

    return SearchView;
});

