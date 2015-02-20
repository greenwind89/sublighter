define([
    'word/model/word',
    'word/collection/word'
], function() { 
    'use strict';
    var Word = require('word/model/word');
    var Words = require('word/collection/word');

    var WordList = Backbone.Model.extend({
        defaults: function() {
            var words = new Words();
            return {
                'words': words,
                'title': ''
            };
        },

        initialize: function() {
        },

        parse: function(response) {

            var words = new Words();
            if(_.isArray(response.words)) { // populate from storage
                words.add(this.get('words'));
            } 

            return _.extend(response, {
                words: words,
                title: response.title,
            });
        },

        localStorage: new Backbone.LocalStorage(util.constants.WORD_LIST_TABLE_NAME),

        addDef: function(def) {
            var word = new Word({
                title: def.getWord()
            });
            word.addDef(def)
            this.get('words').create(word);
            // this.wordIds.push(word.id);
            this.save();
        }

    });

    return WordList;
});

