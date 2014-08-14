define([
], function() { 
    'use strict';

    var Search = Backbone.Model.extend({
        defaults: {
            searchResults: [] // Search Result Models from APIs
        }
    });

    return Search;
});

