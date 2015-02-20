define([
    'jade!subtitle/template/detail/analyzer',

    'word/model/definition',

    'subtitle/view/detail/analyzer/word-list',
    'subtitle/view/detail/analyzer/def-list',

    'subtitle/collection/word-in-analyzer',

    'subtitle/model/def-list'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/detail/analyzer');
    var Definition = require('word/model/definition');
    var WordListView = require('subtitle/view/detail/analyzer/word-list');
    var DefListView = require('subtitle/view/detail/analyzer/def-list');
    var WordCol = require('subtitle/collection/word-in-analyzer');
    var DefList = require('subtitle/model/def-list');

    var AnalyzerView = Backbone.View.extend({
        template: tpl,

        initialize: function() { // this.model: subtitle/model/subtitle
            util.observer.on('view-definition', this.showDefinition, this);
            this.wordCol = new WordCol();
            this.defList = new DefList();
            this.isCollapsed = false;
            this.wordCol.on('change-current', function(newCurrentWord) {
                this.showWord(newCurrentWord);
            }, this);

            this.defList.on('save-def', function(def) { //def: word/model/definition
                if(!this.model.getWordList()) {
                    this.model.createWordList();
                }

                this.model.addDefToWordList(def);
            }, this);
        },

        events: {
            'click #js-analyzer-expand-collapse-btn': 'handleClickOnCollapseExpandBtn',
        },


        // className: 'panel panel-default',

        render: function() {
            this.$el.html(this.template());
            this.$currentWordTitle = $('#js-current-word-title', this.$el);
            this.$definitionHolder = $('#js-word-definition-holder', this.$el);
            this.$panelHolder = $('#js-analyzer-panel', this.$el);
            this.$collapseExpandBtn = $('#js-analyzer-expand-collapse-btn', this.$el);
            this.$wordListHolder = $('#js-words-list-holder', this.$el);

            this.$wordListHolder.html(new WordListView({collection: this.wordCol}).render().el);
            this.$definitionHolder.html(new DefListView({model: this.defList}).render().el);

            this.setStateToExpanded();
            return this;
        },

        handleClickOnCollapseExpandBtn: function() {
            if(this.isCollapsed) {
                this.setStateToExpanded();
            } else {
                this.setStateToCollapsed();
            }
        },

        setStateToExpanded: function() {
            this.$panelHolder.show();
            this.isCollapsed = false;
            this.$collapseExpandBtn.removeClass('to-expand');
            this.$collapseExpandBtn.addClass('to-collapse');
        },

        setStateToCollapsed: function() {
            this.$panelHolder.hide();
            this.isCollapsed = true;
            this.$collapseExpandBtn.addClass('to-expand');
            this.$collapseExpandBtn.removeClass('to-collapse');
        },

        changeCurrentWordTitle: function(title) {
            this.$currentWordTitle.html(title);
        },

        showWord: function(word) {
            if(word.get('definitions').length === 0) {
                word.once('change:definitions', function() {
                    this.defList.set('word', word);
                    // without definition, we know that this is a new word and need to scroll down
                    // otherwise the user is seeing the word and select, no need to scroll to
                    this.$wordListHolder.scrollTop(this.$wordListHolder.height())
                }, this);
            } else {
                this.defList.set('word', word);
            }
        },

        showDefinition: function(str) {
            var that = this;

            var word = this.wordCol.addByWordString(str);
            // this.changeCurrentWordTitle(str);
            this.showWord(word);
        }
    });


    return AnalyzerView;
});

