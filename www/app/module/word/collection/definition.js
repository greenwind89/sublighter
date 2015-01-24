define([
    'word/model/definition'
], function() { 
    'use strict';

    var DefinitionCollection = Backbone.Collection.extend({
        model: require('word/model/definition')
    });

    return DefinitionCollection;
});

