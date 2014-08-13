define([
    'subtitle/model/search-result'
], function() { 
    'use strict';

    var SearchResultModel = require('subtitle/model/search-result');

    var SearchResult = Backbone.Collection.extend({
        model: SearchResultModel
    });

    return SearchResult;
});

