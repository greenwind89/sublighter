define([
], function() { 
    'use strict';

    var SearchSentenceResult = Backbone.Model.extend({
        defaults: {
            sentences: [], // array of sentences as search result 
            keyword: ''
        },

        index: 0,

        hasNext: function() {
            return (!this.get('sentences') || !this.get('sentences')[this.index]) ? false : true;
        },

        getNext: function() {
            var temp = this.index;
            this.index++;
            return this.get('sentences')[temp];
        }
    });

    return SearchSentenceResult;
});

