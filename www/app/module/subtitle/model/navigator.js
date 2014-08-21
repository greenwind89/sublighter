define([
], function() { 
    'use strict';

    var Navigator = Backbone.Model.extend({
        defaults: {
            isPlaying: false,
            searchResults: [], // array of sentences as search result 
            searchKeyword: '',
            searchDirection: 'forward'
        },

        searchResultIndex: 0,

        hasNextSearchResult: function() {
            return (!this.get('searchResults') || !this.get('searchResults')[this.searchResultIndex]) ? false : true;
        },

        getNextSearchResult: function() {
            var temp = this.searchResultIndex;
            this.searchResultIndex++;
            return this.get('searchResults')[temp];
        },

        resetSearchIndex: function() {
            this.searchResultIndex = 0;
        }
    });

    return Navigator;
});

