define([
    'core/api/subtitle/model/search-result'
], function() { 
    'use strict';

    var SearchResultModel = require('core/api/subtitle/model/search-result');

    var SearchResult = Backbone.Collection.extend({
        model: SearchResultModel
    });

    return SearchResult;
});

