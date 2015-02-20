define([
], function() { 
    'use strict';

    var Word = Backbone.Model.extend({
        defaults: {
            title: '',
            definitions: []
        }
    });

    return Word;
});

