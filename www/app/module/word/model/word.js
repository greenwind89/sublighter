define([
    'word/collection/definition'
], function() { 
    'use strict';
    var Defs = require('word/collection/definition');

    var Word = Backbone.Model.extend({
        defaults: {
            title: ''
        },

        localStorage: new Backbone.LocalStorage(util.constants.WORD_TABLE_NAME),

        initialize: function() {
            this.defs = new Defs;
        },

        addDef: function(def) {
            this.defs.add(def);
        }
    });

    return Word;
});

