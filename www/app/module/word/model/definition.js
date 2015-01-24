define([
], function() { 
    'use strict';

    var Definition = Backbone.Model.extend({
        defaults: {
            word: '',
            content: ''
        }
    });

    return Definition;
});

