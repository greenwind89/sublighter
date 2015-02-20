define([
    'subtitle/collection/sentence',
    'word/model/word-list'
], function() { 
    'use strict';
    var Sentences = require('subtitle/collection/sentence');
    var WordList = require('word/model/word-list');

    var Subtitle = Backbone.Model.extend({
        defaults: {
            sentences: null, // sentences collection 
            wordList: null, // a word list object
            wordListId: null,
        },

        localStorage: new Backbone.LocalStorage(util.constants.SUBTITLE_TABLE_NAME),

        gotoDetail: function() {
            window.location = '#subtitle/detail/' + this.get('providerMovieId');
        },

        getSentences: function() {
            var sentences;
            if(!this.get('sentences')) {
                this.set('sentences', new Sentences(util.text.parseSubtitleToSentences(this.get('content')), {
                    silent: false
                }));
            }

            return this.get('sentences');
        },

        getWordList: function() {
            return this.get('wordList');
        },

        getTitle: function() {
            return this.get('title');
        },
        
        createWordList: function() {
            var that = this;

            core.db.get(util.constants.WORD_LIST_TABLE_NAME).done(function(lists) {
                var list = lists.findWhere({
                    title: that.getTitle()
                });

                console.log(list);
                console.log(lists);

                if(!list) {
                    list =  new WordList({
                        title: that.getTitle()
                    });
                    list.save();
                    that.set('wordList', list);
                }else {
                    that.set('wordList', list);
                }
            })

            // this.save({
            //     wordListId: list.id,
            //     wordList: list
            // }, {patch: true});

            // return list;
        },

        addDefToWordList: function(def) {
            this.getWordList().addDef(def);
        }
    });

    return Subtitle;
});

