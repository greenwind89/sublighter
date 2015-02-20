define([
    'subtitle/model/word-in-analyzer',
    'word/model/definition'
], function() { 
    'use strict';
    var Definition = require('word/model/definition');

    var Words = Backbone.QueryCollection.extend({
        model: require('subtitle/model/word-in-analyzer'), 
        current: null,
        addByWordString: function(str) {
            var word  = this.findWordByTitle(str);
            if(!word) {
                word = this.add({
                    title: str
                });
                core.api.dictionary.retrieveDefinition(str).done(function(defs) {
                    var defModels = [];
                    _.each(defs, function(def) {
                            defModels.push(new Definition({
                                word: str,
                                content: def.definition
                            }));
                    });

                    word.set('definitions', defModels);
                });

                // core.api.dictionary.retrieveDefinition(str).done(function(defs) {
                //     that.$definitionHolder.html('');
                //     _.each(defs, function(def) {
                //         that.$definitionHolder.append(new DefinitionItemView({
                //             model: new Definition({
                //                 word: str,
                //                 content: def.definition
                //             })
                //         }).render().el);
                //     });
                // });
            }

            return word;
        },

        findWordByTitle: function(title) {
            var result = this.query({
                'title': title
            }, {
                limit: 1
            });

            return result.length > 0 ? result[0] : false;

        },

        setCurrent: function(model) {
            this.current = model;
            this.trigger('change-current', model);
        }

    });

    return Words;
});

